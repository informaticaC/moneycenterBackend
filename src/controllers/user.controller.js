const catchError = require('../utils/catchError');
const User = require('../models/User');
const bcrypt = require("bcrypt");
const sendOTP = require('../utils/sendOTP');
const sendEmail = require('../utils/sendEmail');
const verifyOTP = require('../utils/verifyOTP');
const jwt = require("jsonwebtoken");
const {OAuth2Client} = require('google-auth-library');
const EmailCode = require('../models/EmailCode');
const { where, json } = require('sequelize');
const  userExist  = require('../utils/userExist');
//const { response } = require('../app');
const InCome = require('../models/InCome');
const Expense = require('../models/Expense');
const Objective = require('../models/Objective');

const getAll = catchError(async(req, res) => {
  
    const results = await User.findAll({include: Objective});
    return res.json(results);
});

const createUser = async (userBody) => {  //Aquí se crea el usuario, ya sea de google o desde el formulario de usuario y password
  
  if (await userExist(userBody)){
    const user = await userExist(userBody)
    console.log('linea 27:=====<<<>>>>', user[0])
    return user[0]
  } 
    else {
    const newUser = await User.create(userBody);
    //console.log('l 21 newUser user created:===>', newUser.dataValues);
    return newUser;

  }
    
}/// End createUser

const create = catchError(async(req, res) => {
  console.log('l40 req.body.email: ==> ', req.body.email);
  const { firstname, lastname, phone, email, password, role, image } = req.body;
  const defaultRole = role || "user";
  const userExist = await User.findAll({where: {email}})
  if (userExist.length != 0) return res.json(`The email ${email} is already registered`);
  if (password) {
    const hashPassword = await bcrypt.hash(password, 10);
    const body = {firstname, lastname, phone, email, image, password: hashPassword, role: defaultRole};
    const result = await createUser(body) ;
////////////////
    const frontBaseUrl = 'https://www.google.com'
    const code = 112233;//require('crypto').randomBytes(64).toString('hex')
    const url = `${frontBaseUrl}/verify_email/${code}`

    await sendEmail({
        to:email,
        subject: "Verificación de cuenta",
        html:`
        <h2>Ingrese el siguiente código en Money Center para verificar su correo</h2>
        <p>Codigo: <strong>${code}</strong></p>
        `
    })

    const bodyCode = {code, userId:result.id} //Guardar el código y el id del usuario
    await EmailCode.create(bodyCode);// en el modelo EmailCode
////////////////
    //const verification = await sendOTP(phone);
    //return res.json({ result, verification});
    console.log('Usuario creado:>>>>',result);
    if (!result) return res.json(`The email ${body.email} is already registered`);
    return res.json(result);
  }  else { return res.sendStatus(500)}   
});


const verifyGoogleToken = catchError(async(req, res)=> { // Start verifyGoogleToken - Create user if not exist
  const CLIENT_ID = process.env.CLIENT_ID;
  const { idToken : token } = req.body;
  //console.log('l 67 idToken received:==>>> : ',  token);
  const client = new OAuth2Client();
  let userToCreate;
  
  async function verify() {
    const ticket = client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    ticket.then(salida => 
      {
        //console.log('l87 salida.getPayload:==>',salida.getPayload())
        const userVerified={
          firstname: salida.getPayload().given_name,
          lastname: salida.getPayload().family_name,
          email: salida.getPayload().email,
          image: salida.getPayload().picture
        }
        //console.log('l94 userVerified.email:==>',userVerified.email);
        userToCreate = {
            firstname: userVerified.firstname,
            lastname: userVerified.lastname,
            phone: "",
            email: userVerified.email,
            password: null, 
            role: "user", 
            image: userVerified.image,
            googleId: true,
            isVerified: true
          
        }
        //console.log('l 89 userToCreate:==>', userToCreate);

        async function goToCreate(userToCreate){
          //console.log('l 91 userToCreate:==>', userToCreate);
          const newUser = await createUser(userToCreate);
          return(newUser);
        }
        
        goToCreate(userToCreate).then((respuesta)=> {
          const token = jwt.sign( // cuando el usuario se crea en la base de datos creamos el token para devolverlo junto con el usuario creado
            {respuesta},
            process.env.TOKEN_SECRET,
            {expiresIn:"1d"}
          ) 
            //console.log(json({respuesta, token }))
            //console.log('l 108 respuesta:==>>>', respuesta);
            return res.json({respuesta, token})
        }).catch(console.error);
       
      }); 
      
    } //end verify function
    
  verify().catch(console.error);

}) // end verifyGoogleToken - Create user if not exist


const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const getOneById = catchError(async(req, res) => {
  const { id } = req.params;
  const result = await User.findByPk(id,{include : InCome});
  if(!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await User.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const verifyCode = catchError(async (req, res) => {
  const {code} = req.params;
  console.log('code de req.params:==>>',code);
  const codeUser = await EmailCode.findOne({where:{code}});
  console.log('linea 173 codeUser:==>>', codeUser);
  if (!codeUser) return res.sendStatus(401);
  console.log(codeUser);
  const body = {isVerified:true};
  const userUpdate = User.update(body,{where: {id:codeUser.userId}});
  await codeUser.destroy();
  return  res.sendStatus(200); //res.json(userUpdate[1][0]).sendStatus(200);
})

const verificarOTP = catchError(async (req, res) => {
  const {phone, code} = req.body;
    
    // Llama a la función verifyOTP para verificar el OTP
    const verification = await verifyOTP(phone, code);
    const user = await User.findOne( verification.phone ); // Encuentra el usuario por número de teléfono (ajusta según tu esquema)
    // Verifica el estado de la verificación (verificationResult.status)
    if (verification.status === 'approved') {
      // La verificación fue exitosa, puedes realizar acciones adicionales aquí
      user.isVerified = true; // Actualiza el campo isVerified a true
      await user.save(); 
      
      return res.json(user);
    } else {
      // La verificación falló, puedes manejar el error aquí
      return res.status(401).json({ error: 'Verificación fallida' });
    }
  });

  const login = catchError(async (req,res)=>{
    console.log(req.body)
    const {email, password} = req.body
    if (!password) return res.sendStatus(401)
    //verificacion email
    const user = await User.findOne({where:{email}})
    if(!user) return res.sendStatus(401)
    if (!user.password) return res.sendStatus(401) 
    if(user.isGoogleid) return res.sendStatus(401)
      const isValidPassword = await bcrypt.compare(password, user.password )
      if(!isValidPassword) return res.sendStatus(401)
     // if(!user.isVerified) return res.sendStatus(401)
    const token = jwt.sign(
        {user},
        process.env.TOKEN_SECRET,
        {expiresIn:"1d"}
    )

    return res.json({user, token})

});

///users/me

const logged = catchError(async(req,res)=>{
  const user = req.user
  return res.json(user)
});

const resetPassword = catchError( async (req, res) => {
  console.log(req.body);
  const {email} = req.body
  const user = await User.findOne({where:{email}});
  if(!user) return res.sendStatus(401);
  console.log(user)

  //const code = Math.floor(100000 + Math.random() * 900000);
  const code = 112233;
  //const url = `${frontBaseUrl}/reset_password/${code}`

  await sendEmail({
      to:email,
      subject: "Solicitud de cambio de contraseña",
      html:`
      <h2>este es tu codigo para cambio de contraseña </h2>
      <p> ${code}</p>
      `
  })

  const body = {code, userId:user.id}
  await EmailCode.create(body);

  return res.json(user);

})

const updatePassword = catchError(async (req, res) => {
  
  const {password,code}=req.body;

  const userCode = await EmailCode.findOne({where:{code}});
  if(!userCode) return res.sendStatus(401);

  const hashPassword = await bcrypt.hash(password,10);
  const body = {password:hashPassword}

  const user = await User.update(body, {where:{id:userCode.userId}})
  if(user[0] === 0) return res.sendStatus(404);

  await userCode.destroy();
  return res.json(user);

})


module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    verificarOTP,
    verifyCode,
    login,
    logged,
    resetPassword,
    updatePassword,
    verifyGoogleToken,
    getOneById
}
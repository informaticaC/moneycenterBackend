const User = require ("../models/User");
const { where } = require ('sequelize');


async function userExist(userBody) {

        const user = await User.findAll({where: {email: userBody.email}});

        if (user.length !== 0) {
            return true;
        // console.log('userExist: ===>', userExist[0].dataValues.email);
        // const res = (`User with email ${userBody.email} already exists!!`)
        // return res;//res.json(`user with email ${email} already exists!!`);
        }else return false;
     }


module.exports = userExist  
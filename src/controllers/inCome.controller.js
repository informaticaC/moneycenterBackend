const catchError = require('../utils/catchError');
const InCome = require('../models/InCome');
const User = require('../models/User');



const getAll = catchError(async(req, res) => {
    
    const results = await InCome.findAll({include: User});
    return res.json(results);
});


const create = catchError(async(req, res) => {
    console.log('req.body.user.id:==>',req.body.user.id)
    const userId = req.body.user.id;
    const {name, description, amount}= req.body;
    const body = {name, description, amount, userId};
    const result = await InCome.create(body);
    return res.status(201).json(result);
});

const setUser = catchError(async(req, res) =>{ //incomes/:id/users
    const {id} = req.params;
    const income = await InCome.findByPk(id);
    await income.setUsers(req.body)
    
    const users = await income.getUser()
    return res.json(users)
    
})

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await InCome.findByPk(id, {include: User});
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const getAllByUserId = catchError(async(req, res) => {
    const { userId } = req.params;
    const incomes = await InCome.findAll({ where : { userId } });
       
    return res.json({incomes});
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await InCome.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await InCome.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setUser,
    getAllByUserId
}
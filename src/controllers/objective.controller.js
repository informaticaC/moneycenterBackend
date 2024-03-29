const catchError = require('../utils/catchError');
const Objective = require('../models/Objective');
const User = require ('../models/User')

const getAll = catchError(async(req, res) => {
    const results = await Objective.findAll();
    return res.json(results);
});

const getAllByUserId = catchError(async(req, res) => {
    const  userId = req.params;
    const results = await Objective.findAll({where: userId });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    
    console.log('req, línea 18 objective controller, create :==>>>',req)
    const userId = req.user.id;
    console.log("userId:==>>", userId);
    const partialBudget = 0;
    const {name, description, budget, deadline, icon, color} = req.body;
    const body = {name, description, budget, partialBudget, deadline, icon, color , userId};
    const result = await Objective.create(body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Objective.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Objective.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Objective.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    getAllByUserId,
    create,
    getOne,
    remove,
    update
}
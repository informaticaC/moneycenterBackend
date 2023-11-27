const catchError = require('../utils/catchError');
const Objective = require('../models/Objective');


const getAll = catchError(async(req, res) => {
    const results = await Objective.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const userId = await req.user.id;
    const {name, description, budget, deadline} = req.body;
    const body = {name, description, budget, deadline, userId};
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
    create,
    getOne,
    remove,
    update
}
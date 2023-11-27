const catchError = require('../utils/catchError');
const Expense = require('../models/Expense');

const getAll = catchError(async(req, res) => {
    const results = await Expense.findAll();
    return res.json(results);
});

const getAllByUserId = catchError(async(req, res) => {
    const { userId } = req.params;
    const expenses = await Expense.findAll({ where : { userId } });
    return res.json({expenses});
});

const create = catchError(async(req, res) => {
    // console.log('req.body.user.id:==>',req.body.user.id)
    // const userId = await req.body.user.id;
    const {name, description, amount, userId} = req.body;

    const body = {name, description, amount, userId};

    const result = await Expense.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Expense.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Expense.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Expense.update(
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
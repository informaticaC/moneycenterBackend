const catchError = require('../utils/catchError');
const Expense = require('../models/Expense');
const TransactionType = require('../models/TransactionType')

const getAll = catchError(async(req, res) => {
    const results = await Expense.findAll();
    return res.json(results);
});

const getAllByUserId = catchError(async(req, res) => {
    const userId = req.params;
    const expenses = await Expense.findAll({ where : userId });
    return res.json({expenses});
});

const create = catchError(async(req, res) => {
    const userId = req.user.id;
    const transactiontypeId = 1;
    const {name, description, amount, date, icon} = req.body; //transactiontypeId,
    const body = {name, description, amount, date, userId, transactiontypeId, icon};
    const result = await Expense.create(body);
        
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
    await Expense.destroy({ where: { id } });
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
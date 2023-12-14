const catchError = require('../utils/catchError');
const TransactionType = require('../models/TransactionType');
const Expense = require('../models/Expense')
const InCome = require('../models/InCome')


const getAll = catchError(async(req, res) => {
    const results = await TransactionType.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await TransactionType.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await TransactionType.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await TransactionType.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await TransactionType.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

// const setInComes = catchError( async (req, res) => {
//     const { id } = req.params; // id del income al cual le quiero setear el transaction type
//     const { transactiontypeId } = req.body; // el transactiontype Id a setear en el income.id = id
//     console.log("id (transaction)", id, "incomeId :" , transactiontypeId);
//     const income = await InCome.findByPk( id );
//     console.log('income for set in transaction type:==>', income);
//     await income;
//     const inComes = await TransactionType.findAll({where:{ incomeId : id}}) ;
//     return res.json(inComes)
// })

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
    //setInComes
}
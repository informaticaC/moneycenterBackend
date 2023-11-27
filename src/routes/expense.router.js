const { getAll, create, getOne, remove, update, getAllByUserId } = require('../controllers/expense.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJwt');

const routerExpense = express.Router();

routerExpense.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT, create);

routerExpense.route('/byUserId/:userId')
    .get(verifyJWT,  getAllByUserId);

routerExpense.route('/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = routerExpense;
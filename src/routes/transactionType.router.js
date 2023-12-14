const { getAll, create, getOne, remove, update, setInComes } = require('../controllers/transactionType.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJwt');

const routerTransactionType = express.Router();

routerTransactionType.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT, create);

routerTransactionType.route('/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

routerTransactionType.route('/:id/setIncome')
    //.post(verifyJWT, setInComes)

module.exports = routerTransactionType;
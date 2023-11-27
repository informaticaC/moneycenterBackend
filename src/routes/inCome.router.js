const { getAll, create, getOne, remove, update, setUser, getAllByUserId } = require('../controllers/inCome.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJwt');

const routerInCome = express.Router();

routerInCome.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT, create);

routerInCome.route('/:id')
    .get(verifyJWT,  getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

routerInCome.route('/byUserId/:userId')
    .get(verifyJWT,  getAllByUserId);

routerInCome.route('/:id/users')
    .post(verifyJWT, setUser);

module.exports = routerInCome;
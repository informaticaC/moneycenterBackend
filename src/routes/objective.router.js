const { getAll, create, getOne, remove, update } = require('../controllers/objective.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJwt');

const routerObjective = express.Router();

routerObjective.route('/')
    .get(getAll)
    .post(verifyJWT,create);

routerObjective.route('/:id')
    .get(getOne)
    .delete(verifyJWT,remove)
    .put(verifyJWT,update);

module.exports = routerObjective;
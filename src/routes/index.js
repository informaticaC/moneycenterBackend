const express = require('express');
const routerUser = require('./user.router');
const routerObjective = require('./objective.router');
const routerInCome = require('./inCome.router');
const routerExpense = require('./expense.router');
const router = express.Router();

//colocar las rutas aquí
router.use('/users', routerUser);
router.use('/objectives', routerObjective);
router.use('/income', routerInCome);
router.use('/expense', routerExpense);




module.exports = router;
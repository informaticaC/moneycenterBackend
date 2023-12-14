const { getAll, create, getOne, remove, update, verificarOTP, login, logged, resetPassword,updatePassword, verifyGoogleToken, getOneById } = require('../controllers/user.controller');
const express = require('express');
const routerUser = express.Router();
const verifyJWT = require('../utils/verifyJwt');

routerUser.route('/')
    .get(verifyJWT, getAll) 
    .post(create);

routerUser.route('/login')
    .post(login); 
    
routerUser.route('/me') // /users/me
    .get(verifyJWT,logged);    
    
routerUser.route('/reset_password') // /users/reset_password
    .post(resetPassword);

routerUser.route('/verifyGoogleToken')
    .post(verifyGoogleToken);
    
routerUser.route('/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT,remove)
    .put(verifyJWT, update);    

routerUser.route("/verify/:code")
    .post(verificarOTP)

routerUser.route('/reset_password/:code')// /reset_password/:code
    .post(updatePassword)    

module.exports = routerUser;       
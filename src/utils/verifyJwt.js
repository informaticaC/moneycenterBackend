const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    //console.log('');
    //console.log(' req.user:==========>>>>>>>>>>>>', req.user );
    //console.log('');
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403);
            req.user = decoded.user;
            //console.log('verifyJwt.js, decoded.user:======>>>>', req.user);
            next();
        }
    )
}

module.exports = verifyJWT;
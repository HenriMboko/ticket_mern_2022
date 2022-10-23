const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Users = require('../models/userModel');


const protect = asyncHandler(async (req, res, next) => {
    let Token;


    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //get token from header
            Token = req.headers.authorization.split(' ')[1];

            //verify token
            const decoded = jwt.verify(Token, process.env.JWT_SECRET);
            //get user from token
            req.user = await Users.findById(decoded.id).select("-password");

            next();

        } catch (error) {
            console.log(error);
            res.status(401).json({ message: 'Not Authorized' });

        }
    }
    if (!Token) {
        res.status(401).json({ message: 'Not Authorized' })
    }
})



module.exports = { protect }
//  for protect routes
const jwt = require('jsonwebtoken')

const asyncHandler = require('express-async-handler')

const userModel = require('../models/user')

const protect = asyncHandler(async (req, res, next) =>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ') ){
        try {
            token = req.headers.authorization.split(' ')[1]

            // verify token 
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // get user from token
            req.user = await userModel.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error);

            res.status(401)
            throw new Error('no authorized access');
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('no authorized access, no token');
    }
})
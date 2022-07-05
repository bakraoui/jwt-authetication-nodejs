const asyncHandler = require('express-async-handler')

const userModel = require('../models/user')

const register = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error(" all fields are required")
    }

    const userExists = await userModel.findOne({email})
    if (userExists) {
        res.status(400)
        throw new Error(" a user already exist with that email")
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await userModel.create({
        name : name,
        email : email,
        password : hashedPassword
    })

    if (newUser) {
        res.status(201).json(newUser)
    }else{
        res.status(400).json({message : 'invalid data'})
    }

})

const login = asyncHandler(async(req, res) => {
    const {email, password} = req.body

    const user = await userModel.findOne({email})

    //  check for user credentials
    if (user && (await bceypt.compare(password, user.password))) {
        res.status(200).json({
            name : user.name,
            email : user.email,
            token : generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error(" ainvalid credentials")
    }
})

const getMe = asyncHandler(async(req, res) => {
    const {email, password} = req.body

    const user = await userModel.findOne({email})

    //  check for user credentials
    if (user && (await bceypt.compare(password, user.password))) {
        res.status(200).json({
            name : user.name,
            email : user.email,
            token : generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error(" ainvalid credentials")
    }
})

const generateToken = () =>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn : '30d'
    })
}
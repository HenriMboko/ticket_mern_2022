
const asyncHandler = require('express-async-handler')
const Users = require('../models/userModel');
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const registerUser = asyncHandler(async (req, res) => {

    //verifactin de parametre
    const { name, email, password } = req.body
    if (!name || !email || !password) return res.status(404)
        .json({ message: "please revoir register parametre" })

    //verfication utilisateur exist
    const useExist = await Users.findOne({ email })
    if (useExist) return res.status(404).json({ message: "User already exist...." })

    //bcrypt password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    //creation d'utilisateur
    Users.create({
        name,
        email,
        password: hashPassword

    })
        .then((user) => {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                Token: generateToken(user._id)
            })
        }).catch((er) => console.log(er))
})



//LOgin User
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await Users.findOne({ email })

    //compare user password and password if match
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            Token: generateToken(user._id)
        })
    } else {
        res.status(401).json({ message: "Avalid credential" })
    }
})


//genrateToken

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3600" })
}

//get Currency user
const getMe = asyncHandler(async (req, res) => {
    const user = {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name
    }
    res.status(200).json(user)
})

module.exports = {
    registerUser,
    loginUser,
    getMe
}
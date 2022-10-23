const asyncHandler = require('express-async-handler');

const Users = require("../models/userModel");
const Tickets = require("../models/ticketModel");

//@desc Get user tickets
// @route Get /api/tickest
// @acess Private

const getTicket = asyncHandler(async (req, res, next) => {

    //Get User usign by id
    const user = await Users.findById(req.user.id);

    if (!user) {
        res.status(401).json({ message: "User not Found" });
    }

    const tickets = await Tickets.find({ user: req.user.id });

    res.status(200).json(tickets);
})


//@desc Create new tickets
// @route Post /api/tickest
// @acess Private

const createTicket = asyncHandler(async (req, res, next) => {
    const { product, description } = req.body

    if (!product || !description) {
        res.status(400).json({ message: "Please add a Product and description" })
    }

    //Get User usign by id
    const user = await Users.findById(req.user.id);

    if (!user) {
        res.status(401).json({ message: "User not Found" });
    }

    Tickets.create({
        product,
        description,
        user: req.user.id,
        status: 'new'
    })
        .then((tickets) => {
            res.status(201).json(tickets)
        }).catch((error) => console.log(error))



})


module.exports = {
    createTicket,
    getTicket,
}
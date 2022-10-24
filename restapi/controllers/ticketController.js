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

//@desc Get user tickets
// @route Get By Id /api/tickest
// @acess Private

const getTicketById = asyncHandler(async (req, res, next) => {

    //Get User usign by id
    const user = await Users.findById(req.user.id);

    if (!user) {
        res.status(401).json({ message: "User not Found" });
    }

    //Get Ticket By Id

    const tickets = await Tickets.findById(req.params.id)

    if (!tickets) {
        res.status(404).json({ message: "Tickets not found" })
    }

    if (tickets.user.toString() !== req.user.id) {
        res.status(401).json({ message: "Not Authorized" })
    }

    res.status(200).json(tickets);
})

//@desc delete  tickets
// @route Post /api/tickest/:id
// @acess Private

const deleteTicket = asyncHandler(async (req, res, next) => {

    //Get User usign by id
    const user = await Users.findById(req.user.id);

    if (!user) {
        res.status(401).json({ message: "User not Found" });
    }

    //Get Ticket By Id

    const tickets = await Tickets.findById(req.params.id)

    if (!tickets) {
        res.status(404).json({ message: "Tickets not found" })
    }

    if (tickets.user.toString() !== req.user.id) {
        res.status(401).json({ message: "Not Authorized" })
    }

    await Tickets.remove(req.params.id)
        .then((tickets) => {
            res.status(200).json({ mssage: "Delete Ticket sucessfuly" });
        }).catch((err) => console.log(err))


})

//@desc update  tickets
// @route Post /api/tickest
// @acess Private

const updateTicket = asyncHandler(async (req, res, next) => {

    //Get User usign by id
    const user = await Users.findById(req.user.id);

    if (!user) {
        res.status(401).json({ message: "User not Found" });
    }

    //Get Ticket By Id

    const tickets = await Tickets.findById(req.params.id)

    if (!tickets) {
        res.status(404).json({ message: "Tickets not found" })
    }

    if (tickets.user.toString() !== req.user.id) {
        res.status(401).json({ message: "Not Authorized" })
    }

    await Tickets.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })

        .then((tickets) => {
            res.status(201).json(tickets)
        }).catch((error) => console.log(error))

})





module.exports = {
    createTicket,
    getTicket,
    getTicketById,
    deleteTicket,
    updateTicket,
}
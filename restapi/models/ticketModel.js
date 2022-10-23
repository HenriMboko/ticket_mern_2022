const Schema = require('mongoose').Schema;
const mongoose = require('mongoose');

const ticketSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    product: {
        type: String,
        required: [true, "Please select a product"],
        enum: ["Iphone Pro", "Imac", "Hp Probook", "Ipad"]
    },
    description: { type: String, required: [true, "Please enter a description of the issue"] },
    status: { type: String, required: [true, "Please add a password"], enum: ["new", "open", "closed"], default: 'new' },

}, { timestamps: true })

const Tickets = mongoose.model("tickets", ticketSchema);


module.exports = Tickets;


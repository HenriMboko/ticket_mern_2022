const Schema = require('mongoose').Schema;
const mongoose = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    email: { type: String, required: [true, "Please add a Email"] },
    password: { type: String, required: [true, "Please add a password"] },
    isAdmin: { type: Boolean, required: true, default: false },
}, { timestamps: true })

const Users = mongoose.model("users", userSchema);


module.exports = Users;


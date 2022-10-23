const mongoose = require('mongoose');


const ConnectionDb = async () => {


    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log("Connection with database sucessfuly")
    } catch (error) {
        console.log(error)
    }
}

module.exports = ConnectionDb;
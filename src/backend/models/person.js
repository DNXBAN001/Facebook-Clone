///require mongoose
const mongoose = require("mongoose");

//create a person Schema
const personSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    }
})

//export the person Schema to be utilized by the relevant routes
module.exports = mongoose.model("profile", personSchema);
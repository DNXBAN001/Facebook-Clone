const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 5
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    dateOfBirth: {
        type: String,
    },
    profilePhoto: {
        type: String,
        trim: true
    },
    coverPhoto: {
        type: String,
        trim: true
    },
    biography: {
        type: String,
        trim: true
    },
    joined: {
        type: String,
    },
    relationshipStatus: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("profile", profileSchema)
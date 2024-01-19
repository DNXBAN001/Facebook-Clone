const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    postOwner: {
        type: String,
        required: true,
        trim: true
    },
    postOwnerProfilePhoto: {
        type: String,
        trim: true
    },
    timePosted: {
        type: String,
        trim: true,
        required: true,
    },
    privacy: {
        type: String,
        required: true,
        trim: true
    },
    caption: {
        type: String,
        trim: true
    },
    files: {
        type: String,
        trim: true
    },
    reactions: {
        //likes, love, haha, wow, sad, angry
        type: Number
    },
    comments: {
        type: String,
        trim: true
    },
    shares: {
        type: Number
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("post", postSchema);
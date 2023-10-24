//require express
const express = require("express");

//create a router object 
const router = express.Router();

//require the personSchema
const Profile = require("../models/person");

//GET all profiles on the database /api/profiles
router.get("/", async (req, res) => {
    try{
        //get all profiles from the people table
        const profiles = await Profile.find()
        res.status(200).json({success: true, data: profiles})
    }catch(err){
        res.status(400).json({success: false, msg: err})
    }
})

//export the router obj
module.exports = router;
//require express
const express = require("express");

//create a router object 
const router = express.Router();

//require the personSchema
const Profiles = require("../models/person");

//GET all profiles on the database /api/profiles
router.get("/", async (req, res) => {
    try{
        //get all profiles from the people table
const Person = require("../models/person");
        const people = await Profiles.find()
        res.status(200).json({success: true, data: people})
    }catch(err){
        res.status(400).json({success: false, msg: err})
    }
})
//add a profile
router.post("/", async (req, res) => {
    try{
        const { firstName, lastName, qualification } = req.body
        if(!firstName || !lastName || !qualification){
            return res.status(400).json({success: false, msg: "Make sure to provide all person details"})
        }
        const person = new Profiles({firstName, lastName, qualification})
        const newPerson = await person.save()
        res.status(201).json({success: true, data: newPerson})

    }catch(err){
        res.status(400).json({success: false, msg: err})
    }
})

//export the router obj
module.exports = router;
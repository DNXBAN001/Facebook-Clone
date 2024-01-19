const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

//require the profile schema
const profileSchema = require("../models/profile");


/**
 * Create new profile  /api/profiles/create
 */
router.route("/create").post( async (req, res) => {
    const { username, password, firstName, lastName, 
        profilePhoto, coverPhoto, biography, joined, relationshipStatus } = req.body
    try{
        const profile = new profileSchema({
            username, password, firstName, lastName, 
            profilePhoto, coverPhoto, biography, joined, relationshipStatus
        })
        const newProfile = await profile.save()
        res.status(201).json({success: true, msg: "New profile created successfully..."})
    }catch(err){
        res.status(400).json({success: false, msg: err+"....Check if username is unique...also, do not leave required fields blank"})
    }
})

/**
 * Get all profiles that are in the database  /api/profiles
 */
router.route("/").get( async (req, res) => {
    try{
        const profiles = await profileSchema.find()
        res.status(200).json({success: true, data: profiles})
    }catch(err){
        res.status(400).json({success: false, msg: err})
    }
})

/**
 * Get profile by id /api/profiles/:id
 */
router.route("/:id").get( async (req, res) => {
    const { id } = req.params
    try{
        const profile = await profileSchema.findById(id)
        res.status(200).json({success: true, data: profile})
    }catch(err){
        res.status(400).json({success: false, msg: err})
    }
})

/**
 * Edit profile by id
 * /
router.route("/:id").put( async (req, res) => {
    const { id } = req.params
    const {}
})
*/

/**
 * Delete profile by id /api/profiles/:id
 */
router.route("/:id").delete( async (req, res) => {
    const { id } = req.params
    try{
        await profileSchema.findByIdAndRemove(id)
        res.status(200).json({success: true, msg: "Profile deleted successfully..."})
    }catch(err){
        res.status(400).json({success: false, msg: err})
    }
})


//export the router obj
module.exports = router;
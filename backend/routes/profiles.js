const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

//require the profile schema
const profileSchema = require("../models/profile");


/**
 * Create new profile  /profiles/signup
 */
router.route("/signup").post( async (req, res) => {
    const { username, password, firstName, lastName, dateOfBirth, gender,
        profilePhoto, coverPhoto, biography, joined, relationshipStatus } = req.body
    if(!username || !password || !firstName || !lastName || !dateOfBirth || !gender){
        return res.status(400).json("Make sure to not leave any input field blank...")
    }
    const users = await profileSchema.find()
    let userExist = false
    const user = users.map(user => {
        if(user.username === username) {
            userExist = true
            return user
        }
    })
    if(userExist){
        return res.json({success: false, msg:"Username already exist...Try using a different email"})
    }
    try{
        const profile = new profileSchema({
            username, password, firstName, lastName, dateOfBirth, gender,
            profilePhoto, coverPhoto, biography, joined, relationshipStatus
        })
        const newProfile = await profile.save()
        res.status(201).json({success: true, msg: "New profile created successfully..."})
    }catch(err){
        res.status(400).json({success: false, msg: err+"....Check if username is unique...also, do not leave required fields blank"})
    }
})

/**
 * Login user  /profiles/login
 */
router.route("/login").post( async (req, res) => {
    const { username, password } = req.body
    let userFound = false
    const users = await profileSchema.find()
    const user = users.filter(user => {
        if(user.username === username){
            userFound = true
            return user
        }
    })
    if(!userFound){
        return res.json({success: false, msg: "Cannot find user..."})
    }
    try{
        if(user[0].password === password){
            res.status(200).json({success: true, msg: "Login was successful..."})
        }else if(password.length === 0){
            res.json({success: false, msg: "Password cannot be blank"})
        }else{
            res.json({success: false, msg: "Username and password do not match"})
        }
    }catch(err){
        res.status(400).json({success: false, msg: err})
    }
})

/**
 * Get all profiles   /profiles
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
 * Get profile by id /profiles/:id
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
 * Edit profile by id /profiles/update/:id
 */
router.route("/update/:id").put( async (req, res) => {
    const { id } = req.params
    const { password, firstName, lastName, 
        profilePhoto, coverPhoto, biography, relationshipStatus } = req.body
    try{
        const profile = await profileSchema.findById(id)
        profile.password = password
        profile.firstName = firstName
        profile.lastName = lastName
        profile.profilePhoto = profilePhoto
        profile.coverPhoto = coverPhoto
        profile.biography = biography
        profile.relationshipStatus = relationshipStatus
        const updatedProfile = await profile.save()
        res.status(200).json({success: true, msg: "Profile updated successfully..."})
    }catch(err){
        res.status(400).json({success: false, msg: err})
    }
})


/**
 * Delete profile by id /profiles/:id
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
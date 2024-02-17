const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const profileCollection = require("../models/profile");
const tokenCollection = require("../models/token");
const authenticateToken = require("../middleware/auth");


/**
 * Create new profile  /profiles/signup
 */
router.route("/signup").post( async (req, res) => {
    const { username, password, firstName, lastName, dateOfBirth, gender,
        profilePhoto, coverPhoto, biography, joined, relationshipStatus } = req.body

    if(!username || !password || !firstName || !lastName || !dateOfBirth || !gender){
        return res.json("Make sure to not leave any input field blank...")
    }
    let userExist = false
    const user = (await profileCollection.find()).map(user => {
        if(user.username === username) {
            userExist = true
            return user
        }
    })
    //If username is aready in use, user cannot proceed with the signup
    if(userExist)   return res.json({success: false, msg:"Username already exist...Try using a different email"})

    try{
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        // console.log(salt)
        // console.log(hashedPassword)
        const profile = new profileCollection({
            username, password: hashedPassword, firstName, lastName, dateOfBirth, gender,
            profilePhoto, coverPhoto, biography, joined, relationshipStatus
        })
        const newProfile = profile.save()
        res.status(201).json({success: true, msg: "New profile created successfully..."})
    }catch(err){
        res.status(400).json({success: false, msg: err})
    }
})

/**
 * Login user  /profiles/login
 */
router.route("/login").post( async (req, res) => {
    const { username, password } = req.body
    //if any of the input fields is left blank, notify the user
    if(!username || !password)  return res.json({success: false, msg: "Make sure to not leave any of the fields blank..."})

    //Get user if it exist on the DB
    const user = (await profileCollection.find()).filter(user => user.username === username)[0]
         
    //If user is not found return a user not found message
    if(!user)  return res.json({success: false, msg: "Cannot find user..."})
    
    try{
        if(await bcrypt.compare(password, user.password)){
            const payload = {userId: user._id, username: user.username, userStatus: "admin"}
            //Create an accessToken and serialize the user...the user details will be wrapped inside the accessToken
            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "60s"})
            //Create a refreshToken also to be saved on the DB whenever the user login
            const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET)
            const rToken = new tokenCollection({refreshToken, user})
            await rToken.save()
            res.status(200).json({success: true, tokenDetails: {accessToken, rToken}, msg: "Login was successful..."})
        }else{
            res.json({success: false, msg: "Incorrect password..."})
        }    
    }catch(err){
        res.status(500).json({success: false, msg: err})
    }
})

/**
 * Get all profiles   /profiles
 */
router.route("/").get( async (req, res) => {
    try{
        const profiles = await profileCollection.find()
        res.status(200).json({success: true, data: profiles})
    }catch(err){
        res.status(400).json({success: false, msg: err})
    }
})

/**
 * Get Current Profile by username  /profiles/showMe
 */
router.route("/showMe").get( authenticateToken, async (req, res) => {
    // const { username } = req.params
    try{
        const user = (await profileCollection.find()).filter(user => user.username === req.user.username)[0]
        return user ? res.status(200).json(user): res.json({success: false, msg: "User cannot be found"})
    }catch(err){
        res.status(500).json({success: false, msg: "Server error..."})
    }
})


/**
 * Get profile by id /profiles/:id
 */
router.route("/:id").get( async (req, res) => {
    const { id } = req.params
    try{
        const profile = await profileCollection.findById(id)
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
        const profile = await profileCollection.findById(id)
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
        await profileCollection.findByIdAndRemove(id)
        res.status(200).json({success: true, msg: "Profile deleted successfully..."})
    }catch(err){
        res.status(400).json({success: false, msg: err})
    }
})


//export the router obj
module.exports = router;
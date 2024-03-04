const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const profileCollection = require("../models/profile");
const tokenCollection = require("../models/token");
const {authenticateToken, authorizePermissions, attachCookiesToResponse, createToken} = require("../middleware/auth");


/**
 * Create new profile  /profiles/signup
 */
router.route("/signup").post( async (req, res) => {
    const { username, password, firstName, lastName, dateOfBirth, gender,
        profilePhoto, coverPhoto, biography, joined, relationshipStatus } = req.body
    
    //Check for any fields that are left blank
    if(!username || !password || !firstName || !lastName || !dateOfBirth || !gender){
        return res.json("Make sure to not leave any input field blank...")
    }
    //Get the user from the DB
    const user = (await profileCollection.find()).filter(user => user.username === username)[0] 
    
    //If user with the username already exist, user cannot proceed with the signup
    if(user) return res.json({success: false, msg:"Username already exist...Try using a different email"})

    //Assign userStatus. First user to sign up will be admin, rest will be ordinary users
    const userStatus = await profileCollection.countDocuments() === 0 ? "admin": "user"

    try{
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        const profile = new profileCollection({
            username, password: hashedPassword, firstName, lastName, dateOfBirth, gender,
            userStatus, profilePhoto, coverPhoto, biography, joined, relationshipStatus
        })
        //Save new profile
        await profile.save()
        //Generate accessToken and refreshToken for the current user
        // const payload = {userId: profile._id, username: profile.username, userStatus: profile.userStatus}
        // const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)
        // const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET)
        // //save refreshToken on the DB
        // const token = new tokenCollection({refreshToken, profile})
        // await token.save()
        //console.log("token saved successfully...")
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
            const tokenUser = {userId: user._id, userStatus: user.userStatus}
            
            //Look for an existing refreshToken on the DB
            const existingToken = (await tokenCollection.find()).filter(token => token.user.toString() === user._id.toString())[0]

            //Create an accessToken and serialize the user...the user details will be wrapped inside the accessToken
            //const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: "60m"})

            //If there is no existing refreshToken for the user then create one and assign an accessToken for them
            let token = existingToken
            let accessToken = ""
            if(!existingToken){
                //Create acceesToken for the user
                accessToken = createToken(tokenUser, process.env.TOKEN_SECRET, {expiresIn: "1d"})
                
                //Create a refreshToken also to be saved on the DB whenever the user login
                const refreshToken = jwt.sign(tokenUser, process.env.TOKEN_SECRET, {expiresIn: "7d"})
                const userAgent = req.headers["user-agent"]//set useAgent value
                const ip = req.ip
                token = new tokenCollection({refreshToken, ip, userAgent, user})
                attachCookiesToResponse(res, accessToken, refreshToken)
                await token.save()
                console.log("Test 1")
            }else{
                console.log("user already has an existing token...")
                //Create new accesToken for the user
                accessToken = createToken(tokenUser, process.env.TOKEN_SECRET, {expiresIn: "1d"})
                attachCookiesToResponse(res, accessToken, token.refreshToken)
                console.log("Test 2")
            }
            console.log(req.cookies)
            res.status(200)
                .json({
                    success: true, 
                    user: {
                        userId: user._id,
                        userStatus: user.userStatus,
                        accessToken: accessToken,
                        refreshToken: token.refreshToken
                    }, 
                    msg: "Login was successful..."
            })
            
        }else{
            res.json({success: false, msg: "Incorrect password..."})
        }    
    }catch(err){
        console.log("Server error...")
        res.status(500).json({success: false, msg: err})
    }
})

/**
 * Get all profiles   /profiles
 */
router.route("/").get( authenticateToken, authorizePermissions("admin"), async (req, res) => {
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
 * Get profile by username /profiles/user/:username
 */
router.route("/user/:username").get( authenticateToken, async (req, res) => {
    const { username } = req.params
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
router.route("/:id").get( /*authenticateToken,*/ async (req, res) => {
    const { id } = req.params
    try{
        // console.log(req)
        console.log(req.user)
        const profile = await profileCollection.findById(id)
        res.status(200).json({success: true, data: profile})
    }catch(err){
        res.status(400).json({success: false, msg: err})
    }
})

/**
 * Edit profile by id /profiles/update/:id
 */
router.route("/update/:id").put( authenticateToken, async (req, res) => {
    const { id } = req.params
    const { password, firstName, lastName, dateOfBirth, gender,
        profilePhoto, coverPhoto, biography, relationshipStatus } = req.body
    try{
        const profile = await profileCollection.findById(id)
        if(req.user.userId === id){
            console.log(req.user.userId)
            profile.password = password
            profile.firstName = firstName
            profile.lastName = lastName
            profile.dateOfBirth = dateOfBirth
            profile.gender = gender
            profile.profilePhoto = profilePhoto
            profile.coverPhoto = coverPhoto
            profile.biography = biography
            profile.relationshipStatus = relationshipStatus
            const updatedProfile = await profile.save()
            res.status(200).json({success: true, msg: "Profile updated successfully..."})
        }else{
            res.status(401).json({msg: "Not authorized to edit the profile..."})
        }
    }catch(err){
        res.status(400).json({success: false, msg: err})
    }
})


/**
 * Delete profile by id /profiles/:id
 */
router.route("/:id").delete( authenticateToken, authorizePermissions("admin"), async (req, res) => {
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
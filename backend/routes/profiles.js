const express = require("express");
const router = express.Router();
const profileCollection = require("../models/profile");
const {authenticateToken, authorizePermissions } = require("../middleware/auth");


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
router.route("/:id").get( authenticateToken, async (req, res) => {
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
router.route("/:id").delete( authenticateToken, async (req, res) => {
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
const express = require("express");
const router = express.Router();

//require the post Schema
const postSchema = require("../models/post");


/**
 * Add new post  /posts/add
 */
router.route("/add").post( async (req, res) => {
    const { postOwner, postOwnerProfilePhoto, timePosted,
        privacy, caption, files, reactions, comments, shares} = req.body
    try{
        const post = new postSchema({
            postOwner, postOwnerProfilePhoto, timePosted,
        privacy, caption, files, reactions, comments, shares
        })
        const newPost = await post.save()
        res.status(201).json({success: true, msg: "Post created successfully..."})
    }catch(err){
        res.status(400).json({success: false, msg: err})
    }
})

/** 
 * Get all posts  /posts
 */
router.route("/").get( async (req, res) => {
    try{
        const posts = await postSchema.find()
        res.status(200).json({success: true, data: posts})
    }catch(err){
        res.status(400).json({success: false, msg: err})
    }
})

/** 
 * Get post by id /posts/:id
*/
router.route("/:id").get( async (req, res) => {
    const { id } = req.params
    try{
        const post = await postSchema.findById(id)
        res.status(200).json({success: true, data: post})
    }catch(err){
        res.status(400).json({success: false, msg: err})
    }
})

/**
 * Edit post by id /posts/:id
 */
router.route("/:id").put( async (req, res) => {
    const { id } = req.params
    const {  privacy, caption, files } = req.body
    try{
        const post = await postSchema.findById(id)
        post.privacy = privacy
        post.caption = caption
        post.files = files
        const updatedPost = post
        await updatedPost.save()
        res.status(201).json({success: true, msg: "Post updated succeefully..."})
    }catch(err){
        res.status(400).json({success: false, msg: err})
    }
})

/**
 * Delete post by id /posts/:id
 */
router.route("/:id").delete( async (req, res) => {
    const { id } = req.params
    try{
        await postSchema.findByIdAndRemove(id)
        res.status(200).json({success: true, msg: "Post deleted successfully..."})
    }catch(err){
        res.status(400).json({success: false, msg: err})
    }
})

//Export the router obj
module.exports = router;
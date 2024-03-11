const router = require("express").Router();
const bcrypt = require("bcrypt");
const profileCollection = require("../models/profile");
const tokenCollection = require("../models/token");
const jwt = require("jsonwebtoken");
const { attachCookiesToResponse }  = require("../middleware/auth");

/**
 * Add a new profile /auth/signup
 */
router.route("/signup").post( async (req, res) => {
    const { username, password, firstName, lastName, profilePhoto, dateOfBirth,
            gender, coverPhoto, biography, joined, relationshipStatus } = req.body
            
    //Check for any fields that are left blank
    if(!username || !password || !firstName || !lastName || !dateOfBirth || !gender){
        return res.json("Make sure to not leave any input field blank...")
    }
    //Get the user from the DB
    const user = (await profileCollection.find()).filter(user => user.username === username)[0] 
    
    //If user with the username already exist, user cannot proceed with the signup
    if(user) return res.json({success: false, msg:"Username already exist...Try using a different email"})

    //Assign userStatus. First user to sign up will be admin, rest will be ordinary users
    const userStatus = (await profileCollection.countDocuments()) === 0 ? "admin": "user"

    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const profile = new profileCollection({
        username, password: hashedPassword, firstName, lastName, profilePhoto, dateOfBirth,
        gender, userStatus, coverPhoto, biography, joined, relationshipStatus
        })
        const newProfile = await profile.save()
        res.status(201).json({success: true, msg: "Profile created successfully.."})
    }catch(err){
        res.status(400).json({success: false, msg: err})
    }
})

/**
 * Login user   /auth/login
 */
router.route("/login").post( async (req, res) => {
    const { username, password } = req.body
    if(!username || !password){
        return res.json({success: false, msg: "Make sure to not leave any field blank..."})
    }
    //Find user from DB
    const user = (await profileCollection.find()).filter(user => user.username === username)[0]
    //If user does not exist, return user not found 
    if(!user)   return res.json({success: false, msg: " Cannot find user...."})
    
    try{
        if(await bcrypt.compare(password, user.password)){
            //Check for existing refreshToken
            const existingToken = (await tokenCollection.find()).filter(token => token.user.toString() === user._id.toString())[0]
            // console.log(existingToken)
            let accessToken = ""
            let refreshToken = ""//existingToken.refreshToken
            const payload = {
                userId: user._id, 
                userStatus: user.userStatus, 
                fullName: `${user.firstName} ${user.lastName}`, 
                profilePhoto: user.profilePhoto
            }
            if(existingToken){
                console.log("User already has an existingToken...")
                accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30m"})
                refreshToken = existingToken.refreshToken
            }else{
                //generate accessToken
                accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30m"})
                //generate refreshToken for the user and save it on the DB
                const userAgent = req.headers["user-agent"]
                const ip = req.ip
                refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET)
                const token = new tokenCollection({
                    refreshToken, userAgent, ip, user
                })
                await token.save()
            }
            attachCookiesToResponse(res, accessToken, refreshToken)
            res.json({success: true, accessToken, refreshToken ,msg: "Login was successful"})
        }
        else{
            res.json({success: false, msg: "Username and password do not match..."})
        }
    }catch(err){
        res.status(500).json({success: false, msg: err})
    }

})

/**
 * Generate new accessToken after it has expired /auth/token
 */
router.route("/token").post( async (req, res) => {
    let refreshToken = ""
    //Get refreshTokens available on the DB
    const refreshTokens = (await tokenCollection.find()).map(token => token.refreshToken)
    //Get refreshToken to be verified from cookies or body of the request
    refreshToken = req.cookies.refreshToken || req.body.token
    //If no token was found from the cookies/req.body then return 401
    if(!refreshToken){
        return res.status(401).json({success: false, msg: "Not authorized..."})
    }
    //If the refreshToken is not included in the list of existing refreTokens the return 403
    if(!refreshTokens.includes(refreshToken)){
        return res.status(403).json({success: false, msg: "Token does not match any of the tokens on the DB..."})
    }
    //Verify the refreshToken
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if(err) return res.status(403).json({success: false, msg: "Error while verufying the refreshToken..."})
        const { userId, userStatus, fullName, profilePhoto } = user
        const payload = { userId, userStatus, fullName, profilePhoto }
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30m"})
        res.status(200).json({success: true, accessToken: accessToken})
    })
})

/**
 * Logout user /auth/logout
 */
router.route("/logout").delete( async (req, res) => {
    //Get accessToken from cookies, use accessToken to extract userId
    const accessToken = req.cookies.accessToken
    const decodedUser = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    const userId = decodedUser.userId
    
    try{
        //Find refreshToken that matches the userId extracted from the accessToken and remove it from the DB
        const tokenId = (await tokenCollection.find()).filter(token => token.user.toString() === userId)[0]._id
        await tokenCollection.findByIdAndDelete(tokenId)
        console.log("Token removed succesfully")
        res.status(204).json({success: true, msg: "Logout succesfully..."})
    }catch(err){
        res.json({success: false, msg: err})
    }
})

module.exports = router;
// require("dotenv").config();
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const tokenCollection = require("../models/token");


/**
 * Create a new accessToken when the old one expires
 * Route  /tokens
 */
router.route("/").post( async (req, res) => {
    const refreshToken = req.body.token
    if(!refreshToken) return res.status(401).json({msg: "Token is null..."})
    //Get tokens from the DB
    const refreshTokens = (await tokenCollection.find()).map(token => {
        return token.refreshToken
    })
    //Check if the token from the req.body is included in the DB list
    if(!refreshTokens.includes(refreshToken)) return res.status(403).json({msg: "Token could not be found..."})
    //If token exist on the list then verify it and create a new accessToken
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if(err) return res.status(401).json({msg: "Token not valid - Expired"})
        const payload = user
        //The expiration of this newAccessToken somehow depends on the time the
        //refrreshToken was created and not 3m from the time it was created - Revisit that
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1d"})
        res.status(200).json({newAccessToken: accessToken})
    })
})

module.exports = router
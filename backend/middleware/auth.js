require("dotenv").config();
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next){
    //Extract accessToken from the req.headers
    const authHeader = req.headers.authorization
    const accessToken = authHeader.split(" ")[1]
    if(!accessToken) return res.status(401).json({msg: "Token is null..."})
    //If the token is found then verify it
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.json({msg: "Token is invalid - Expired..."})
        // console.log(req)
        req.user = user
        next()
    })
}

module.exports = authenticateToken;
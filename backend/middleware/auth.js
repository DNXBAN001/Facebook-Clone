const jwt = require("jsonwebtoken");
const tokenCollection = require("../models/token");

function createToken(payload, tokenSecret, options){
  return jwt.sign(payload, tokenSecret, options)
}

async function authenticateToken(req, res, next){
  let accessToken, refreshToken
  //Get authHeader and see if there aren't any tokens attached to it
  const authHeader = req.headers.authorization || req.headers.Authorization
  if(authHeader && authHeader.startsWith("Bearer ")){
    accessToken = authHeader.split(" ")[1]
  }
  else if(req.cookies){
    accessToken = req.cookies.accessToken//could be nundefined if expired
    refreshToken = req.cookies.refreshToken
  }

  console.log(req.cookies)

  console.log(accessToken, refreshToken)

  try{
    //if accessToken is found on the cookies then verify it
    if(accessToken){
      jwt.verify(accessToken, process.env.TOKEN_SECRET, (err, user) => {
        if(err) {
          //clear token from cookies - logout user - redirect them to the login
          res.clearCookie("accessToken")
          res.status(403).send("Forbidden status...")
          res.redirect("/")
        }
        req.user = user
        console.log("Just assigned the user using the decodedUser...")
      })
      return next()
    }
    
    //Verify the refreshToken from cookies to get the user out of it
    let payload = ""
    jwt.verify(refreshToken, process.env.TOKEN_SECRET, (err, user) => {
      if(err) {
        console.log(err)
        // clear token from cookies - logout user - redirect them to the login
        // res.clearCookie("accessToken")
        // res.redirect("/")
        return res.status(403).send("Forbidden...Invalid refreshToken")
      }
      payload = user
    })
    //use the payload to check if there's any existing refresh token for the user
    const existingToken = (await tokenCollection.find()).filter(token => token.user.toString() === payload.userId.toString())[0]
    //Check if existing token is valid
    if(!existingToken) return res.send("No existing token for the user or token is invalid...")

    const refreshTokenJWT = existingToken.refreshToken
    //attachCookiesToResponse(res, payload, refreshTokenJWT)
    res.cookie("refreshToken", refreshTokenJWT, {
      sameSite: "None",//cross-site cookie
      expires: new Date(Date.now()*1000*60*60*24*7)//expire in 7 days - a week
    })
    //assign req.user
    req.user = payload
    next()


    //Extract accessToken from the req.headers
    // const authHeader = req.headers.authorization
    // if(!authHeader) return res.status(400).json({msg: "Authorization header is not provided..."})
    // const accessToken = authHeader.split(" ")[1]
    // if(!accessToken) return res.status(401).json({msg: "Token is null..."})
    // //If the token is found then verify it
    // jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    //     if(err) return res.status(403).json({msg: "Token is invalid - Expired..."})
    //     // console.log(req)
    //     req.user = user
    //     next()
    // })
  }catch(err){
    return "(Internal Server error...)"
  }
}

function attachCookiesToResponse(res, accessToken, refreshToken){
  
  const oneDay = 1000 * 60 * 60 * 24;
  const week = 1000 * 60 * 60 * 24 * 7;

  res.cookie('accessToken', accessToken, {
    httpOnly: true,//tells browser not to allow any client-side script to have access to this cookie
    secure: process.env.NODE_ENV === 'production',//tell express to use https encrypted channel to exchange cookie data
    // signed: true,
    sameSite: 'None',
    expires: new Date(Date.now() + oneDay),
  });
  
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true, // Accessible only by web server if true, recommended for security
    secure: process.env.NODE_ENV === 'production',
    // signed: true,
    sameSite: 'None',// Cross-site cookie, allow our cookie to be available to third-party sites
    expires: new Date(Date.now() + week),
  });
}

function authorizePermissions(...userStatuses){
  return (req, res, next) => {
    if (!userStatuses.includes(req.user.userStatus)) {
      return res.status(401).json({msg: 'Unauthorized to access this route'})
    }
    next();
  }
}

module.exports = { createToken, authenticateToken, authorizePermissions, attachCookiesToResponse };
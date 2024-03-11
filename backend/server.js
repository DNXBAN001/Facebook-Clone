const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");

//MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 
//11 exit listeners added to [Bus]. Use emitter.setMaxListeners() to increase limit
//(Use `node --trace-warnings ...` to show where the warning was created)  
const rateLimiter = require('express-rate-limit');

const xss = require('xss-clean');

//Trust proxy
app.set('trust proxy', 1);
app.use(
    rateLimiter({
      windowMs: 15 * 60 * 1000,//15 mins
      max: 60,//Limit each IP to 60 login requests per 'window' per 1min
      // message: {
      //   message: "Too many login attempts from this IP, try again in 15 mins"
      // },
      // handler: (req, res, next, options) => {
      //   logEvents(`Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
      //   res.send(options.message)
      // },
      // standardHeaders: true,//Return rate limit info in he 'RateLimit-*' headers
      // legacyHeaders: false //Disable the 'X_RateLimit-*' headers
    })
  );
//provides express middleware that can enable calls with different options
//Makes it easy say for example you want to access something outside your server
app.use(cors({
    // origin: "http://localhost:3000",
    // credentials: true
}));
app.use(xss());
//allow our server to send and receive json
app.use(express.json())
//use cookie parser middleware
app.use(cookieParser(/* value of req.secret */));
//set public folder to be the default directory for assets
app.use(express.static("./public"))

//allow our server to receive form data
app.use(express.urlencoded({extended: true}))


//Setup database connection
const url = process.env.MONGODB_URL
mongoose.connect(url, { useNewUrlParser: true })
const con = mongoose.connection;
con.on("open", () => {
    console.log("Database connection is established...")
})

//Auth router
const authRouter = require("./routes/authRouter");
app.use("/auth", authRouter)

//require the /api/profiles router
const profiles = require("./routes/profiles");
app.use("/profiles", profiles);

//require the /api/posts router 
const posts = require("./routes/posts");
app.use("/posts", posts)

const port = process.env.PORT || 5000;//set port to be used

app.listen(port, () => {
    console.log("Server is running on port..."+port)
})
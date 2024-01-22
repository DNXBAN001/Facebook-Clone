const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose")

//provides express middleware that can enable calls with different options
//Makes it easy say for example ypu want to access something outside your server
app.use(cors());

//allow our server to send and receive json
app.use(express.json())

//set public folder to be the default directory for assets
app.use(express.static("./public"))

//allow our server to receive form data
app.use(express.urlencoded({extended: false}))


//Setup database connection
const url = "mongodb://127.0.0.1/Facebook"
mongoose.connect(url, { useNewUrlParser: true })
const con = mongoose.connection;
con.on("open", () => {
    console.log("Database connection is established...")
})

//require the /api/profiles router
const profiles = require("./routes/profiles");
app.use("/profiles", profiles);

//require the /api/posts router 
const posts = require("./routes/posts");
app.use("/posts", posts)

//set port to be used
require("dotenv").config();
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Server is running on port..."+port)
})
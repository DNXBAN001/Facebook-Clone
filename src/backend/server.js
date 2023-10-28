//require express
const express = require("express");

//require config dotenv
require('dotenv').config();

//require mongoose
const mongoose = require("mongoose");

//initialize app using express()
const app = express();

//require the profiles route middleware
const people = require("./routes/people");

//use public folder asour static assets middleware
// app.use(express.static("./public"))

//use express.json middleware for the server to accept json data
app.use(express.json());
//use express.urlencoded() middleware for our server to accept form data
app.use(express.urlencoded({extended: false}));

//establish databse connection using mongoose\
const url = "mongodb://127.0.0.1/Alien"
mongoose.connect(url, {useNewUrlParser: true})
const con = mongoose.connection
con.on("open", () => {
    console.log("Database connection is established...")
})

//use the people.js file as middleware for /api/profiles
app.use("/api/profiles", people);

//initialize PORT number
const port = process.env.PORT || 5000;

//make server to listen for any request on the particular 
app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
})
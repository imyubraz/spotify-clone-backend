// Requiring express
const express = require("express");

// express app
const app = express();

// dotenv configuration (to use environment variables stored in /.env file)
const dotenv = require("dotenv");
dotenv.config();
// console.log(process.env);

// connect to mongodb

// requiring mongoose
const mongoose = require("mongoose");

// connect
// mongoose.connect(<URI>, <OPTIONS>); //return promise

// const MONGODB_URI = `mongodb+srv://<username>:<password>@mycluster.uecf9bg.mongodb.net/?retryWrites=true&w=majority`;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then((res)=>{
    console.log(`Connected to MongoDB!`);
})
.catch((err)=>{
    console.log(`Error occured while connecting to MongoDB!`);
});

// morgan (to track hitted endpoint in console)
const morgan = require("morgan");

// using middlewares

    // using morgan
app.use(morgan('tiny'));

// API (GET Request)
app.get("/", (req, res, next)=>{
    res.send("Hello world!")
})

app.get("/test", (req, res, next)=>{
    res.send("Testing !")
})
// first parameter : req (or any relevant name) => store request object (consists request related data)
// second parameter : res (or any relevant name) => store request object (consists request related data)
// third parameter : next (or any relevant name) -> optional used in middlewares chaining by calling function (next() or given_name())


// Running server on certain port
const PORT = 8000;

app.listen(PORT, ()=>{
    console.log(`App is running on port ${PORT}.`);
})

// After running server.js using node js > node server.js . Express app will start listening to certain port and give response as per defined APIs
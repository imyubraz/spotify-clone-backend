// Requiring express
const express = require("express");

// express app
const app = express();

// API (GET Request)
app.get("/", (req, res, next)=>{
    res.send("Hello world!")
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
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

// Models
const User = require("./models/User");

// passport & password-jwt initial setup
const passport = require("passport");

let JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = 'Anything';
opts.secretOrKey = `${process.env.JWT_SECRET_KEY}`;
opts.issuer = 'accounts.examplesoft.com';
opts.audience = 'yoursite.net';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    // finding user from User model (import or require model first)
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        // error case
        if (err) {
            return done(err, false);
        }
        // user exists case
        if (user) {
            return done(null, user);
        }
        // user doesn't exist case
        else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

// morgan (to track hitted endpoint in console)
const morgan = require("morgan");

// using middlewares

    // using morgan
app.use(morgan('tiny'));

app.use(express.json())
    // use to send response in json format

//Importing Routes
// const authRoute = require("./routes/auth");

// Using routes in app
// app.use("/api/auth", authRoute);

// API (GET Request)

 app.get("/", (req, res, next)=>{
    res.send("Hello world!")
})

app.get("/test", (req, res, next)=>{
    res.send("Testing !")
}) 


// API Routes
// app.use("/api/auth", require("./routes/auth"));


// first parameter : req (or any relevant name) => store request object (consists request related data)
// second parameter : res (or any relevant name) => store request object (consists request related data)
// third parameter : next (or any relevant name) -> optional used in middlewares chaining by calling function (next() or given_name())


// Running server on certain port
const PORT = 8000;

app.listen(PORT, ()=>{
    console.log(`App is running on port ${PORT}.`);
})

// After running server.js using node js > node server.js . Express app will start listening to certain port and give response as per defined APIs
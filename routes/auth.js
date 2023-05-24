// Requiring express
const express = require("express");

// express router
const router = express.Router();
// const router = express();

/*
express() consists lots of methods which dowsn't make sense to import here (but we can do it) 
express.Router() have routing related methods only. So its efficient to use it.
*/

// Models
const User = require("../models/User");

// bcrypt (for password hashing)
const bcrypt = require("bcrypt");

// helpers
const {getToken} = require("../utils/helpers")

// POST request on /register endpoint

router.post("/register", async (req, res) =>{
    // This code will run when the POST request is made on /register endpoint

    // req.body (form data from frontend) should have firstName, lastName, email, username, password (input corresponding names inputs)
    // destructuring req.body
    const {firstName, lastName, email, username, password} = req.body;

    // chack email already exists ?
    let user = await User.findOne({email: email});
    if (user){
        // if user found return this response
        return res.status(403).json({
            success: false,
            error: true,
            message: "User with this email already exists!"
        })
        // default status code is 200 (OK)
    }

    // check username already taken ?
    user = User.findOne({username: username});
    if (user){
        // if user found return this response
        return res.status(403).json({
            success: false,
            error: true,
            message: "Username is already taken!"
        })
    }

    // hash password (hash => oneway function)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // create a user
    const newUser = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: hashedPassword
    })
    // left one (key) will be the key for document created in mongodb, right one is value we got after destructuring req.body.

    // create token to return to user
    const token = await getToken(newUser);

    // result to return to user

    // const result = {...newUser.toJSON(), token};
    const result = {...newUser, token: token};
    // const result = {...newUser, token};

    // we won't show hash password to user
    delete result.password;

    return res.status(200).json({
        success: true,
        message: "User registered successfully",
        data: result
    })

});

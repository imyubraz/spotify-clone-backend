// Imports {

    // Requiring express
const express = require("express");

// } Imports

    // express router (storing express.Router() outcome in 'router' constant)
const router = express.Router();

/* Alternatively we could do this as well

const router = express();

but, express() consists lots of methods which dowsn't make sense to import here (but we can do it) 
express.Router() have routing related methods only. So its efficient to use it.

*/

// Models {

const User = require("../models/User");

// } Models

// requiring bcrypt (for password hashing)
const bcrypt = require("bcrypt");

// helpers {

    // destructuring getToken() function exported from helpers.js (since object is exported in helpers.js )
const {getToken} = require("../utils/helpers")

// } helpers

// /register endoiint

    // POST request on /register endpoint
router.post("/register", async (req, res) => {
        // This code will run when the POST request is made on /register endpoint

        // req.body (form data from frontend) should have firstName, lastName, email, username, password (input corresponding names inputs)

        // destructuring req.body
    const {firstName, lastName, email, username, password} = req.body;

        // chack email already exists ? {
    let userWithEmail = await User.findOne({email: email});
    console.log(userWithEmail);
    if (userWithEmail){
            // if user found return this response
        return res.status(403).json({
            success: false,
            error: true,
            message: "User with this email already exists!"
        })
            // default status code is 200 (OK)
    }
        // } chack email already exists ?

    // check username already taken ? {
    let userWithUsername = await User.findOne({username: username});
    console.log(userWithUsername);
    if (userWithUsername){
            // if user found return this response
        return res.status(403).json({
            success: false,
            error: true,
            message: "Username is already taken!"
        })
    }
    // } check username already taken ?


    // password hashing {

    /*  
    to get hash password from plain password entered by user (hash => oneway function)
    */

        // hashing password using 'bcrypt' package/library {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
        // } hashing password using 'bcrypt' package/library

    // } password hashing


    // create and save user in db (save in mongodb) {
        
    const newUser = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: hashedPassword
    })
    console.log(newUser);
        // left one (key) will be the key for document created in mongodb, right one is value we got after destructuring req.body.
    
    // } create and save user in db
    

    // create token to return to user (by using getToken() function imported from helper.js)
    const token = await getToken(newUser);
    console.log(token);

    // result (result to return to user in a response) {

    // const result = {...newUser.toJSON(), token};
    // const result = {...newUser, token};

    // const result = {...newUser, token: token};
    // console.log(result);
    /* 
    Here newUser object is a MongoDB document.
    and when we spread it using the spread operator (...newUser), it includes additional properties and methods from the MongoDB document prototype. The actual data we want is nested within the _doc property of the newUser object.
     */

    /* To remove the _doc key and directly include the desired properties in the result object, we can modify the assignment statement as follows: */
    const result = {...newUser._doc, token: token};

    // Delete specific properties {

    // delete result._id;
    delete result.__v;
        // deleting password key from result (we won't show hash password to user in response)
    delete result.password;
    delete result.subscribedArtists
    delete result.likedPlaylists
    delete result.likedSongs

    // } Delete specific properties

    console.log(result);

    const newlyCreatedUser = result;

    // } result

    // sending response {
    return res.status(200).json({
        success: true,
        message: "User registered successfully",
        user: newlyCreatedUser
        // data: result
    })
    // } sending response

});

// exports{

module.exports = router;

// } exports
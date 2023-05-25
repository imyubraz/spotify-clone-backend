// Imports {

    // importing/requiring jsonwebtoken as jwt
    const jwt = require("jsonwebtoken");
    
// } Imports

// get token function {

const getToken = async (user) =>{
    const payload = {
        id: user._id
    }
    const secret = process.env.JWT_SECRET_KEY
    const token = jwt.sign(payload, secret);
    return token;
}

// } get token function {

// Exports (Exporting identifiers (properties/methods/variables/constants) from this file sonthat it can be used in other file by importing.) {

module.exports = {
    getToken
}

// } Exports

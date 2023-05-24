// jwt
const jwt = require("jsonwebtoken");

const getToken = async (user) =>{
    const payload = {
        id: user._id
    }
    const token = jwt.sign(payload);
    return token;
}

module.exports = {
    getToken
}
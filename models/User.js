// 1: Requiring mongoose
const mongoose = require("mongoose");

// 2: Create a model schema using mongoose
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, "First name is required!"]
    },
    lastName:{
        type: String,
        required: [true, "Last name is required!"]
    },
    username:{
        type: String,
        required: [true, "Username is required!"]
    },
    email:{
        type: String,
        required: [true, "Email is required!"]
    },
    likedSongs:{
        type: String,
        default: ""
    },
    likedPlaylists:{
        type: String,
        default: ""
    },
    subscribedArtists:{
        type: String,
        default: ""
    }
})

// 3: Create a model as per schema defined
const userModel = mongoose.model("user", userSchema);
/*
First argument : user => collection name in mongodb
second argument : userSchema (schema to be followed to create collection)
*/

// 4: Exporting model
module.exports = userModel;

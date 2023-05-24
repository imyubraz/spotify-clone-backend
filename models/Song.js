// 1: Requiring mongoose
const mongoose = require("mongoose");

// 2: Create a model schema using mongoose
const songSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Song name is required!"],
    },
    thumbnail: {
        type: String,
        default: "",
    },
    track: {
        type: String,
        required: true,
    },
    artist: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        // refering to 'user' collection (since artist is also a user who get registered first)
    }
})

// 3: Create a model as per schema defined
const songModel = mongoose.model("song", songSchema);

// 4: Exporting model
module.exports = songModel;

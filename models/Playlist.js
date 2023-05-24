// 1: Requiring mongoose
const mongoose = require("mongoose");

// 2: Create a model schema using mongoose
const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Playlist name is required!"],
    },
    thumbnail: {
        type: String,
        default: "",
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        // refering to 'user' collection
    },
    songs: [
        {
            type: mongoose.Types.ObjectId,
            ref: "song",
            // refering to 'song' collection (since playlist includes already stored songs in db)
        }
    ],
    songs: [
        {
            type: mongoose.Types.ObjectId,
            ref: "user",
            // refering to 'user' collection
        }
    ],
})

// 3: Create a model as per schema defined
const playlistModel = mongoose.model("song", playlistSchema);

// 4: Exporting model
module.exports = playlistModel;

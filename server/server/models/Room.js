const mongoose = require("mongoose");
const { Schema } = mongoose;

const roomSchema = new Schema({
  playlist: [{ trackId: String }],
  currentSong: { playing: Boolean, trackId: String }
});

module.exports = mongoose.model("rooms", roomSchema);

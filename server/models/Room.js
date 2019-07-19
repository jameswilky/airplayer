const mongoose = require("mongoose");
const { Schema } = mongoose;

const roomSchema = new Schema({
  playlist: [{ trackId: String }],
  currentSong: { playing: Boolean, trackId: String }
});

mongoose.model("rooms", roomSchema);

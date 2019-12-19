const mongoose = require("mongoose");
const { Schema } = mongoose;

const HostSchema = new Schema({
  location: String,
  roomId: String,
  spotifyUserId: String,
  token: String,
  createdAt: { type: Date, default: Date.now }
});

HostSchema.pre("save", next => {
  now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

HostSchema.method("toClient", function() {
  const obj = this.toObject();

  obj.id = obj._id;
  delete obj._id;

  return obj;
});
module.exports = mongoose.model("hosts", HostSchema);

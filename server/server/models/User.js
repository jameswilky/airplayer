const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  location: String,
  scopes: { host: Boolean, client: Boolean },
  createdAt: { type: Date, default: Date.now }
});

RoomSchema.pre("save", next => {
  now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});
module.exports = mongoose.model("users", UserSchema);

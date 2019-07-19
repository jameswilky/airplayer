const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  location: String,
  scopes: { host: Boolean, client: Boolean }
});

module.exports = mongoose.model("users", userSchema);

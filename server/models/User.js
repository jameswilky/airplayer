const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  location: String,
  scopes: { host: Boolean, client: Boolean }
});

mongoose.model("users", userSchema);

if (process.env.NODE_ENV === "production") {
  // we are in production
  module.exports = require("./prod");
} else {
  /// we are in dev, return dev keys
  module.exports = require("./dev");
}

if (process.env.NODE_ENV === "production") {
  // we are in production
  module.exports = require("./prod");
} else if (process.env.NODE_ENV === "test") {
  module.exports = require("./test");
} else {
  /// we are in dev, return dev keys
  module.exports = require("./dev");
}

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const socketConfig = require("./socket/socket");
const keys = require("./config/keys");

module.exports = function(app, express, io) {
  // Connect to DB
  const db = mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true
  });

  // Set Up Models
  const users = require("./models/User");
  const rooms = require("./models/Room");

  // Handle Sockets
  socketConfig(io);

  // Connect middleware
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(bodyParser.json());

  // Connect Routes
  const router = express.Router();
  app.use("/api", router);
  require("./routes/router")(router);
};

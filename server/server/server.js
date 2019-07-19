const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const socketConfig = require("./socket/socket");
require("./models/User");
require("./models/Room");

module.exports = function(app, express, io) {
  // Connect to DB
  mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true
  });

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

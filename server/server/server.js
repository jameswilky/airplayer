const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const socketConfig = require("./socket/socket");
const keys = require("./config/keys");

module.exports = function(app, express, io) {
  // Connect to DB
  const db = mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true
  });

  // Handle Sockets
  socketConfig(io);

  // Connect middleware
  //parse application/json and look for raw text
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.text());
  app.use(bodyParser.json({ type: "application/json" }));

  // Connect Routes
  const router = express.Router();
  app.use("/api", router);
  require("./routes/router")(router);
};

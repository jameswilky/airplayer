var bodyParser = require("body-parser");
var path = require("path");

var socketConfig = require("./socket/socket");

module.exports = function(app, express, io) {
  // var router = express.Router();

  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  socketConfig(io);

  app.use(bodyParser.json());

  // app.use(express.static(path.join(__dirname, "../client")));

  // app.use("/api", router);

  // require("./routes/router")(router);
};

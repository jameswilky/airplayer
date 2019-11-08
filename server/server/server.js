const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const socketConfig = require("./socket/socket");
const keys = require("./config/keys");

const cors = require("cors");
const cookieParser = require("cookie-parser");

module.exports = function(app, express, io) {
  // Connect to DB
  mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true
  });

  // handle findByIdAndUpdate depreciation warnings https://mongoosejs.com/docs/deprecations.html#-findandmodify-
  mongoose.set("useFindAndModify", false);

  // Handle Sockets
  socketConfig(io, 3000);

  // Connect middleware
  //parse application/json and look for raw text
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.text());
  app.use(bodyParser.json({ type: "application/json" }));
  app.use(cookieParser());
  app.use(cors());
  // Add headers
  app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

    // Request methods you wish to allow
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
  });

  // Connect Routes
  const router = express.Router();
  app.use("/", router);

  require("./routes/router")(router);
};

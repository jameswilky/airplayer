const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

// configure our server with all the middleware and and routing
require("./server/server.js")(app, express, io);

// if (process.env.NODE_ENV === "production") {
//   // Express will serve up production assets
//   // like our main js file or main.css file
//   app.use(express.static("client/build"));

//   // Express will serve up index.html file if it doesndt recognised the route
//   const path = require("path");
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//     // client side react routes can route relative to this file
//   });
// }
if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main js file or main.css file
  const path = require("path");

  app.use(express.static(path.join(__dirname, "build")));

  // Express will serve up index.html file if it doesnt recognise the route
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
    // client side react routes can route relative to this file
  });
}

// export our app for testing and flexibility, required by index.js
const port = process.env.PORT || 8888;

http.listen(port);
console.log("Listening on port : " + port);

module.exports = app;

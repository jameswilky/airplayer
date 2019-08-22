const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

// configure our server with all the middleware and and routing
require("./server/server.js")(app, express, io);

// export our app for testing and flexibility, required by index.js
const port = process.env.PORT || 5000;

http.listen(port);
console.log("Listening on port : " + port);

module.exports = app;

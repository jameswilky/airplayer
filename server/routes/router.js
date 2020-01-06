const room = require("./room");
const auth = require("./auth");
const cors = require("cors");
// This should deal with request and res logic through callbacks from functions
module.exports = function(app) {
  // Room api
  app.get("/api/rooms", room.getRooms);
  app.post("/api/rooms", room.createRoom);
  app.get("/api/room/:id", room.getRoom);
  app.delete("/api/room/:id", room.deleteRoom);
  app.put("/api/room/:id", room.updateRoom);

  // Recommendations

  // Authentication
  app.get("/auth/login", auth.login);
  app.get("/auth/callback", auth.callback);
  app.get("/auth/refreshToken", auth.refreshToken);
};

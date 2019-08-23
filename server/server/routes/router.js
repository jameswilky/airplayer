const room = require("./room");
const auth = require("./auth");
const cors = require("cors");

module.exports = function(app) {
  // Room api
  app.get("/rooms", room.getRooms);
  app.post("/rooms", room.createRoom);
  app.get("/room/:id", room.getRoom);
  app.delete("/room/:id", room.deleteRoom);
  app.put("/room/:id", room.updateRoom);

  app.get("/login", auth.login);
  app.get("/callback", auth.callback);
  app.get("/refreshToken", auth.refreshToken);
};

const room = require("./room");
const auth = require("./auth");

module.exports = function(app) {
  // Rooms
  app.get("/rooms", room.getRooms);
  app.post("/rooms", room.createRoom);
  app.get("/room/:id", room.getRoom);
  app.delete("/room/:id", room.deleteRoom);
  app.put("/room/:id", room.updateRoom);

  // Authentication
  app.get("/login", auth.login);

  app.get("/callback", auth.redirect);
};

const room = require("./room/room");

module.exports = function(app) {
  app.get("/rooms", room.getRooms);
  app.post("/rooms", room.createRoom);

  app.get("/room/:id", room.getRoom);
  app.delete("/room/:id", room.deleteRoom);
  app.put("/room/:id", room.updateRoom);
};

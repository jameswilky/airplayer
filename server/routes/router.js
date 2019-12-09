const room = require("./room");
const auth = require("./auth");
const cors = require("cors");

module.exports = function(app) {
  // Room api
  app.get("/api/rooms", () => console.log("GET ROOMS SENT TO SERVER"));
  app.post("/api/rooms", room.createRoom);
  app.get("/api/room/:id", room.getRoom);
  app.delete("/api/room/:id", room.deleteRoom);
  app.put("/api/room/:id", room.updateRoom);

  // Authentication
  app.get("/auth/login", auth.login);
  app.get("/auth/callback", auth.callback);
  app.get("/auth/refreshToken", auth.refreshToken);
};

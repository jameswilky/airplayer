const room = require("./room");
const auth = require("./auth");
const cors = require("cors");
const to = require("../helpers/to");
// This should deal with request and res logic through callbacks from functions
module.exports = function(app) {
  // Room api
  app.get("/api/rooms", room.getRooms);
  app.post("/api/rooms", room.createRoom);
  app.get("/api/room/:id", room.getRoom);
  app.delete("/api/room/:id", room.deleteRoom);
  app.put("/api/room/:id", room.updateRoom);

  // Recommendations
  app.post("/api/room/:id/vibe", async (req, res) => {
    try {
      req.body = JSON.parse(req.body);
    } catch (err) {}
    const { accessToken, uris } = req.body;
    const roomId = req.params.id;

    if (accessToken && uris && roomId) {
      const [err, vibe] = await to(
        room.initializeVibe(roomId, accessToken, uris)
      );
      err || vibe === null
        ? res.json({ error: "Vibe initialization failed" })
        : res.json(vibe);
    }
  });

  // Authentication
  app.get("/auth/login", auth.login);
  app.get("/auth/callback", auth.callback);
  app.get("/auth/refreshToken", auth.refreshToken);
};

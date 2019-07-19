const { getRooms, addRoom } = require("../controllers/roomsController");

module.exports = function(app) {
  app.get("/rooms", getRooms);
  app.post("/rooms", addRoom);
};

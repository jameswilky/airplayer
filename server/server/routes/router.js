const { getRooms, addRoom } = require("../controllers/Room");

module.exports = function(app) {
  app.get("/rooms", getRooms);
  app.post("/rooms", addRoom);
};

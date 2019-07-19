let rooms = ["Room 1", "Room 2"];

module.exports = {
  rooms: ["Room 1", "Room 2", "Room 3"],
  getRooms: (req, res) => {
    return rooms;
    // will Sed
    // res.send("NOT IMPLEMENTED: Will Send a list of rooms");
  },
  addRoom: (req, res) => {
    // res.send("NOT IMPLEMENTED: Will add a room to database");
  }
};

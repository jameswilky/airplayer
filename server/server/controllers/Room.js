const rooms = ["Room 1", "Room 2"];

module.exports = {
  getRooms: (req, res) => {
    res.send({ rooms });
  },
  addRoom: (req, res) => {
    // res.send("NOT IMPLEMENTED: Will add a room to database");
  }
};

const { getRooms, addRoom } = require("./Room");

it("returns a list of rooms", () => {
  expect(getRooms()).toStrictEqual(["Room 1", "Room 2"]);
});

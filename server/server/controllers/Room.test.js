const { getRooms, addRoom } = require("./Room");
const mockRequest = require("../helpers/mockRequest");

it("return a list of rooms", async () => {
  const { req, res, err, result } = mockRequest({
    method: "GET",
    url: "/api/rooms"
  });

  getRooms(req, res, err);
  const [error, send] = await result;
  expect(send.rooms).toStrictEqual(["Room 1", "Room 2"]);
});

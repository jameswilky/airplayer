let room = {
  name: "test",
  id: 123,
  playlist: [{ trackID: 1 }, { trackID: 2 }]
};

let controller = {
  getRoom: function() {
    return this.name;
  }
};
let instance = {};
Object.assign(room, controller);

console.log(room);
console.log(room.getRoom());

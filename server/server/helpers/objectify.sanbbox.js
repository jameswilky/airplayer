let x = {
  _id: 5,
  track: { _id: 2, name: "test" },
  test: { test: 1 }
};

function fn(obj, key) {
  if (obj.hasOwnProperty(key)) {
    obj.id = obj._id;
    delete obj._id;
  }
  for (let [key, value] of Object.entries(obj)) {
    if (typeof value === "object") return fn(value, "_id");
  }
}

x = fn(x, "_id");
https://stackoverflow.com/questions/15642494/find-property-by-name-in-a-deep-object

// Todo. use lodash forfunciton above
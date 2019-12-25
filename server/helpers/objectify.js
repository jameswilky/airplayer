// Converts a mongoose object to a regular json object
module.exports = model => {
  const object = JSON.parse(JSON.stringify(model));
  if (object.hasOwnProperty("_id")) {
    object.id = model._id;
    delete object._id;
  }

  return object;
};

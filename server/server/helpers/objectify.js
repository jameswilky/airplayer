// Converts a mongoose object to a regular json object
module.exports = model => {
  const object = JSON.parse(JSON.stringify(model));
  object.id = model._id;
  delete object._id;
  object.id.toString();
  return object;
};

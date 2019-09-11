const getKey = obj =>
  Object.keys(obj)[0] === undefined ? {} : Object.keys(obj)[0];

export default { getKey };

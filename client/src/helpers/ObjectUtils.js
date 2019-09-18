const getKey = obj =>
  Object.keys(obj)[0] === undefined ? {} : Object.keys(obj)[0];

const getNestedProperty = (prop, results) =>
  Object.assign(
    {},
    ...Object.entries(results).map(entry => {
      return entry[1] === null
        ? { [entry[0]]: [] }
        : {
            [entry[0]]: Object.values({ ...entry[1][prop] })
          };
    })
  );

const arrayToObject = (array, names) =>
  names
    ? names.length === array.length
      ? Object.assign(...names.map((k, i) => ({ [k]: array[i] })), {
          ["default"]: array[0]
        })
      : Object.assign({}, { ["default"]: array[0] })
    : Object.assign({}, { ...array });
export { getKey, getNestedProperty, arrayToObject };

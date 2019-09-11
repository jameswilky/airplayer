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
export { getKey, getNestedProperty };

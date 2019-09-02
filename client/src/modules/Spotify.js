String.prototype.replaceAll = function(search, replacement) {
  const target = this;
  return target.split(search).join(replacement);
};

if (Object.fromEntries === undefined) {
  Object.fromEntries = arr =>
    Object.assign({}, ...Array.from(arr, ([k, v]) => ({ [k]: v })));
}

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

const Spotify = (token, send = true) => {
  const api = "https://api.spotify.com/v1/";
  const get = q =>
    fetch(encodeURI(`${api}${q}`), {
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json"
      })
    }).then(res => res.json());

  const merge = (obj, template) => {
    /*
    Example
     obj : {a:1,a:2} 
     template : (k,v) => `{k}={v}` 
     returns "a=1b=2"
    */
    return Object.entries(obj)
      .map(([k, v]) => template(k, v))
      .join(",");
  };

  const appendOptions = options =>
    merge(options, (k, v) => (v === "" ? "" : `&${k}=${v}`)).replaceAll(
      ",",
      ""
    );
  const appendConditions = condititions =>
    merge(condititions, (k, v) => `${k}:${v}`).replaceAll(",", " ");

  const containsSpaces = str => str.split(" ").length < 2;

  const pluralize = str => (str.slice(-1) === "s" ? str : `${str}s`);
  const hyphenize = str => str.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
  const depthOf = function(object) {
    var level = 1;
    var key;
    for (key in object) {
      if (!object.hasOwnProperty(key)) continue;

      if (typeof object[key] == "object") {
        var depth = depthOf(object[key]) + 1;
        level = Math.max(depth, level);
      }
    }
    return level;
  };

  const innerKeys = function(o) {
    return Object.keys(o).reduce(function(r, k) {
      return typeof o[k] === "object" ? innerKeys(o[k]) : ((r[k] = o[k]), r);
    }, {});
  };

  const multiSearch = query =>
    Object.keys(innerKeys(query))[0] === "0" && depthOf(query) === 4;

  const singleSearch = query =>
    Object.keys(innerKeys(query))[0] === "id" && depthOf(query) === 3;

  const conditionBased = query =>
    Object.keys(innerKeys(query))[0] === "id" && depthOf(query) === 4;

  const parseOptions = (query, target) =>
    Object.fromEntries(
      Object.entries(query[target]).filter(option => option[0] !== "where")
    );
  const parseQuery = query => {
    if (conditionBased(query)) {
      const target = Object.keys(query)[0];
      const condition = Object.keys(query[target].where)[0];
      const id = query[target].where[condition].id;

      const options = parseOptions(query, target);
      return `${pluralize(condition)}/${id}/${hyphenize(target)}${
        isEmpty(options) ? "" : `?${appendOptions(options).substring(1)}`
      }`;
    }
    if (singleSearch(query)) {
      const target = Object.keys(query)[0];
      const id = query[target].where.id;
      return `${pluralize(hyphenize(target))}/${id}`;
    }
    if (multiSearch(query)) {
      const target = Object.keys(query)[0];
      const ids = Object.values(innerKeys(query));
      return `${pluralize(hyphenize(target))}?ids=${ids}`;
    }
  };

  return {
    search: ({
      query = "",
      type = "",
      offset = "",
      limit = "",
      market = "",
      wildcard = false
    }) => {
      const buildQuery = () =>
        typeof query === "string"
          ? wildcard
            ? `${query}*`
            : `${query}`
          : typeof query === "object"
          ? appendConditions(query)
          : "";

      const queryString = encodeURI(
        `search?q=${buildQuery()}${appendOptions({
          type,
          limit,
          offset,
          market
        })}`
      );

      return send ? get(queryString) : queryString;
    },

    browse: query => (send ? get(parseQuery) : parseQuery(query)),

    // albums,artists, tracks
    find: query => (send ? get(parseQuery) : parseQuery(query)),

    // library, follow , personalization , playlists, users profile
    user: () => {},

    player: () => {}
  };
};

export default Spotify;

// const url = "https://api.spotify.com/v1/albums/0sNOF9WDwhWunNAHPD3Baj";
// const go = url =>
//   fetch(encodeURI(url), {
//     headers: new Headers({
//       Authorization: `Bearer   BQAf7y4qO08IFngAwyYZ69DPeAlK4vf-7KH00MgvYOaN4qLbkBoKF0bmsBzhCcuMhdZcH0dN49ToDyCjessqxoHQz96ilqGFkpJSO-gBoNGV8ZEiNeo9hiP8Yq9XH6Rie-pa_Mh5K4iY9PeJRiIjYcGNDXyTq0p4xIAaRepltFE7uIQYXBHW`,
//       "Content-type": "application/json"
//     })
//   }).then(res => res.json());

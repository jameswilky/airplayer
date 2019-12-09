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

const hasMultipleIds = query => Object.keys(innerKeys(query)).length > 1;

const isSingleTrackSearch = query =>
  query.hasOwnProperty("tracks") &&
  query.tracks.hasOwnProperty("where") &&
  query.tracks.where.hasOwnProperty("id") &&
  typeof query.tracks.where.id === "string";

const parseQuery = query => {
  let domain, ids, result, id, target;

  if (hasMultipleIds(query)) {
    domain = Object.keys(query)[0];
    ids = Object.values(innerKeys(query));
    result = `${pluralize(hyphenize(domain))}?ids=${ids}`;
  } else {
    target = Object.keys(query)[0];
    domain = Object.keys(query[target].where)[0];
    id = query[target].where[domain].id;
    result = `${pluralize(domain)}/${id}/${hyphenize(target)}`;
  }
  if (isSingleTrackSearch(query)) {
    target = Object.keys(query)[0];
    id = query[target].where.id;
    result = `${pluralize(target)}/${id}`;
  }

  return result;
};
/***** */
let query, expects;

query = { tracks: { where: { albums: { id: "6akEvsycLGftJxYudPjmqK" } } } };

expects = "albums/6akEvsycLGftJxYudPjmqK/tracks";

console.log(parseQuery(query) === expects);

/*********** */

query = {
  topTracks: { where: { artist: { id: "43ZHCT0cAZBISjO8DG9PnE" } } }
};

expects = "artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks";

console.log(parseQuery(query) === expects);
/****** */

query = {
  artists: {
    where: { ids: ["0oSGxfWSnnOXhD2fKuz2Gy", "3dBVyJ7JuOMt4GE9607Qin"] }
  }
};

expects = "artists?ids=0oSGxfWSnnOXhD2fKuz2Gy,3dBVyJ7JuOMt4GE9607Qin";
console.log(parseQuery(query) === expects);
/***** */

query = {
  tracks: {
    where: {
      ids: [
        "11dFghVXANMlKmJXsNCbNl",
        "20I6sIOMTCkB6w7ryavxtO",
        "7xGfFoTpQ2E7fRF5lN10tr"
      ]
    }
  }
};

expects =
  "tracks?ids=11dFghVXANMlKmJXsNCbNl,20I6sIOMTCkB6w7ryavxtO,7xGfFoTpQ2E7fRF5lN10tr";

console.log(parseQuery(query) === expects);
/***** */
query = {
  tracks: {
    where: {
      id: "11dFghVXANMlKmJXsNCbNl"
    }
  }
};
console.log(parseQuery(query) === "tracks/11dFghVXANMlKmJXsNCbNl");

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

  const request = (query, type, body = "") => {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json"
      },
      method: type
    };

    if (type !== "GET") {
      options.body = JSON.stringify(body);
    }
    if (send) {
      return fetch(encodeURI(`${api}${query}`), options).then(res =>
        res.json()
      );
    } else {
      options.api = api;
      options.string = encodeURI(query);
      return options;
    }
  };

  const put = (q, body) => request(q, "PUT", body);
  const get = q => request(q, "GET");
  const remove = (q, body) => request(q, "DELETE", body);

  const merge = (obj, template) => {
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

  const pluralize = str => (str.slice(-1) === "s" ? str : `${str}s`);
  const dePluralize = str =>
    str.slice(-1) === "s" ? str.slice(0, str.length - 1) : str;

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
  const findQuery = query => {
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

      const queryString = `search?q=${buildQuery()}${appendOptions({
        type: dePluralize(type),
        limit,
        offset,
        market
      })}`;

      return get(queryString);
    },

    // browse: query => (send ? get(findQuery) : findQuery(query)),

    // albums,artists, tracks
    find: query => get(findQuery(query)),

    // library, follow , personalization , users profile
    user: () => {
      const userQuery = ({
        id = "",
        ids = "",
        type,
        suffix = "",
        prefix = ""
      }) =>
        type === "playlist"
          ? `playlists/${id ? id : ids}${suffix}`
          : `${prefix}?type=${type}${id || ids ? `&ids=${id ? id : ids}` : ""}`;

      return {
        follows: params =>
          get(userQuery({ ...params, prefix: "me/following/contains" })),

        follow: params =>
          put(
            userQuery({
              ...params,
              suffix: "/followers",
              prefix: "me/following"
            })
          ),

        unfollow: params =>
          remove(
            userQuery({
              ...params,
              suffix: "/followers",
              prefix: "me/following"
            })
          ),

        getFollowed: params =>
          get(userQuery({ ...params, prefix: "me/following" })),

        library: () => {
          const libraryQuery = query =>
            `me/${typeof query === `string` ? pluralize(query) : query.type}`;

          const libraryBody = ({ id, ids }) => (ids ? ids : [id]);

          return {
            contains: ({ id, type, ids }) =>
              get(`me/${pluralize(type)}/contains?ids=${id ? id : ids}`),
            get: query => get(libraryQuery(query)), // not libary.get, refers to function in Spotify() closure
            delete: query => remove(libraryQuery(query), libraryBody(query)),
            add: query => put(libraryQuery(query), libraryBody(query))
          };
        },
        top: type => get(`me/top/${pluralize(type)}?limit=50`),
        me: () => get("me"),
        playlists: () => get("me/playlists"),
        artists: () => get("me/following?type=artist")
      };
    },

    playlists: () => {},
    player: () => {}
  };
};
export default Spotify;

const Spotify = (token, send = true) => {
  const api = "https://api.spotify.com/v1/";
  const get = q =>
    fetch(encodeURI(`${api}${q}`), {
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json"
      })
    }).then(res => res.json());

  /*
    Example
     obj : {a:1,a:2} 
     template : (k,v) => `{k}={v}` 
     returns "a=1b=2"
    */
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
  const appendConditons = condititions =>
    merge(condititions, (k, v) => `${k}:${v}`).replaceAll(",", " ");

  const containsSpaces = str => str.split(" ").length < 2;

  return {
    albums: () => {},
    browse: () => {},
    follow: () => {},
    library: () => {},
    personalization: () => {},
    player: () => {},
    playlists: () => {},
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
          ? containsSpaces(query) && type === "playlist"
            ? `'${query}'${wildcard ? "*" : ""}`
            : `${query}${wildcard ? "*" : ""}`
          : typeof query === "object"
          ? appendConditons(query)
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

    tracks: () => {}
  };
};

String.prototype.replaceAll = function(search, replacement) {
  const target = this;
  return target.split(search).join(replacement);
};

export default Spotify;

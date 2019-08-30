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

  return {
    // albums: ({ id, market = "" }) => {
    //   const queryString = `albums/${id}${appendOptions({
    //     market
    //   })}`;

    //   return send ? get(queryString) : queryString;
    // },

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

    browse: () => {},

    // albums,artists, tracks
    find: query => {},

    // library, follow , personalization , playlists, users profile
    user: () => {},

    player: () => {}
  };
};

String.prototype.replaceAll = function(search, replacement) {
  const target = this;
  return target.split(search).join(replacement);
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

const Spotify = token => {
  const api = "https://api.spotify.com/v1/";
  const get = q =>
    fetch(`${api}${q}`, {
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json"
      })
    }).then(res => res.json());

  // replace spaces to encodings
  const parse = q => q.replace(" ", "%20");

  // const Query = prefix => {
  //   // Recursively adds conditions and values to a url
  //   return {
  //     where: (condition, value) => Query(`${prefix}&${condition}=${value}`),
  //     and: (condition, value) => Query(`${prefix}&${condition}=${value}`),
  //     exec: () => get(parse(prefix)),
  //     return: () => parse(prefix)
  //   };
  // };

  const Conditions = prefix => {
    const concatMap = obj =>
      Object.entries(obj)
        .map(([k, v]) => `&${k}=${v}`)
        .join("");
    return {
      where: conditions => parse(prefix + concatMap(conditions))
    };
  };

  return {
    albums: () => {},
    browse: () => {},
    follow: () => {},
    library: () => {},
    personalization: () => {},
    player: () => {},
    playlists: () => {},
    // search: q => Query(`search?q=${q}`),
    search: q => Conditions(`search?q=${q}`),
    tracks: () => {}
  };
};

export default Spotify;

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

  const Query = prefix => {
    return {
      where: (condition, value) => Query(`${prefix}&${condition}=${value}`),
      run: () => get(prefix)
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
    search: q => Query(`search?q=${q}`),
    tracks: () => {}
  };
};

export default Spotify;

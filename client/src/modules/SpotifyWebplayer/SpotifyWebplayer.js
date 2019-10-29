const SpotifyWebplayer = (accessToken, device_id) => {
  const token = accessToken;
  const deviceId = device_id;

  const play = track =>
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: "PUT",
      body: JSON.stringify({
        uris: [track]
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

  return { play };
};

export default SpotifyWebplayer;

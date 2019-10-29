const SpotifyWebplayer = (accessToken, Player) => {
  const token = accessToken;
  // const deviceId = deviceId;

  const player = new Player({
    name: "Web Playback SDK Quick Start Player",
    getOAuthToken: cb => {
      cb(token);
    }
  });

  return Object.assign(player, {
    deviceId: null,
    deviceReady: false,
    setDevice: function(id) {
      if (this.deviceId == null) {
        this.deviceId = id;
        this.deviceReady = true;
      } else {
        console.log("Device already selected");
      }
    },
    play: function(track) {
      fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            uris: [track]
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );
    }
  });
};

export default SpotifyWebplayer;

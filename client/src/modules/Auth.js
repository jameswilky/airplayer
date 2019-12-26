const anHour = 3600000; // in milliseconds

const getHashParams = () => {
  let hashParams = {};
  let e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  e = r.exec(q);
  while (e) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
    e = r.exec(q);
  }
  return hashParams;
};

export default {
  accessToken: null,
  refreshToken: null,
  accessTokenCreationTime: null,
  refreshTimer: null,

  cacheAuthData: function() {
    const authData = localStorage.getItem("authData");
    Object.assign(this, JSON.parse(authData));
  },
  refreshAccessToken: function() {
    fetch(`/auth/refreshToken?refresh_token=${this.refreshToken}`)
      .then(res => res.json())
      .then(data => {
        const nextAuthData = {
          refreshToken: this.refreshToken,
          accessToken: data.access_token,
          accessTokenCreationTime: Date.now()
        };
        localStorage.setItem("authData", JSON.stringify(nextAuthData));
      });
  },
  startRefreshTimer: function() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
    }
    this.refreshTimer = setInterval(() => {
      this.refreshAccessToken();
      this.cacheAuthData();
    }, this.accessTokenCreationTime - Date.now() + anHour / 2);
  },
  init: function() {
    this.cacheAuthData();
    if (this.refreshToken) {
      this.startRefreshTimer();
    }
  },

  login: function() {
    const nextAuthData = {
      accessToken: getHashParams().access_token,
      refreshToken: getHashParams().refresh_token,
      accessTokenCreationTime: Date.now()
    };
    localStorage.setItem("authData", JSON.stringify(nextAuthData));
  },

  logout: function() {
    const url = "https://www.spotify.com/logout/";
    const spotifyWindow = window.open(
      url,
      "Spotify Logout",
      "width=700,height=500,top=40,left=40"
    );

    setTimeout(() => {
      spotifyWindow.close();
      localStorage.removeItem("authData");
      window.location.reload();
    }, 2000);
  }
};

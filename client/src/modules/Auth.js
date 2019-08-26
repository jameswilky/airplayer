// TODO set up timer to refresh tokens every x minutes
// TODO add event listener on auth hook for access token refreshes

const anHour = 3600000; // in milliseconds
const server = "http://localhost:8888";

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

const tokenHasExpired = () => {
  const accessTokenCreationTime = localStorage.getItem(
    "accessTokenCreationTime"
  );
  const then = new Date(accessTokenCreationTime);
  const now = new Date();

  return now - then > anHour ? true : false;
};

const refreshAccessToken = async (token, setToken) => {
  const res = await fetch(`${server}/auth/refreshToken?refresh_token=${token}`);
  const json = await res.json();
  setToken(json.access_token);
};

export default (() => {
  // This helper module is used for handling authentication
  // side effects as well as manipulating token caching
  const login = () => {
    window.location.href = server + "/auth/login";
  };

  const logout = () => {
    const url = "https://www.spotify.com/logout/";
    const spotifyWindow = window.open(
      url,
      "Spotify Logout",
      "width=700,height=500,top=40,left=40"
    );

    setTimeout(() => {
      spotifyWindow.close();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.reload();
    }, 2000);
  };

  const setAccessToken = () => {
    localStorage.setItem("accessTokenCreationTime", new Date());
    return localStorage.setItem("accessToken", getHashParams().access_token);
  };

  const setRefreshToken = () => {
    return localStorage.setItem("refreshToken", getHashParams().refresh_token);
  };

  const getAccessToken = () => {
    // tokenHasExpired()
    //   ? refreshAccessToken(getRefreshToken(), setAccessToken)
    //   : localStorage.getItem("accessToken");
    //TODO find a way to do this asynchronously

    return localStorage.getItem("accessToken");
  };

  const getRefreshToken = () => localStorage.getItem("refreshToken");

  const isAuthenticated = () => (getAccessToken() === null ? false : true);

  return {
    login,
    logout,

    setAccessToken,
    getAccessToken,

    setRefreshToken,
    getRefreshToken,

    isAuthenticated
  };
})();

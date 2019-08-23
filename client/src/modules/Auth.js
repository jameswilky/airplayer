export default (() => {
  const login = () => {
    window.location.href = "http://localhost:8888/auth/login";
  };

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

  const setAccessToken = () => {
    localStorage.setItem("accessToken", getHashParams().access_token);
  };

  const setRefreshToken = () => {
    localStorage.setItem("refreshToken", getHashParams().refresh_token);
  };

  const getAccessToken = () => localStorage.getItem("accessToken");

  const getRefreshToken = () => localStorage.getItem("refreshToken");
  const isAuthenticated = () => (getAccessToken() === null ? false : true);
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

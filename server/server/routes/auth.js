const keys = require("../config/keys");
const request = require("request");
const querystring = require("querystring");

const { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI, SPOTIFY_CLIENT_SECRET } = keys;

module.exports = {
  login: (req, res) => {
    res.redirect(
      "https://accounts.spotify.com/authorize?" +
        querystring.stringify({
          response_type: "code",
          client_id: SPOTIFY_CLIENT_ID,
          scope: "user-read-private user-read-email",
          redirect_uri: SPOTIFY_REDIRECT_URI
        })
    );
  },
  redirect: (req, res) => {
    const code = req.query.code || null;
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: SPOTIFY_REDIRECT_URI,
        grant_type: "authorization_code"
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET).toString(
            "base64"
          )
      },
      json: true
    };
    request.post(authOptions, function(error, response, body) {
      const access_token = body.access_token;
      const uri = FRONTEND_URI;
      res.redirect(uri + "?access_token=" + access_token);
    });
  }
};

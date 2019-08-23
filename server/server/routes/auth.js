const keys = require("../config/keys");
const request = require("request");
const querystring = require("querystring");
const generateRandomString = require("../helpers/generateRandomString");

const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_REDIRECT_URI,
  SPOTIFY_CLIENT_SECRET,
  FRONTEND_URI
} = keys;

const stateKey = "spotify_auth_state";

module.exports = {
  login: (req, res) => {
    console.log("login");

    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    // Provides client with login screen
    const scope = "user-read-private user-read-email";
    res.redirect(
      "https://accounts.spotify.com/authorize?" +
        querystring.stringify({
          response_type: "code",
          client_id: SPOTIFY_CLIENT_ID,
          scope: scope,
          redirect_uri: SPOTIFY_REDIRECT_URI,
          state: state
        })
    );
  },
  callback: (req, res) => {
    // Application requests refresh and access tokens
    // after checking the state parameter
    console.log("callback");

    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
      res.redirect(
        FRONTEND_URI +
          `/#` +
          querystring.stringify({
            error: "state_mismatch"
          })
      );
    } else {
      res.clearCookie(stateKey);
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
            new Buffer(
              SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET
            ).toString("base64")
        },
        json: true
      };

      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          const access_token = body.access_token,
            refresh_token = body.refresh_token;

          // const options = {
          //   url: "https://api.spotify.com/v1/me",
          //   headers: { Authorization: "Bearer " + access_token },
          //   json: true
          // };
          // // use the access token to access the Spotify Web API
          // request.get(options, function(error, response, body) {
          //   console.log(body);
          // });

          // we can also pass the token to the browser to make requests from there
          res.redirect(
            FRONTEND_URI +
              `/#` +
              querystring.stringify({
                access_token: access_token,
                refresh_token: refresh_token
              })
          );
        } else {
          res.redirect(
            FRONTEND_URI +
              `/#` +
              querystring.stringify({
                error: "invalid_token"
              })
          );
        }
      });
    }
  },
  refreshToken: (req, res) => {
    // takes in a refresh token to return a new access token
    // This will allow us to maintain access to spotify web api,
    // without requiring user to relog in
    const refresh_token = req.query.refresh_token;
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      headers: {
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + client_secret).toString("base64")
      },
      form: {
        grant_type: "refresh_token",
        refresh_token: refresh_token
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        res.send({
          access_token: access_token
        });
      }
    });
  }
};

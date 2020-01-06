# Airplayer

Airplayer is an open source web application allowing Spotify users to collaboratively control their music together. Users can join or host rooms that allow them to manipulate a shared playlist in real time, which can be played in the browser.

|                                                             |                                                                           |
| ----------------------------------------------------------- | :-----------------------------------------------------------------------: |
| ![User Interface](https://i.ibb.co/Nmv9MgJ/desktop-min.jpg) | ![enter image description here](https://i.ibb.co/LRYYwHf/mobile1-min.jpg) |

## How it works

A user can either be a client or a host. A host is a user that creates a room and has full control over the music, with the ability to add/remove/pause/play tracks as well as control the volume of the device. A client can view all tracks that are queued in the room, as well as search Spotify for tracks, including tracks from their own library, which they can also add to the playlist. In the future, scopes will be added to allow certain clients to be able to have more control over the room based on privileges granted by the host. See Future Plans section for more information.

#### User Journey (Host)

1.  User opens landing page
2.  User logs in with a Spotify premium account
3.  User creates a room
4.  User lands on above home page

##### Hosts are required to use a desktop browser as the Spotify Web Playback API is not supported on mobile. See the Future Plans section for possible workarounds.

#### User Journey (Client)

1.  User opens landing page
2.  User logs with a Spotify free/premium Account
3.  User searches for available rooms and joins one
4.  User lands on above home page

Once a client has joined a room, all actions committed by any user in the room, such as adding, removing or queuing tracks, will update the state of the room for all users.

<!-- GIF showing 2 rooms where users are adding tracks to room and how it updates -->

## Under the hood

The application consists of the following entities:

1.  Server
    1. Rest API
    2. Websocket Server
2.  Users (Host)
3.  Users (Client)
4.  Database
5.  Spotify Web API Service
6.  Spotify Device

<!-- Image showing how all entities are linked -->

#### Server

The server is written in NodeJS and has two primary responsibilities. One is handling HTTP requests from users for creating/reading rooms and adding them to the database. The other is handling WebSocket connections so that users can join rooms as well as dispatch actions to update the state for all users with in those rooms.

The WebSocket server (written with socket.io) utilizes a similar architecture to the [flux design pattern](https://facebook.github.io/flux/), which is a popular way of designing React/Redux front-end applications, as well as a [pub-sub](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) pattern for handling state changes and requests from clients. The WebSocket server stores a cached list of rooms and users which contains `room` and `user` objects respectively.

A `room` is as an object containing properties such as `roomid` `playlist : [trackid1,trackid2]` and `currentTrack : { trackId,isPaused}` which describes the state of the room.

When a room is created it is added to the array of rooms, and all users in that room subscribe to it. When a user attempts an `action`, it is dispatched to a `reducer` which will create a new room state, and send a new room state to all users in the room. The database is then asynchronously updated with the new room state.

This design pattern has worked out to be very extensible, as creating new actions is as trivial as adding a new case to the reducer. However there are obvious scalability issues with storing all the users and rooms in an array on the server, as this will eventually cause it to crash once the arrays hit a certain size. See the Future Plans section for more information

---

#### User

The front end is created using React. Users are subscribed to room changes from the server and update the application state to reflect the given state. The WebSocket server can be thought of as a Redux Store which is at the top of the application. When a user dispatches an action it is sent to the server, as as that state updates, all users in the subscribed room will receive that state update.

<!-- image showing user committing actions to web-socket server and sending the state back to clients -->

##### Hosts

Hosts are users that are able to create rooms and have more control over the room state than regular clients. Host authentication is handled as follows:

1. Host makes a post request to server to create a room
2. A `room` object is created in the database along with an access token
3. The token is then sent back to client and stored in local storage
4. Whenever a user attempts a host-only action, they are required to pass in the access token
5. The **first time** a host-only action is attempted, the server checks the database to see if given token is valid. If it is, a reference is made in the `users` array for that socket id to be treated as a host.
6. Subsequent host actions will save time by not checking the database and simply checking the in-memory `users` array.

#### Database

The database was created with MongoDB. Its a very simple schema with 2 collections, `hosts` and `rooms`. The host model looks like this:

```
{
	id : ObjectId,
	spotifyUserId : String,
	roomId : String,
	token : String,
	createdAt : Date
}
```

And the room model looks like this:

```
{
	id : ObjectId,
	name : String,
	password : String,
	location : String,
	playlist : [ { uri: String } ],
	currentSong : [ { uri: String, playing: Boolean }]
	createdAt : Date
}
```

<!-- explain models -->

#### Spotify Web API

The Spotify Web API is used to fetch music data which can be referenced using a `uri`. On the server, to save memory, only the `uri` is passed around the room, and the track information is retrieved from Spotify when it is needed.

<!-- image explaining -->

Spotify uses the [OAuth2](https://oauth.net/articles/authentication/) protocol for handling authentication. Spotify offers a [multiple ways of authenticating](https://developer.spotify.com/documentation/general/guides/authorization-guide/), of which this application uses the 'Authorization Code Flow' method. This requires storing access and refresh tokens on the client side, as well as a API secret key on server side. This method of authentication allows the user to have long running sessions without having to log back in every hour.

![enter image description here](https://i.ibb.co/Xtmn6Y4/oauthflow.jpg)

#### Spotify Device

A 'device' refers to an instance of a browser player that exists on the Spotify servers. Actions such as pause, play or loading a track are triggered through the client side app, then verified on the Spotify servers, which then updates the state of the client side browser web player.

Only one Spotify device instance is used within a room, and is only directly accessible by the host user. To allow clients to manipulate the device, clients have to communicate with the server through `actions`, which will update the room state. The device is synchronized with the room state that is visible to the host, and the device will then reflect the state of the room.

As an example, lets run through how a client would add pause a track :

1. Client clicks pause button on player
2. This emits a `PAUSE` event to the web socket server
3. The server returns a new room state with the `paused` property set to `true`
4. The server emits a `ROOM_UPDATED` event containing the new room state to all users in the room.
5. The host receives the `ROOM_UPDATED` event and will see that the `paused` property is set to `true` which will trigger a `pause` action to the device sitting on the Spotify servers.
6. The browser web-player will then receive confirmation is needs to set it state to pause which will then pause the music.

<!-- image explaining process of pausing/playing a track -->

<!-- ## Putting it all together

describe flows for actions and how all the entities are effected. -->

## Known Issues

- ~~Search functionality not working on mobile, may be due to Debouncing of requests to Spotify API.~~ Fixed
- ~~Footer not showing on chrome mobile due to view-port issues.~~ Fixed on safari and chrome.
- ~~if hosts joins another room they can no longer host the previous room as their token is overridden in local storage.~~ Fixed
- Music can randomly start playing after being paused for a while. Not sure why this is happening.
- Device state can be out of sync with room state. There are work arounds to this issue, but it breaks the [Unidrectional Dataflow](https://en.wikipedia.org/wiki/Unidirectional_Data_Flow_%28computer_science%29) of the application. A fix involves allowing the host directly changing the device state and then have that reflected in the room state, rather than changing the room state and having that reflected in the device state. This would also make interactions appear faster, and prevents some other race conditions, but adds complications if in the future clients will be able to pause/play tracks.
- Room updates will reset carousel. Pretty common react issue, should be fixable.
- ~~Need to redirect page to search whenever input is entered.~~ Fixed
- Changing Dark-mode/ light-mode refreshes the page. This is a workaround as i set my theme provider too high in the component hierarchy, and not refreshing would re run all of the hooks that are only expected to run once. This should be easy to fix after a refactor, but i'm currently looking for a more scale-able solution that doesn't involve adding a theme provider for every component that needs access to the theme.

## Future Plans

- Password protected Rooms
- Invite users via links
- Invite users via QR Code
- Add Google Geo-location API to allow users to search by address and give a room an addressable location
- Split room playlist in two, one as a queue that holds specific track requests and priorities those tracks, as well as playlist that is generated based on recommended tracks
- Recommend tracks based on the average musical taste of users in the room, using the [Spotify recommendation API](https://developer.spotify.com/documentation/web-api/reference/browse/get-recommendations/)
- Allow hosts to set scopes so that clients are able to use certain actions
- Integrate with Apple music/YouTube Music/Tidal
- Allow hosts to set the vibe of a room by filtering out tracks that are too 'dancy'. This is actually not that hard as the Spotify API provides an [audio feature analysis](https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/) for every track on Spotify with features such as 'instrumentness' and 'danceability'
- Add a UI component to see which users are in the room
- Show the connection status of the client, and add re-join buttons
- Add audio visualization

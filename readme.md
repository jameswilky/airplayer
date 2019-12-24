# Airplayer

Airplayer is an open source web application allowing Spotify users to collaboratively control their music together. Users can join or host rooms that allow them to manipulate a shared playlist in real time, which can be played in the browser.

|                                                             |                                                                           |
| ----------------------------------------------------------- | :-----------------------------------------------------------------------: |
| ![User Interface](https://i.ibb.co/Nmv9MgJ/desktop-min.jpg) | ![enter image description here](https://i.ibb.co/LRYYwHf/mobile1-min.jpg) |

## How it works

A user can either be a client or a Host. A host is a user that creates a room and has full control over the music, being able to add/remove/pause/play tracks as well as change the volume of the device. A client can view all tracks that are queued in the room, as well as search Spotify for tracks, including tracks from their own library, which they can also add to the playlist. In the future, scopes will be added to allow certain clients to be able to have more control over the room based on privileges granted by the host. See Future Plans section for more information.

#### User Journey (Host)

1.  User opens landing page
2.  User logs in with a Spotify premium account
3.  User creates a room
4.  User lands on above home page

##### Hosts are required to use a desktop browser as the Spotify Web Playback API is not supported on mobile. See the Future Plans section for possible future workarounds.

#### User Journey (Client)

1.  User opens landing page
2.  User logs with a Spotify free/premium Account
3.  User searches for available rooms and joins one
4.  User lands on above home page

---

Once a client has joined a room, all actions committed by any user in the room, such as adding, removing or queuing tracks, will update the state of the room for all users.

\*\*GIF showing 2 rooms where users are adding tracks to room and how it updates

---

## Under the hood

### Architecture

\*\* Image

The application consists of the following entities:

1.  Server
    1. Rest API
    2. Websocket Server
2.  Database
3.  Spotify Web API Service
4.  Spotify Device
5.  Users (Host)
6.  Users (Client)

\*\* Image showing how all entities are linked

#### Server

The server is written in NodeJS and has two primary responsibilities. One is handling HTTP requests from users for creating/reading rooms and adding them to the database. The other is handling WebSocket connections so that users can join rooms as well as send actions to users with in those rooms.

The WebSocket server (written with socket.io) utilizes a similar architecture to the [flux design pattern](https://facebook.github.io/flux/), which is a popular way of designing React/Redux front-end applications, as well as a [pub-sub](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) pattern for handling state changes and requests from clients. The WebSocket server stores a cached list of rooms and users which contains `room` and `user` objects respectively.

A `room` is as an object containing properties such as `roomid` `playlist : [trackid1,trackid2]` and `currentTrack : { trackId,isPaused}` which describes the state of the room.

When a room is created it is added to the array of rooms, and all users in that room subscribe to it. When a user attempts an `action`, it is dispatched to a `reducer` which will create a new room state, and send a new room state to all users in the room. The database is then asynchronously updated with the new room state.

This design pattern has worked out to be very extensible, as creating new actions is as trivial as adding a new case to the reducer. However there are obvious scalability issues with storing all the users and rooms in an array on the server, as this will eventually cause it to crash once the arrays hit a certain size. See the Future Plans section for more information

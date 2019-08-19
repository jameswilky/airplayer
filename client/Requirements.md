# Requirements

User Types

- 'User' refers to clients that have not joined or created a room yet
- 'Room Clients' refer to users that have joined a room
- 'Room Hosts' refer to users that have created and host a room

1. Users should be able to have the option to view a list of available rooms
2. The only rooms that should be listed are rooms within a certain radius of the Users location
3. Users should be able to have the options to create rooms
4. When a user attempts to create a room, they should be allowed to choose the following properties:
   1. Give the room a name
   2. An option to give the room a password
5. For a given room listing users should be able to find out the following:
   1. The name of the room
   2. Wether it requires a password or not
   3. An option to join the room
6. When a user attempts to join a room that requires a password, they should be asked to provide one
7. When a user attempts to join a room that requires a password, and they provide the wrong one, they should not be able to join
8. Once in a room the following actions should be allowed by All users
   1. Adding a track
   2. Add a playlist
9. Once in a room the following actions should be allowed exclusively by hosts of that room:
   1. Removing a track
   2. Pausing a track
   3. Playing a track
   4. Updating the playlist order
   5. Skip to the next track in the playlist
10. When the user attempts to join a room or create a room, they will be asked to login with their spotify account
11. Logged in Users should be able to do the following
12. Search for a track on spotify
13. View the current playlist
14. Select tracks to get information about them
15. View the current status of the current track, encompassing the following properties:
    1. Wether the track is paused/playing
    2. How long the track is
    3. The track name and artist
    4. How much of that track has been played
    5. How much of the track that is yet to be played

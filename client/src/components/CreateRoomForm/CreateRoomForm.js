import React, { useState, useEffect } from "react";
import { Container, CreateForm, SearchForm, CreateButton } from "./styles";
import { IoIosKey, IoIosPeople, IoIosSearch } from "react-icons/io";
import { GoLocation } from "react-icons/go";
import { Redirect } from "react-router-dom";
import Carousel from "../Carousel/Carousel";
import useSearch from "../../hooks/useSearch/useSearch";

export default function CreateRoomForm(props) {
  const initialData = {
    name: "",
    password: "",
    location: "",
    userId: props.user.uri,
    playlist: []
  };
  const api =
    process.env.NODE_ENV === "production"
      ? "https://airplayer.herokuapp.com/api/"
      : "http://localhost:8888/api/";

  const [data, setData] = useState(initialData);
  const [roomState, setRoomState] = useState({
    created: false,
    tracksSelected: false,
    done: false,
    id: null
  });

  const { query, setQuery, queryResults } = useSearch(props.accessToken);

  //                stage 1   =>   stage 2        stage 3                  stage 4
  // Form Stages : Enter data =>   created   =>   tracksSelected    =>     done

  useEffect(() => {
    // Stage 3
    if (roomState.tracksSelected) {
      fetch(api + "rooms", { method: "POST", body: JSON.stringify(data) })
        .then(res => res.json())
        .then(json => {
          localStorage.setItem("token", json.token);
          setRoomState({
            done: true,
            id: json.room.id
          });
        });
    }
  }, [roomState.tracksSelected, data]);

  const addTrack = uri =>
    setData({ ...data, playlist: [...data.playlist, { uri }] });

  const removeTrack = uri =>
    setData({
      ...data,
      playlist: data.playlist.filter(track => track.uri !== uri)
    });

  return (
    <>
      {roomState.done ? (
        // Stage 4
        <Redirect to={`room/${roomState.id}`}></Redirect>
      ) : (
        <Container>
          {roomState.created ? (
            //Stage 2
            <SearchForm>
              <div>
                <p>Choose at least 3 tracks to get started</p>
              </div>

              <div type="container">
                <IoIosSearch type="icon"></IoIosSearch>
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Enter a track or artist name..."
                />
              </div>

              {queryResults.tracks.length > 0 ? (
                <Carousel
                  addItem={addTrack}
                  removeItem={removeTrack}
                  items={queryResults.tracks}
                  selectedItems={data.playlist}
                ></Carousel>
              ) : query === "" ? (
                <></>
              ) : (
                <p>No tracks matching "{query}"</p>
              )}

              {data.playlist.length > 2 ? (
                <CreateButton
                  onClick={() =>
                    setRoomState({ ...roomState, tracksSelected: true })
                  }
                >
                  Enter Room
                </CreateButton>
              ) : null}
            </SearchForm>
          ) : (
            <CreateForm>
              {/* Stage 1 */}
              <p>Name</p>
              <input
                type="text"
                value={data.name}
                placeholder="Enter a room name"
                onChange={e => setData({ ...data, name: e.target.value })}
                required
              />
              <IoIosPeople type="icon"></IoIosPeople>
              <p>Password</p>
              <input
                type="text"
                placeholder="Enter a room password"
                value={data.password}
                onChange={e => setData({ ...data, password: e.target.value })}
              />
              <IoIosKey type="icon"></IoIosKey>
              <p>Location</p>
              <input
                type="text"
                placeholder="Enter your location"
                required
                value={data.location}
                onChange={e => setData({ ...data, location: e.target.value })}
              />
              <GoLocation type="icon"></GoLocation>
              <CreateButton
                type="submit"
                onClick={() => setRoomState({ ...roomState, created: true })}
              >
                Create
              </CreateButton>
            </CreateForm>
          )}
        </Container>
      )}
    </>
  );
}
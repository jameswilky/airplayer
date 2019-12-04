import React, { useState, useEffect } from "react";
import { Container, Form } from "./styles";
import { IoIosKey, IoIosPeople } from "react-icons/io";
import { GoLocation } from "react-icons/go";
import { Redirect } from "react-router-dom";

export default function CreateRoomForm() {
  const initialData = { name: "", password: "", location: "" };
  const api = "http://localhost:8888/api/";

  const [data, setData] = useState(initialData);
  const [roomState, setRoomState] = useState({
    creating: false,
    created: false,
    id: null
  });

  useEffect(() => {
    if (roomState.creating) {
      fetch(api + "rooms", { method: "POST", body: JSON.stringify(data) })
        .then(res => res.json())
        .then(json => {
          setRoomState({ creating: false, created: true, id: json.room.id });
        });
    }
  }, [roomState.creating, data]);

  const handleSubmit = e => {
    e.preventDefault();
    setRoomState({ ...roomState, creating: true });
  };

  return (
    <>
      {roomState.created ? (
        <Redirect to={`room/${roomState.id}`}></Redirect>
      ) : (
        <Container>
          <Form onSubmit={handleSubmit}>
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
            <button type="submit">Create</button>
          </Form>
        </Container>
      )}
    </>
  );
}

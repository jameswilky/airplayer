import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import List from "../../../components/List";
import ListItem from "../../../components/ListItem";

import {
  Background,
  Container,
  Head,
  Body,
  ExtendedStyledListItem
} from "./styles";

export default function Home(props) {
  const { login, logout } = props;

  const api = "http://localhost:8888/api/";
  const [rooms, setRooms] = useState([]);
  console.log(rooms);

  useEffect(() => {
    fetch(api + "rooms")
      .then(res => res.json())
      .then(data => setRooms(data));
  }, []);

  const JoinButton = item => (
    <Link to={`/room/5d47d90a191f0f30a0d73414`}>
      <button>Join Room</button>
    </Link>
  );

  return (
    <Background>
      <Container>
        <Head>
          <input placeholder="Enter a party Name" type="text" />
          <input placeholder="Change your location" type="text" />
        </Head>
        <Body>
          <List items={rooms}>
            <ListItem
              Style={ExtendedStyledListItem}
              name={item => item.name}
              src={item =>
                "https://i.scdn.co/image/f5990a4c6059df42ae7b39b8524cd6ecce334995"
              }
              labels={item => [item.location, item.createdAt]}
              button={item => JoinButton(item)}
            ></ListItem>
          </List>
        </Body>
      </Container>
    </Background>
  );
}

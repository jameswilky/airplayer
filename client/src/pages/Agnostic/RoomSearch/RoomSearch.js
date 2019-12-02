import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import List from "../../../components/List";
import ListItem from "../../../components/ListItem";
import { IoIosAdd, IoIosLogIn } from "react-icons/io";
import Modal from "../../../components/Modal/Modal";

import {
  Background,
  Container,
  Head,
  Body,
  ExtendedStyledListItem,
  Button,
  CreateButton
} from "./styles";

export default function RoomSearch(props) {
  const api = "http://localhost:8888/api/";
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch(api + "rooms")
      .then(res => res.json())
      .then(data => setRooms(data));
  }, []);

  // TODO fix _.id being returned
  const JoinButton = item => (
    <Button>
      <Link to={`/room/${item._id}`}>
        <IoIosLogIn></IoIosLogIn>
      </Link>
    </Button>
  );

  const [showModal, setShowModal] = useState(false);

  return (
    <Background>
      <h1>Airplayer</h1>
      <p>Join a room or create your own</p>
      <Container roundBorder={showModal}>
        <Head>
          <input placeholder="Enter a party Name" type="text" />
          <input placeholder="Change your location" type="text" />{" "}
          {/* Desktop only */}
          <div>
            <IoIosAdd></IoIosAdd>
            <p>Create Room</p>
          </div>
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
        {/* Mobile only */}
        <CreateButton show={!showModal} onClick={() => setShowModal(true)}>
          <div type="circle"></div>
          <IoIosAdd type="icon"></IoIosAdd>
        </CreateButton>

        <Modal show={showModal} title="Create a Room" setShow={setShowModal}>
          <div>Test</div>
        </Modal>
      </Container>
    </Background>
  );
}

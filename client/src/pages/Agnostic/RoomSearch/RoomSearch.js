import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import List from "../../../components/List";
import ListItem from "../../../components/ListItem";
import { IoIosAdd, IoIosLogIn } from "react-icons/io";
import Modal from "../../../components/Modal/Modal";
import CreateRoomForm from "../../../components/CreateRoomForm/CreateRoomForm";

import useProfile from "../../../hooks/useProfile";
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
  const [rooms, setRooms] = useState([]);
  const user = useProfile(props.auth);

  const getTimeSince = start => {
    const minutesSince = Math.round(
      (Date.now() - new Date(start).getTime()) / 1000 / 60
    );
    if (minutesSince < 2) {
      return "a few seconds ago";
    }
    if (minutesSince > 2 && minutesSince < 60) {
      return `${minutesSince} minutes ago`;
    } else {
      return `${Math.round(minutesSince / 60)} hours ago`;
    }
  };

  useEffect(() => {
    fetch("/api/rooms")
      .then(res => res.json())
      .then(data => {
        setRooms(
          data
            .reverse()
            .filter(
              room => Number(getTimeSince(room.createdAt).split(" ")[0]) < 48
            )
        );
      });
  }, []);

  const [resultFilter, setResultFilter] = useState("");

  console.log(resultFilter);

  const JoinButton = item => (
    <Button>
      <Link to={`/room/${item.id}`}>
        <IoIosLogIn></IoIosLogIn>
      </Link>
    </Button>
  );

  const [showModal, setShowModal] = useState(false);

  return (
    <Background>
      <h1>Airplayer</h1>
      <p>Join a room or create your own</p>
      <Container>
        <Head>
          <input
            placeholder="Enter a party Name"
            type="text"
            value={resultFilter}
            onChange={e => setResultFilter(e.target.value)}
          />
          {/* <input placeholder="Change your location" type="text" />{" "} */}
          {/* Desktop only */}
          <div onClick={() => setShowModal(true)}>
            <IoIosAdd></IoIosAdd>
            <p>Create</p>
          </div>
        </Head>
        <Body>
          <List items={rooms.filter(room => room.name.includes(resultFilter))}>
            <ListItem
              Style={ExtendedStyledListItem}
              name={item => item.name}
              src={item =>
                "https://i.scdn.co/image/f5990a4c6059df42ae7b39b8524cd6ecce334995"
              }
              labels={item => [
                `Created ${getTimeSince(item.createdAt)} in `,
                item.location
              ]}
              button={item => JoinButton(item)}
            ></ListItem>
          </List>
        </Body>
        {/* Mobile only imolement later*/}
        {/* <CreateButton show={!showModal} onClick={() => setShowModal(true)}>
          <div type="circle"></div>
          <IoIosAdd type="icon"></IoIosAdd>
        </CreateButton> */}

        <Modal show={showModal} title="Create a Room" setShow={setShowModal}>
          {user && (
            <CreateRoomForm user={user} auth={props.auth}></CreateRoomForm>
          )}
        </Modal>
      </Container>
    </Background>
  );
}

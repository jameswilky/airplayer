import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Auth from "../modules/Auth";
import { useSelector } from "react-redux";
import styled from "styled-components";
import List from "../components/List";
import ListItem from "../components/ListItem";
import StyledListItem from "../styles/StyledListItem";
const Background = styled.div`
  background: ${props => props.theme.gradient};
  height: 100vh;
  justify-content: center;
  justify-items: center;
  align-items: center;
  display: grid;
  color: ${props => props.theme.black};
`;

const Container = styled.div`
  display: grid;
  justify-items: center;
  min-width: 320px;
  width: 85vw;
  min-height: 400px;
  height: 85vh;
  background-color: ${props => props.theme.transparent2};
  grid-template-rows: 70px 1fr;
  grid-template-columns: 1fr;
  animation: fadeIn 1s;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
const Head = styled.div`
  display: grid;
  width: 100%;

  grid-template-columns: 2fr 1fr;

  & > input {
    padding: 15px;
  }
`;

const Body = styled.div`
  & ${List} {
    width: 100%;
  }
  overflow-x: hidden;
  overflow-y: scroll;
  padding-top: 15px;
`;

const ExtendedStyledListItem = styled(StyledListItem)`
  & button {
    background: ${props => props.theme.transparent2};
    color: ${props => props.theme.black};
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.8rem;
    width: 100px;
  }
  padding: 0 15px;
`;

export default function Home(props) {
  const { login, logout } = Auth;
  const auth = useSelector(state => state.auth);

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

// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// export default function RoomSearch() {
//   const [showModal, setShowModal] = useState(false);
//   const styles = {
//     container: {
//       display: "grid",
//       width: "100%",
//       justifyItems: "center",
//       gridTemplateColumns: "1fr"
//     },
//     body: {
//       display: "grid",
//       width: "100%",
//       gridTemplateColumns: "1fr"
//     },
//     header: {
//       display: "grid",
//       width: "100%"
//     },
//     input: { width: "80%", height: "50px", padding: "10px" },
//     item: {
//       display: "grid",
//       width: "100%",
//       cursor: "pointer",
//       border: "2px solid black",
//       margin: "20px 0 0px 0",
//       padding: "10px"
//     },
//     modal: {
//       position: "absolute",
//       top: "50%",
//       left: "50%",
//       margin: "-200px 0px  0px -200px",
//       height: "400px",
//       width: "400px",
//       border: "2px solid black",
//       padding: "10px",
//       backgroundColor: "grey"
//     },
//     exit: {
//       position: "relative",
//       float: "right",
//       right: "10px",
//       cursor: "pointer"
//     }
//   };
//   const { container, body, header, item, input, modal, exit } = styles;

//   return (
//     <>
//       <div style={container}>
//         <div style={header}>
//           <input type="text" style={input} placeholder="search for a room" />
//         </div>
//         <div style={body}>
//           <div
//             style={item}
//             onClick={() => {
//               setShowModal(true);
//             }}
//           >
//             <p>Room 1</p>
//             <p>Requires Password</p>
//           </div>
//           <div style={item}>
//             <p>Room 2</p>
//             <p>Requires Password</p>
//           </div>
//           <div style={item}>
//             <p>Room 3</p>
//             <p>Requires Password</p>
//           </div>
//         </div>
//       </div>
//       {showModal ? (
//         <div style={modal}>
//           <span onClick={() => setShowModal(false)} style={exit}>
//             X
//           </span>
//           <div>
//             <h2>Room 1</h2>
//             <p>Enter Password</p>
//             <input type="text" style={input} placeholder="enter password" />
//
//           </div>
//         </div>
//       ) : null}
//     </>
//   );
// }

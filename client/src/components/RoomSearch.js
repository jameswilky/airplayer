import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function RoomSearch() {
  const [showModal, setShowModal] = useState(false);
  const styles = {
    container: {
      display: "grid",
      width: "100%",
      justifyItems: "center",
      gridTemplateColumns: "1fr"
    },
    body: {
      display: "grid",
      width: "100%",
      gridTemplateColumns: "1fr"
    },
    header: {
      display: "grid",
      width: "100%"
    },
    input: { width: "80%", height: "50px", padding: "10px" },
    item: {
      display: "grid",
      width: "100%",
      cursor: "pointer",
      border: "2px solid black",
      margin: "20px 0 0px 0",
      padding: "10px"
    },
    modal: {
      position: "absolute",
      top: "50%",
      left: "50%",
      margin: "-200px 0px  0px -200px",
      height: "400px",
      width: "400px",
      border: "2px solid black",
      padding: "10px",
      backgroundColor: "grey"
    },
    exit: {
      position: "relative",
      float: "right",
      right: "10px",
      cursor: "pointer"
    }
  };
  const { container, body, header, item, input, modal, exit } = styles;
  return (
    <>
      <div style={container}>
        <div style={header}>
          <input type="text" style={input} placeholder="search for a room" />
        </div>
        <div style={body}>
          <div
            style={item}
            onClick={() => {
              setShowModal(true);
            }}
          >
            <p>Room 1</p>
            <p>Requires Password</p>
          </div>
          <div style={item}>
            <p>Room 2</p>
            <p>Requires Password</p>
          </div>
          <div style={item}>
            <p>Room 3</p>
            <p>Requires Password</p>
          </div>
        </div>
      </div>
      {showModal ? (
        <div style={modal}>
          <span onClick={() => setShowModal(false)} style={exit}>
            X
          </span>
          <div>
            <h2>Room 1</h2>
            <p>Enter Password</p>
            <input type="text" style={input} placeholder="enter password" />
            <Link to="/room1">
              <button>Join Room</button>
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}

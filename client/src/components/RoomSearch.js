import React from "react";

const styles = {
  container: {
    display: "grid",
    width: "100%",
    maxWidth: "900px",
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
  input: { width: "100%" },
  item: { display: "grid", width: "100%" }
};

export default function RoomSearch() {
  const { container, body, header, item, input } = styles;
  return (
    <>
      <div style={container}>
        <div style={header}>
          <input type="text" style={input} placeholder="search for a room" />
        </div>
        <div style={body}>
          <div style={item}>
            <p>Room 1</p>
            <p>Requires Password</p>
            <button>Join Room</button>
          </div>
          <div style={item}>
            <p>Room 2</p>
            <p>Requires Password</p>
            <button>Join Room</button>
          </div>
          <div style={item}>
            <p>Room 3</p>
            <p>Requires Password</p>
            <button>Join Room</button>
          </div>
        </div>
      </div>
    </>
  );
}

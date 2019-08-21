import React from "react";
import { gameOvaImg } from "../images";

// Mobile Version
export default function Player() {
  const styles = {
    container: {
      color: "whitesmoke",
      backgroundColor: "#1E2222",
      fontSize: "1.5rem"
    },
    head: {
      display: "grid",
      height: "calc(100vh - 50px)",
      gridTemplateRows: "2.5fr 1fr"
    },
    headTop: {
      position: "relative"
    },
    headBottom: {
      display: "grid",
      gridTemplateRows: "3fr 2fr 1fr",
      justifyContent: "center",
      alignItems: "center"
    },
    picture: {
      objectFit: "contain",
      width: "100%",
      maxHeight: "500px"
    },
    statusContainer: {
      position: "absolute",
      bottom: "100px",
      alignText: "center"
    },
    artistData: {
      textAlign: "center"
    },
    arrowDownContainer: {
      textAlign: "center",
      color: "grey",
      fontSize: "28px"
    },
    body: {},
    item: {},
    footer: {
      position: "fixed",
      left: 0,
      bottom: 0,
      width: "100%",
      color: "white",
      textAlign: "center",
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      height: "50px",
      alignItems: "center",
      borderTop: "2px solid whitesmoke",
      borderTopLeftRadius: "10px",
      borderTopRightRadius: "10px",

      backgroundColor: "#1E2222"
    }
  };
  return (
    <>
      <div style={styles.container}>
        <div style={styles.head}>
          <div style={styles.headTop}>
            <div>
              <img src={gameOvaImg} alt="" style={styles.picture} />
            </div>
            <div style={styles.statusContainer}>SoundWaves</div>
          </div>
          <div style={styles.headBottom}>
            <div style={styles.artistData}>
              <h1>Game Ova</h1>
              <h3>Tobi Lou</h3>
            </div>
            <div>
              <h4>Up Next: Track Name 2</h4>
            </div>
            <div style={styles.arrowDownContainer}>
              <i className="fas fa-chevron-down" />
            </div>
          </div>
        </div>
        <div style={styles.body}>
          <div style={styles.item}>item</div>
          <div style={styles.item}>item</div>
          <div style={styles.item}>item</div>
          <div style={styles.item}>item</div>
          <div style={styles.item}>item</div>
        </div>
      </div>
      <div style={styles.footer}>
        <div>Home</div>
        <div>Search</div>
        <div>Favourites</div>
      </div>
    </>
  );
}

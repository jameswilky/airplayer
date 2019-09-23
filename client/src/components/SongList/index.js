import React from "react";
import {
  StyledContainer,
  StyledChevron,
  StyledList,
  StyledItem,
  StyledResult
} from "./styles";
import List from "../List";

// Modules/Helpers

export default function SongList(props) {
  const { albums, tracks, artists, playlists } = props.results;
  const { query, selected, setSelected, limit = 4, results = {} } = props;

  const noResults =
    albums.length < 1 ||
    tracks.length < 1 ||
    artists.length < 1 ||
    playlists.length < 1;

  const noQuery = query === "";
  const filterOn = selected !== "";

  const ItemTemplate = ({ src, name, labels }) => (
    <StyledItem>
      {src && <img src={src}></img>}
      <div>
        <h3>{name}</h3>
        <ul>{labels && labels.map((label, i) => <p key={i}>{label}</p>)}</ul>
      </div>

      <button>{"+"}</button>
    </StyledItem>
  );

  const Result = ({ title, result }) =>
    results && (!filterOn || selected === title) ? (
      <StyledResult>
        <h2 onClick={() => setSelected(selected === title ? "" : title)}>
          {filterOn ? "" : title}
        </h2>
        <StyledChevron
          visibility={filterOn ? "hidden" : "visible"}
          onClick={() => setSelected(selected === title ? "" : title)}
        ></StyledChevron>
        <List items={result} Style={StyledList} limit={limit}>
          <ItemTemplate
            src={item => item.getImages().default.url}
            name={item => item.name}
            labels={item => item.getLabels()}
          ></ItemTemplate>
        </List>
      </StyledResult>
    ) : (
      <></>
    );

  return (
    <StyledContainer top={props.top || "10px"}>
      {noQuery ? (
        `Please enter a query`
      ) : noResults ? (
        `No results matching ${query}`
      ) : (
        <>
          <Result title={"Tracks"} result={tracks}></Result>
          <Result title={"Playlists"} result={playlists}></Result>
          <Result title={"Artists"} result={artists}></Result>
          <Result title={"Albums"} result={albums}></Result>
        </>
      )}
    </StyledContainer>
  );
}

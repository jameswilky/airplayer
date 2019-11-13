import React from "react";
import {
  StyledContainer,
  StyledChevron,
  StyledList,
  StyledResult
} from "./styles";
import List from "../List";
import ListItem from "../ListItem";
import StyledListItem from "../../styles/StyledListItem";

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
          <ListItem
            src={item => item.getImages().default.url}
            name={item => item.name}
            labels={item => item.getLabels()}
            Style={StyledListItem}
          ></ListItem>
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
import React from "react";
import {
  StyledSearchResults,
  StyledResult,
  StyledResultItem,
  StyledChevron
} from "./styles";

// Modules/Helpers
import { msToMinutes } from "../../helpers/TimeUtils";

// Images
import fallbackImage from "../../images/fallbackImage.png";

export default function SongList(props) {
  const { albums, tracks, artists, playlists } = props.results;
  const { query, selected, setSelected } = props;

  const noResults =
    albums.length < 1 ||
    tracks.length < 1 ||
    artists.length < 1 ||
    playlists.length < 1;

  const noQuery = query === "";
  const filterOn = selected !== "";

  const ResultItem = ({ result, type }) => {
    const image =
      type === "Songs"
        ? result.album.images.length < 1
          ? fallbackImage
          : result.album.images.slice(-1)[0].url
        : result.images.length < 1
        ? fallbackImage
        : result.images.slice(-1)[0].url;
    return (
      <StyledResultItem>
        <img src={image}></img>
        <div>
          <h3>{result.name}</h3>
          <p>Song</p>
          {/* <p>{result.artist}</p> */}
          <span>&#183;</span>
          <p>{msToMinutes(result.duration_ms)}</p>
        </div>
        <button>+</button>
      </StyledResultItem>
    );
  };

  const Result = ({ title, results }) =>
    results && (!filterOn || selected === title) ? (
      <StyledResult>
        <h2 onClick={() => setSelected(selected === title ? "" : title)}>
          {filterOn ? "" : title}
        </h2>
        <StyledChevron
          visibility={filterOn ? "hidden" : "visible"}
          onClick={() => setSelected(selected === title ? "" : title)}
        ></StyledChevron>
        <ul>
          {results.slice(0, filterOn ? 20 : 4).map(result => (
            <li key={result.id}>
              <ResultItem result={result} type={title}></ResultItem>
            </li>
          ))}
        </ul>
      </StyledResult>
    ) : (
      <></>
    );

  return (
    <StyledSearchResults>
      {noQuery ? (
        `Please enter a query`
      ) : noResults ? (
        `No results matching ${query}`
      ) : (
        <>
          <Result title="Songs" results={tracks}></Result>
          <Result title="Artists" results={artists}></Result>
          <Result title="Playlists" results={playlists}></Result>
          <Result title="Albums" results={albums}></Result>
        </>
      )}
    </StyledSearchResults>
  );
}

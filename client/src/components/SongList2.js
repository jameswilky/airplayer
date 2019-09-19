import React from "react";
import {
  StyledContainer,
  StyledChevron,
  StyledList,
  StyledItem
} from "../components/SongList/styles";
import List from "../components/List";

// Modules/Helpers
import { msToMinutes } from "../helpers/TimeUtils";

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

  // const ResultItem = ({ result, type }) => {
  //   const image =
  //     type === "Songs"
  //       ? result.album.images.length < 1
  //         ? fallbackImage
  //         : result.album.images.slice(-1)[0].url
  //       : result.images.length < 1
  //       ? fallbackImage
  //       : result.images.slice(-1)[0].url;
  //   return (
  //     <StyledResultItem>
  //       <img src={image}></img>
  //       <div>
  //         <h3>{result.name}</h3>
  //         <p>Song</p>
  //         {/* <p>{result.artist}</p> */}
  //         <span>&#183;</span>
  //         <p>{msToMinutes(result.duration_ms)}</p>
  //       </div>
  //       <button>+</button>
  //     </StyledResultItem>
  //   );
  // };

  // const Result = ({ title, results }) =>
  //   results && (!filterOn || selected === title) ? (
  //     <StyledResult>
  //       <h2 onClick={() => setSelected(selected === title ? "" : title)}>
  //         {filterOn ? "" : title}
  //       </h2>
  //       <StyledChevron
  //         visibility={filterOn ? "hidden" : "visible"}
  //         onClick={() => setSelected(selected === title ? "" : title)}
  //       ></StyledChevron>
  //       {/* <ul>
  //         {results.slice(0, filterOn ? 20 : limit).map(result => (
  //           <li key={result.id}>
  //             <ResultItem result={result} type={title}></ResultItem>
  //           </li>
  //         ))}
  //       </ul> */}
  //       <List items={results} styles={{ StyledItem: StyledResultItem }}></List>
  //     </StyledResult>
  //   ) : (
  //     <></>
  //   );

  console.log(results);
  const ListContainer = () =>
    results &&
    Object.keys(results).map(result => (
      <List
        items={results[result]}
        getImage={item => item.getImages().default.url}
        getName={item => item.name}
        getLabels={item => item.getLabels()}
        styles={{ StyledList, StyledItem }}
        button={"+"}
      ></List>
    ));
  return (
    <StyledContainer top={props.top || "10px"}>
      {noQuery ? (
        `Please enter a query`
      ) : noResults ? (
        `No results matching ${query}`
      ) : (
        <>
          <ListContainer></ListContainer>
        </>
      )}
    </StyledContainer>
  );
}

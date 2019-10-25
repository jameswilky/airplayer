import React from "react";
import styled from "styled-components";
import Carousel from "../../components/Carousel/";
import List from "../../components/List";
import ListItem from "../../components/ListItem";
import StyledListItem from "../../styles/StyledListItem";
import useSearch from "../../hooks/useSearch/";

const Container = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: minmax(350px, 1fr) 1fr;
  grid-template-rows: 1fr 2fr;
  grid-gap: 15px;
  padding: 15px;
`;

const CarouselContainer = styled.div`
  grid-column: span 2;
`;
const RoomPlaylist = styled.div`
  overflow-y: scroll;
  padding: 10px;
`;

export default function DesktopHomeInterface() {
  const { query, setQuery, queryResults } = useSearch();
  return (
    <Container>
      <CarouselContainer>
        <Carousel items={queryResults.tracks}></Carousel>
      </CarouselContainer>
      <RoomPlaylist>
        <List items={queryResults.tracks}>
          <ListItem
            Style={StyledListItem} // TODO fix
            src={item => item.getImages().default.url}
            name={item => item.name}
            labels={item => item.getLabels()}
          ></ListItem>
        </List>
      </RoomPlaylist>
    </Container>
  );
}

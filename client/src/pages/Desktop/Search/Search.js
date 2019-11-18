import React, { useState } from "react";
import List from "../../../components/List";
import ListItem from "../../../components/ListItem";
import { IoIosAdd, IoIosCheckmark } from "react-icons/io";
import StyledListItem from "../../../styles/StyledListItem";
import styled, { css } from "styled-components";
import SongList from "../../../components/SongList/SongList";
export default function Search({
  results,
  addTrack,
  filter,
  setFilter,
  query
}) {
  const Container = styled.div`
    padding: ${props => 2 * props.theme.unit + "px"};
  `;

  const Icon = css`
    font-size: 3rem;
    cursor: pointer;
    &:hover {
      color: ${props => props.theme.transparent3};
    }
    transition: color 0.5s;
  `;

  const AddIcon = styled(IoIosAdd)`
    ${Icon}
  `;

  const TickIcon = styled(IoIosCheckmark)`
    ${Icon}
  `;

  return (
    <Container>
      <SongList
        {...{
          query,
          selected: filter,
          setSelected: setFilter,

          results: results
        }}
      ></SongList>
      {/* <List items={results.tracks}>
        <ListItem
          Style={StyledListItem}
          name={item => item.name}
          src={item => item.getImages().default.url}
          labels={item => item.getLabels()}
          button={item =>
            selected ? (
              <TickIcon onClick={() => {}}></TickIcon>
            ) : (
              <AddIcon onClick={() => addTrack(item.uri)}></AddIcon>
            )
          }
        ></ListItem>
      </List> */}
    </Container>
  );
}

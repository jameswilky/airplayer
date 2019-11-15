import React from "react";
import List from "../../../components/List";
import ListItem from "../../../components/ListItem";
import { IoIosAdd } from "react-icons/io";
import StyledListItem from "../../../styles/StyledListItem";
import styled from "styled-components";
export default function Search({ results, addTrack }) {
  const Container = styled.div`
    padding: ${props => 2 * props.theme.unit + "px"};
  `;
  return (
    <Container>
      <List items={results.tracks}>
        <ListItem
          Style={StyledListItem}
          name={item => item.name}
          src={item => item.getImages().default.url}
          labels={item => item.getLabels()}
          button={item => (
            <IoIosAdd
              onClick={() => addTrack(item.uri)}
              style={{ fontSize: "3rem" }}
            ></IoIosAdd>
          )}
        ></ListItem>
      </List>
    </Container>
  );
}

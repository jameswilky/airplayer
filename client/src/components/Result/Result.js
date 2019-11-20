import React from "react";
import List from "../List";
import ListItem from "../ListItem";
import StyledListItem from "../../styles/StyledListItem";
import { Container, StyledChevron, StyledList } from "./styles";

export default function Result({ title, items, selected, setSelected, limit }) {
  return (
    <Container>
      <h2 onClick={() => setSelected(selected === title ? "" : title)}>
        {selected !== "" && selected !== title ? "" : title}
      </h2>
      <StyledChevron
        direction={selected !== "" ? "left" : "right"}
        onClick={() => setSelected(selected === title ? "" : title)}
      ></StyledChevron>
      <List
        items={items}
        Style={StyledList}
        limit={selected !== title ? limit : items.length}
      >
        <ListItem
          src={item => item.getImages().default.url}
          name={item => item.name}
          labels={item => item.getLabels().map(label => `${label} `)}
          Style={StyledListItem}
        ></ListItem>
      </List>
    </Container>
  );
}

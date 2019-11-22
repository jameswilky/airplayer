import React from "react";
import List from "../List";
import ListItem from "../ListItem";
import StyledListItem from "../../styles/StyledListItem";
import { Container, StyledChevron, StyledList } from "./styles";

export default function Result({
  title,
  items,
  filter,
  setFilter,
  limit,
  actions,
  onClick
}) {
  const Button = ({ item }) => {
    const action = actions.filter(action => action.type === "ADD")[0];
    return action ? (
      <button onClick={() => action.func(item.uri)}>{action.icon}</button>
    ) : null;
  };
  return (
    <Container>
      <h2 onClick={() => setFilter(filter === title ? "" : title)}>
        {filter !== "" && filter !== title ? "" : title}
      </h2>
      <StyledChevron
        direction={filter !== "" ? "left" : "right"}
        onClick={() => setFilter(filter === title ? "" : title)}
      ></StyledChevron>
      <List
        items={items}
        Style={StyledList}
        limit={filter !== title ? limit : items.length}
      >
        <ListItem
          src={item => item.getImages().default.url}
          name={item => item.name}
          labels={item => item.getLabels().map(label => `${label} `)}
          Style={StyledListItem}
          button={actions ? item => <Button item={item}></Button> : null}
          onClick={onClick}
        ></ListItem>
      </List>
    </Container>
  );
}

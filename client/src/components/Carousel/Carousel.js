import React from "react";
import {
  StyledContainer,
  StyledItem,
  StyledOverlay,
  StyledItemContainer,
  StyledList,
  AddIcon,
  TickIcon,
  IconUnderlay
} from "./styles";
import List from "../List";

export default function Carousel(props) {
  const { items, height, addItem, removeItem, selectedItems } = props;

  const ItemTemplate = ({ src, name, labels, uri, selected }) => {
    return (
      <StyledItemContainer>
        {" "}
        <StyledItem>
          <img src={src}></img>
          <h4>{name}</h4>
          {labels && labels.map((label, i) => <p key={i}>{label}</p>)}
        </StyledItem>{" "}
        <StyledOverlay>
          <IconUnderlay></IconUnderlay>
          {selected ? (
            <TickIcon onClick={() => removeItem(uri)}></TickIcon>
          ) : (
            <AddIcon onClick={() => addItem(uri)}></AddIcon>
          )}
        </StyledOverlay>
      </StyledItemContainer>
    );
  };

  return (
    <StyledContainer height={height}>
      <List items={items} Style={StyledList}>
        <ItemTemplate
          src={item => item.getImages().default.url}
          name={item => item.name}
          labels={item => item.getLabels()}
          uri={item => item.uri}
          selected={item =>
            selectedItems && selectedItems.some(obj => obj.uri === item.uri)
          }
        ></ItemTemplate>
      </List>
    </StyledContainer>
  );
}

import React, { useRef, useEffect } from "react";
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

const ItemTemplate = ({
  src,
  name,
  labels,
  uri,
  selected,
  addItem,
  removeItem
}) => {
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

export default function Carousel(props) {
  const { items, height, addItem, removeItem, selectedItems } = props;
  return (
    <StyledContainer height={height}>
      <List items={items} Style={StyledList}>
        <ItemTemplate
          src={item => item.getImages().default.url}
          name={item => item.name}
          labels={item => item.getArtists().map(artist => artist.name)}
          uri={item => item.uri}
          selected={item =>
            selectedItems && selectedItems.some(obj => obj.uri === item.uri)
          }
          addItem={() => addItem}
          removeItem={() => removeItem}
        ></ItemTemplate>
      </List>
    </StyledContainer>
  );
}

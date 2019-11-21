import React from "react";
import {
  StyledContainer,
  StyledItem,
  StyledOverlay,
  StyledItemContainer,
  StyledList,
  AddIcon,
  IconUnderlay
} from "./styles";
import List from "../List";

export default function Carousel(props) {
  const { items, height, addTrack } = props;

  const ItemTemplate = ({ src, name, labels, uri }) => {
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
          <AddIcon onClick={() => addTrack(uri)}></AddIcon>
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
        ></ItemTemplate>
      </List>
    </StyledContainer>
  );
}

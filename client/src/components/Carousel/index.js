import React from "react";
import {
  StyledContainer,
  StyledItem,
  StyledOverlay,
  StyledItemContainer,
  StyledPlayButton,
  StyledList
} from "./styles";
import List from "../List";

export default function Carousel(props) {
  const { items } = props;

  const ItemTemplate = ({ src, name, labels }) => {
    return (
      <StyledItemContainer>
        {" "}
        <StyledItem>
          <img src={src}></img>
          <h4>{name}</h4>
          {labels && labels.map(label => <p>{label}</p>)}
        </StyledItem>{" "}
        <StyledOverlay>
          <StyledPlayButton></StyledPlayButton>
        </StyledOverlay>
      </StyledItemContainer>
    );
  };

  return (
    <StyledContainer>
      <List items={items} Style={StyledList}>
        <ItemTemplate
          src={item => item.getImages().default.url}
          name={item => item.name}
          labels={item => item.getLabels()}
        ></ItemTemplate>
      </List>
    </StyledContainer>
  );
}

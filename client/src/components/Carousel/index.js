import React from "react";
import {
  StyledContainer,
  StyledItem,
  StyledOverlay,
  StyledItemContainer,
  StyledPlayButton
} from "./styles";

export default function Carousel(props) {
  const { items } = props;
  console.log(items);

  const SubItem = ({ label }) => (
    <>
      <p>{label}</p>
      <span>&#183;</span>
    </>
  );
  const Item = ({ src, name, labels }) => {
    return (
      <StyledItemContainer>
        {" "}
        <StyledItem>
          <img src={src}></img>
          <h4>{name}</h4>
          {labels &&
            labels.map(label => <SubItem key={label} label={label}></SubItem>)}
        </StyledItem>{" "}
        <StyledOverlay>
          <StyledPlayButton></StyledPlayButton>
        </StyledOverlay>
      </StyledItemContainer>
    );
  };
  const Items = () =>
    items ? (
      items.map(item => (
        <Item
          key={item.id}
          src={item.album.images[1].url}
          name={item.name}
          labels={[item.type, item.album.artists[0].name]}
        ></Item>
      ))
    ) : (
      <></>
    );
  return (
    <StyledContainer>
      <Items></Items>
    </StyledContainer>
  );
}

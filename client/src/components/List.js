import React from "react";
import styled from "styled-components";

export default function List(props) {
  const {
    items,
    styles = {},
    limit = items ? items.length : 1,
    getImage,
    getName,
    getLabels
  } = props;
  const {
    StyledList = styled.ul``,
    StyledItem = styled.li``,
    StyledSubItem = styled.div``
  } = styles;

  const SubItem = ({ label }) => (
    <StyledSubItem>
      <p>{label}</p>
      <span>&#183;</span>
    </StyledSubItem>
  );
  const Item = ({ src, name, labels }) => (
    <StyledItem>
      {src && <img src={src}></img>}
      <h4>{name}</h4>
      {labels &&
        labels.map(label => <SubItem key={label} label={label}></SubItem>)}
    </StyledItem>
  );

  const Items = () =>
    items
      .slice(0, limit)
      .map((item, i) => (
        <Item
          key={i}
          src={getImage(item)}
          name={getName(item)}
          labels={getLabels(item)}
        ></Item>
      ));

  return (
    <StyledList>
      <Items></Items>
    </StyledList>
  );
}

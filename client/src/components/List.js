import React from "react";
import styled from "styled-components";

export default function List(props) {
  const {
    items = [],
    styles = {},
    limit = items ? items.length : 1,
    getImage,
    getName,
    getLabels,
    button
  } = props;
  const {
    StyledList = styled.ul``,
    StyledItem = styled.li``,
    StyledSubItem = styled.li``
  } = styles;

  const SubItem = ({ label }) => (
    <StyledSubItem>
      <p>{label}</p>
    </StyledSubItem>
  );
  const Item = ({ src, name, labels }) => (
    <StyledItem>
      {src && <img src={src}></img>}
      <div>
        <h3>{name}</h3>
        <ul>
          {labels &&
            labels.map(label => <SubItem key={label} label={label}></SubItem>)}
        </ul>
      </div>

      <button>{button ? "+" : ""}</button>
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

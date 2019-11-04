import React from "react";
import styled from "styled-components";

export default function ListItem({
  src,
  name,
  labels,
  Style = styled.li``,
  selected = false,
  onClick = () => {},
  button = <></>
}) {
  const Labels = () => (
    <ul>
      {labels.map((label, i) => (
        <p key={i}>{label}</p>
      ))}
    </ul>
  );

  return (
    <Style
      selected={selected}
      button={button}
      onClick={(e, item) => onClick(e, item)}
      on
    >
      {src && <img src={src}></img>}
      <div>
        <h3>{name}</h3>
        {labels && <Labels></Labels>}
      </div>

      {button}
    </Style>
  );
}

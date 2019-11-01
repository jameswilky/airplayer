import React from "react";
import styled from "styled-components";

export default function ListItem({
  src,
  name,
  labels,
  Style = styled.li``,
  selected
}) {
  const Labels = () => (
    <ul>
      {labels.map((label, i) => (
        <p key={i}>{label}</p>
      ))}
    </ul>
  );

  // console.log(selected, name);
  return (
    <Style selected={selected}>
      {src && <img src={src}></img>}
      <div>
        <h3>{name}</h3>
        {labels && <Labels></Labels>}
      </div>

      <button>{"+"}</button>
    </Style>
  );
}

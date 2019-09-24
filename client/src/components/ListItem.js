import React from "react";
import styled from "styled-components";

const Labels = labels => (
  <ul>
    {labels.map((label, i) => (
      <p key={i}>{label}</p>
    ))}
  </ul>
);
export default function ListItem({ src, name, labels, Style = styled.li`` }) {
  return (
    <Style>
      {src && <img src={src}></img>}
      <div>
        <h3>{name}</h3>
        {labels && Labels}
      </div>

      <button>{"+"}</button>
    </Style>
  );
}

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function ListItem({
  src,
  name,
  labels,
  Style = styled.li``,
  filter = false,
  onClick = () => {},
  button = <></>,
  link = false
}) {
  const Labels = () => (
    <ul>
      {labels.map((label, i) => (
        <p key={i}>{label}</p>
      ))}
    </ul>
  );
  const WithLink = ({ condition, wrapper, children }) =>
    condition ? wrapper(children) : children;

  return (
    <WithLink
      condition={link}
      wrapper={children => (
        <Link style={{ textDecoration: "none", color: "inherit" }} to={link}>
          {children}
        </Link>
      )}
    >
      <Style
        filter={filter}
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
    </WithLink>
  );
}

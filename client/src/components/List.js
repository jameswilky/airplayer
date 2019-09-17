import React from "react";

const EmptyComponent = () => <></>;

export default function List(props) {
  const { items, styles = {}, limit = items.length } = props;
  const {
    StyledItems = EmptyComponent,
    StyledItem = EmptyComponent,
    StyledSubItem = EmptyComponent
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
  const Items = () => (
    <StyledItems>
      {items &&
        items
          .slice(0, limit)
          .map(({ key, src, name, labels }) => (
            <Item key={key} src={src} name={name} labels={labels}></Item>
          ))}
    </StyledItems>
  );

  return <Items></Items>;
}

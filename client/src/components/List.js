import React from "react";
import styled from "styled-components";

export default function List(props) {
  const {
    items = [],
    Style = styled.ul``,
    limit = items ? items.length : 1
  } = props;

  const ItemProps = function(item, childProps) {
    return Object.fromEntries(
      Object.entries(childProps)
        .filter(([propName]) => propName !== "Style")
        .map(([propName, callback]) => {
          const handler = callback;
          return propName !== "onClick"
            ? [propName, (callback = handler(item))]
            : [propName, (callback = e => handler(e, item))];
        })
    );
  };

  const Items = () => (
    <Style>
      {items.length > 0 &&
        props.children &&
        items.slice(0, limit).map((item, i) => {
          return React.cloneElement(props.children, {
            ...ItemProps(item, props.children.props),
            key: i
          });
        })}
    </Style>
  );

  return <Items></Items>;
}

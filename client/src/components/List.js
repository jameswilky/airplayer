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
          // onClick and later other events will pass an evnet and not be fired immediately
          // callbacks are ran immediately
          if (callback) {
            const handler = callback;
            const isEvent = propName.slice(0, 2) === "on";
            return isEvent
              ? [propName, (callback = e => handler(e, item))]
              : [propName, (callback = handler(item))];
          } else {
            return [propName, null];
          }
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

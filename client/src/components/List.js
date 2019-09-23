import React from "react";
import styled from "styled-components";

export default function List(props) {
  const {
    items = [],
    Style = styled.ul``,
    limit = items ? items.length : 1
  } = props;

  const ItemProps = (item, childProps) =>
    Object.fromEntries(
      Object.entries(childProps).map(([k, v]) => [k, (v = v(item))])
    );

  const Items = () => (
    <Style>
      {items.length > 0 &&
        items.slice(0, limit).map((item, i) =>
          React.cloneElement(props.children, {
            ...ItemProps(item, props.children.props),
            key: i
          })
        )}
    </Style>
  );

  return <Items></Items>;
}

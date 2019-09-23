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
      {items
        .slice(0, limit)
        .map(item =>
          React.cloneElement(
            props.children,
            ItemProps(item, props.children.props)
          )
        )}
    </Style>
  );

  return <Items></Items>;
}

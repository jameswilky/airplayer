import React from "react";

export default function Input(props) {
  return (
    <input
      type={props.type}
      value={props.value}
      onChange={e => props.setValue(e.target.value)}
    ></input>
  );
}

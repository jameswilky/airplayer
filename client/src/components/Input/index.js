import React from "react";

export default function Input(props) {
  return (
    <input
      name={props.name}
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={e => props.setValue(e.target.value)}
    ></input>
  );
}

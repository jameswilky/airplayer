import React from "react";
import { Container, Title, Body } from "./styles";
import { IoIosClose } from "react-icons/io";
export default function Modal(props) {
  const { show, setShow, title, children } = props;
  return (
    <Container show={show}>
      <IoIosClose onClick={() => setShow(false)} type="icon"></IoIosClose>
      <Title>{title}</Title>
      <Body>{children}</Body>
    </Container>
  );
}

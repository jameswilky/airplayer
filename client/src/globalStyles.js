import styled from "styled-components";

export const Container = styled.div`
  height: calc(100vh - 50px);
  position: relative;
`;

export const Chevron = styled.span`
  opacity: 0.7;
  position: absolute;
  &:before {
    border-style: solid;
    border-width: 1px 1px 0 0;
    content: "";
    display: inline-block;
    height: 12px;
    left: 0;
    position: relative;
    vertical-align: top;
    width: 12px;
    transform: rotate(45deg);
    visibility: ${props => props.visibility};
  }
`;
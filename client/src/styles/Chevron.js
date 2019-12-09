import styled from "styled-components";

export const Chevron = styled.span`
  position: absolute;
  &:before {
    border-style: solid;
    border-width: 2px 2px 0 0;
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

import styled from "styled-components";
import { Chevron } from "../../styles/Chevron";

export const StyledChevron = styled(Chevron)`
  right: 32px;
  margin-top: -23px;
  &:before {
    transform: rotate(45deg);
  }
`;

// TODO add theme to manage colors and padding
export const StyledContainer = styled.div`
  padding: ${props => `${props.top} 10px 50px 10px`};
  background-color: black;
`;

export const StyledResult = styled.div`
  font-size: 1rem;
`;

export const StyledList = styled.ul`
  font-size: 1rem;
  padding-top: 10px;
  & li {
    list-style: none;
  }
`;

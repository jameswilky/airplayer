import styled from "styled-components";
import { Chevron } from "../../styles/Chevron";

export const StyledChevron = styled(Chevron)`
  right: ${props => 3 * props.theme.unit + "px"};
  margin-top: ${props => -2.5 * props.theme.unit + "px"};
  &:before {
    transform: rotate(45deg);
  }
`;

// TODO add theme to manage colors and padding
export const StyledContainer = styled.div`
  padding: ${props => 1 * props.theme.unit + "px"};
  background-color: ${props => props.theme.black};
`;

export const StyledResult = styled.div`
  font-size: 1rem;
`;

export const StyledList = styled.ul`
  font-size: 1rem;
  padding-top: ${props => 1 * props.theme.unit + "px"};
  & li {
    list-style: none;
  }
`;

import styled from "styled-components";
import { Chevron } from "../../../styles/Chevron";

export const Container = styled.div`
  height: calc(100vh - 50px);
  position: relative;
  grid-gap: ${props => 1 * props.theme.unit + "px"};

  & > * {
    padding: ${props => 2 * props.theme.unit + "px"} 0;
  }
  & > h2 {
    font-size: 1.5rem;
    padding-left: ${props => 2 * props.theme.unit + "px"};
  }

  & > ul {
    padding: 0 ${props => 2 * props.theme.unit + "px"};
  }
`;

export const StyledChevron = styled(Chevron)`
  left: 15px;
  margin-top: 15px;
  &:before {
    transform: rotate(-135deg);
  }
`;

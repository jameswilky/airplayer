import styled from "styled-components";
import { Chevron } from "../../../styles/Chevron";
import deviceHasHeader from "../../../modules/deviceHasHeader";

export const Container = styled.div`
  height: ${props =>
    deviceHasHeader() ? `calc(92vh - 56px)` : "calc(100vh - 56px)"};
  position: relative;
  display: grid;
  align-content: flex-start;
  grid-gap: ${props => 1 * props.theme.unit + "px"};
  padding-top: ${props => 2 * props.theme.unit + "px"};

  & > h2 {
    font-size: 1.5rem;
    padding-left: ${props => 2 * props.theme.unit + "px"};
  }
`;

export const StyledChevron = styled(Chevron)`
  left: 15px;
  margin-top: 15px;
  &:before {
    transform: rotate(-135deg);
  }
`;

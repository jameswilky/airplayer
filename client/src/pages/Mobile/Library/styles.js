import styled from "styled-components";
import { Chevron } from "../../../styles/Chevron";

export const Container = styled.div`
  height: calc(100vh - 50px);
  position: relative;
  display: grid;
  grid-gap: 16px;
`;

export const StyledChevron = styled(Chevron)`
  left: 15px;
  margin-top: 15px;
  &:before {
    transform: rotate(-135deg);
  }
`;

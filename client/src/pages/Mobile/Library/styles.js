import styled from "styled-components";
import { Container } from "../../../styles/Container";
import { Chevron } from "../../../styles/Chevron";

export const StyledContainer = styled(Container)``;

export const StyledChevron = styled(Chevron)`
  left: 15px;
  margin-top: 15px;
  &:before {
    transform: rotate(-135deg);
  }
`;

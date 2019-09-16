import styled from "styled-components";
import { Container, Chevron } from "../../globalStyles";

export const StyledContainer = styled(Container)``;

export const StyledChevron = styled(Chevron)`
  left: 15px;
  margin-top: 15px;
  &:before {
    transform: rotate(-135deg);
  }
`;

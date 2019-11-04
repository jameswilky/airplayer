import styled from "styled-components";
import { Container } from "../../../styles/Container";

export const StyledContainer = styled(Container)``;

export const StyledSearchFilterContainer = styled.div`
  font-size: 0.5em;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;
export const StyledButton = styled.div`
  border: 1px solid grey;
  border-radius: 90px;
  padding: 8px;
  color: ${props => (props.active ? props.theme.black : props.theme.white)};
  background-color: ${props =>
    props.active ? props.theme.white : props.theme.black};
`;

import styled from "styled-components";

export const Container = styled.div`
  font-size: 0.7em;
  display: grid;
  grid-template-columns:1fr 1fr 1fr 1fr;
  align-content:center;
  align-self:center;
  grid-gap: ${props => 1 * props.theme.unit + "px"};
  
  /* margin-top: ${props => 2 * props.theme.unit + "px"}; */
`;
export const Button = styled.div`
  cursor: pointer;
  border: 1px solid ${props => props.theme.white};
  border-radius: 90px;
  text-align: center;
  padding: ${props => 1 * props.theme.unit + "px"};
  color: ${props => (props.active ? props.theme.black : props.theme.white)};
  background-color: ${props =>
    props.active ? props.theme.white : props.theme.transparent2};

  &:hover {
    cursor: pointer;
    color: ${props => props.theme.black};
    background-color: ${props =>
      props.active ? props.theme.white : props.theme.transparent4};
  }
`;

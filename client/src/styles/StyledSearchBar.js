import styled from "styled-components";
export default styled.div`
  width: 100%;
  border-bottom: 2px solid whitesmoke;
  padding: 15px;
  position: fixed;
  background-color: ${props => props.theme.black};
  & input {
    margin: 0px;
    background-color: ${props => props.theme.black};
    border: none;
    border-bottom: 2px solid ${props => props.theme.white};
    width: 100%;
    height: 60px;
    color: ${props => props.theme.white};
    font-size: 2rem;
    padding: 5px;
  }
`;

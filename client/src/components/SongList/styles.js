import styled from "styled-components";
import { Chevron } from "../../globalStyles";

export const StyledChevron = styled(Chevron)`
  right: 23px;
  margin-top: -19px;
  &:before {
    transform: rotate(45deg);
  }
`;

export const StyledContainer = styled.div`
  padding: ${props => `${props.top} 10px 50px 10px`};
`;

export const StyledResult = styled.div`
  font-size: 1rem;

  & ul {
    padding-top: 10px;
    & li {
      list-style: none;
      padding-left: 5px;
    }
  }
`;

export const StyledResultItem = styled.div`
  font-size: 0.8rem;
  display: grid;
  grid-template-columns: 48px 1fr 48px;
  padding: 0 0 20px 0;
  align-items: center;
  width: 100%;
  & img {
    height: 48px;
    width: 48px;
  }
  & span {
    padding: 0 3px;
  }
  & div {
    padding: 0 0 0 10px;
  }
  & h3 {
    font-size: 0.8rem;
  }
  & p {
    display: inline;
    color: rgba(255, 255, 255, 0.7);
    font-weight: 100;
  }
  & button {
    height: 48px;
    width: 48px;
    background: none;
    border: none;
    color: whitesmoke;
    font-size: 2rem;
    text-align: center;
    text-justify: center;
  }
`;

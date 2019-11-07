import styled from "styled-components";
import Loader from "react-loader-spinner";

export const Container = styled.div`
  background-color: transparent;
  height: 100%;
  color: ${props => props.theme.black};
  display: grid;
  width: 100%;
  grid-template-rows: 1fr;
`;

export const Body = styled.div`
  background-color: ${props => props.theme.transparent5};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

export const Left = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;

  & > img {
    width: 80px;
  }

  & > div {
    padding-left: 15px;
    font-size: 0.8rem;

    & > h5 {
      color: ${props => props.theme.darkestGray};
    }

    & > p {
      color: ${props => props.theme.gray};
      text-transform: capitalize;
    }
  }
`;

export const Right = styled.div`
  color: ${props => props.theme.primary};
  font-size: 2rem;
  margin-right: 3rem;

  position: relative;
  display: grid;
  justify-items: flex-end;
`;

export const Spinner = styled(Loader)`
  padding-top: 5px;
  text-align: center;
  background-color: ${props => props.theme.white};
`;

export const Slider = styled.div`
  background: ${props => props.theme.lighterGray};
  position: absolute;
  bottom: 80px;
  width: 100%;
  height: 15px;

  & > div[type="progressBar"] {
    position: absolute;
    width: ${props => props.progress + "%"};
    height: 15px;
    background: ${props => props.theme.gradient};
  }

  & > input {
    position: relative;
    width: 100%;
    height: 15px;
    z-index: 99;
    cursor: pointer;
  }
`;

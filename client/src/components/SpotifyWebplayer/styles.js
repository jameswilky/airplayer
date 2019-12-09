import styled from "styled-components";
import Loader from "react-loader-spinner";

export const Container = styled.div`
  background-color: ${props =>
    props.theme.mode === "dark" ? props.theme.transparent : props.theme.white};

  height: 100%;
  color: ${props => props.theme.black};
  display: grid;
  width: 100%;
  grid-template-rows: 1fr;
`;

export const Body = styled.div`
  height: 100%;
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

    & > h3 {
      color: ${props =>
        props.theme.mode === "dark"
          ? props.theme.white
          : props.theme.darkestGray};
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
  background-color: ${props =>
    props.theme.mode === "dark" ? props.theme.transparent : props.theme.white};
`;

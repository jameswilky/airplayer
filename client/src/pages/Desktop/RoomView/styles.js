import styled from "styled-components";
import Loader from "react-loader-spinner";

export const Background = styled.div`
  background: ${props =>
    props.theme.mode === "dark" ? props.theme.black : props.theme.gradient};
`;

export const Spinner = styled(Loader)`
  justify-self: center;
  align-self: center;
  animation: fadeIn 0.5s;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  animation: fadeOut 0.5s;

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;
export const Container = styled.div`
  animation: fadeIn 1s;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  display: grid;
  width: 100%;
  color: ${props => props.theme.white};
  grid-template-columns: minmax(96px, 160px) 1fr;
  grid-template-rows:
    ${props => 6 * props.theme.unit + "px"} calc(100vh - 128px)
    ${props => 10 * props.theme.unit + "px"};
`;

export const Main = styled.main`
  animation: fadeIn 1s;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  max-height: calc(100vh - 128px);
  overflow: auto;
`;

export const Footer = styled.footer`
  grid-column: span 2;
  color: ${props => props.theme.white};
  height: 100%;
`;

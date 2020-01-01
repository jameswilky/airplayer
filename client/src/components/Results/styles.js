import styled from "styled-components";

// TODO add theme to manage colors and padding
export const Container = styled.div`
  position: relative;
`;

export const NoQuery = styled.div`
  display: grid;
  justify-items: center;
  position: relative;

  @media (min-width: 668px) {
    margin-top: 200px;
  }
`;

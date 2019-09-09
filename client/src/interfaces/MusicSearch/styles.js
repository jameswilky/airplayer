import React from "react";
import styled from "styled-components";

export const Container = styled.div`
  height: calc(100vh - 50px);
  position: relative;
`;
export const SearchResults = styled.div``;

export const SearchBar = styled.div`
  width: 100%;
  border: 2px solid whitesmoke;
  padding: 15px;
  & input {
    margin: 0px;
    background-color: black;
    border: none;
    border-bottom: 2px solid white;
    width: 100%;
    height: 60px;
    color: whitesmoke;
    font-size: 2rem;
    padding: 5px;
  }
`;

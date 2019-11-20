import React from "react";
import { Container } from "./styles";
import Result from "../Result/Result";

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}
export default function Results(props) {
  const { query, selected, setSelected, limit = 4, results = [] } = props;

  const noResults = () =>
    results.map(result => isEmpty(result)).filter(bool => bool === false)
      .length < 1;

  return (
    <Container>
      {query === ""
        ? `Please enter a query`
        : noResults()
        ? `No results matching ${query}`
        : results &&
          results.map(
            (result, i) =>
              (selected == "" || selected === result.title) &&
              result.items.length > 1 && (
                <Result
                  title={result.title}
                  items={result.items}
                  selected={selected}
                  setSelected={setSelected}
                  limit={limit}
                  key={i}
                ></Result>
              )
          )}
    </Container>
  );
}

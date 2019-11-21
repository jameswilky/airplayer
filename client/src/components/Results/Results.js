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
  const { query, filter, setFilter, limit = 4, results = [] } = props;

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
              (filter == "" || filter === result.title) &&
              result.items.length > 1 && (
                <Result
                  title={result.title}
                  items={result.items}
                  filter={filter}
                  setFilter={setFilter}
                  limit={limit}
                  key={i}
                  actions={result.actions}
                  path={props.path}
                  link={result.link}
                ></Result>
              )
          )}
    </Container>
  );
}

//TODO remove non tracks from room

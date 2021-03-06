import React from "react";
import useSearch from "./useSearch";
import { act } from "react-dom/test-utils";
import { testHook } from "../../helpers/TestHook";

// used to wait an arbitrary amount of time for all events to fire on a socket
const waitFor = ms => {
  const mult = 1; // modify this value to increase the amount of time all waitFor statements in the test suite
  return new Promise(resolve => {
    setTimeout(resolve, ms * mult);
  });
};

describe("useSearch", () => {
  it("should run without crashing", () => {
    let result;
    testHook({
      hook: () => {
        result = useSearch();
      }
    });
    expect(Object.keys(result).length).toEqual(3);
  });
  it("should return an empty query string, a function, and an object of objects", () => {
    let result;
    testHook({
      hook: () => {
        result = useSearch();
      }
    });
    expect(typeof result.query).toBe("string");
    expect(typeof result.setQuery).toBe("function");
    expect(typeof result.queryResults).toBe("object");
    expect(typeof result.queryResults.tracks).toBe("object");
    expect(typeof result.queryResults.artists).toBe("object");
    expect(typeof result.queryResults.albums).toBe("object");
    expect(typeof result.queryResults.playlists).toBe("object");
  });
  it("should update the query when setQuery is called", async () => {
    let result;
    testHook({
      hook: () => {
        result = useSearch();
      }
    });
    await act(async () => {
      result.setQuery("tobi");
    });
    expect(result.query).toEqual("tobi");
  });
});

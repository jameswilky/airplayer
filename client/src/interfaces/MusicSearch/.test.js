import React from "react";
import { shallow } from "enzyme";
import MusicSearchInterface from "./index";
import SongList from "../../components/SongList";
import SearchBar from "../../components/SearchBar";

const setUp = (props = {}) => {
  const component = shallow(<MusicSearchInterface {...props} />);
  return component;
};

describe("MusicSearchInterface", () => {
  it("should render without errors", () => {
    const component = setUp();
    expect(component.length).toBe(1);
  });
  it("should render a SongList component", () => {
    const component = setUp();
    expect(component.contains(<SongList />)).toBe(true);
  });
  it("should render a SearchBar component", () => {
    const component = setUp();
    expect(component.contains(<SearchBar />)).toBe(true);
  });
});

import React from "react";
import { shallow } from "enzyme";
import MusicSearchInterface from "./index";
import Input from "../../components/Input";
import { SearchBar } from "./styles";

const setUp = (props = {}) => shallow(<MusicSearchInterface {...props} />);

describe("MusicSearchInterface", () => {
  it("should render without errors", () => {
    const component = setUp();
    expect(component.length).toBe(1);
  });

  it("should render a SearchBar component", () => {
    const component = setUp();
    const wrapper = component.find(SearchBar);
    expect(wrapper.length).toBe(1);
  });
  it("should render an Input component within a SearchBar component", () => {
    const component = setUp();
    const wrapper = component.find(SearchBar).find(Input);
    expect(wrapper.length).toBe(1);
  });
});

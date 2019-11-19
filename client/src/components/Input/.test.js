import React from "react";
import { shallow } from "enzyme";
import Input from "./Input";

describe("Input Component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<Input></Input>);
    expect(wrapper.length).toBe(1);
  });
  it("displays the passed in query value", () => {
    const wrapper = shallow(<Input value="test"></Input>);
    expect(wrapper.props().value).toEqual("test");
  });
  it("calls setValue() on change", () => {
    let setValueCalled = false;
    const wrapper = shallow(
      <Input name="test" setValue={() => (setValueCalled = true)}></Input>
    );
    wrapper.simulate("change", { target: "test", value: "123" });
    expect(setValueCalled).toEqual(true);
  });
});

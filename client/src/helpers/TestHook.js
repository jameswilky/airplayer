import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { mount } from "enzyme";

const TestHook = ({ callback }) => {
  callback();
  return null;
};

export const testHook = ({
  hook,
  refreshToken = "",
  accessToken = "",
  isAuthenticated = true
}) => {
  const INITIAL_STATE = {
    auth: {
      refreshToken,
      accessToken,
      isAuthenticated
    }
  };
  const store = createStore((state, action) => state, INITIAL_STATE);
  mount(
    <Provider store={store}>
      <TestHook callback={hook}></TestHook>
    </Provider>
  );
};

export default (state, action) => {
  switch (action.type) {
    case "LOG_IN": {
      return { ...state, auth: "Logged in" };
    }
    case "LOG_OUT": {
      return { ...state, auth: "Logged Out" };
    }
    default:
      return state;
  }
};

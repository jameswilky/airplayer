export default (state, action) => {
  switch (action.type) {
    case "SET_ACCESS_TOKEN":
      return {
        ...state,
        auth: { ...state.auth, accessToken: action.payload },
        auth: { ...state.auth, isAuthenticated: action.payload ? true : false }
      };
    case "SET_REFRESH_TOKEN":
      return {
        ...state,
        auth: { ...state.auth, refreshToken: action.payload }
      };
    default:
      return state;
  }
};

const INITIAL_STATE = {
  isSignedIn: false,
  userId: "",
};

const authReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        isSignedIn: true,
        userId: action.payload,
      };
    case "SIGN_OUT":
      return {
        ...state,
        isSignedIn: false,
        userId: "",
      };
    default:
      return state;
  }
};

export default authReducers;

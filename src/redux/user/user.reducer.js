import { UserActionTypes } from "./user.types";
const INITIAL_STATE = {
  currentUser: null,
  isLoading: true,
  error: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case UserActionTypes.SIGNUP_USER_START:
      return {
        ...state,
        isLoading: true,
      };
    case UserActionTypes.SIGNUP_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        isLoading: false,
        error: false,
      };
    case UserActionTypes.SIGNUP_USER_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;

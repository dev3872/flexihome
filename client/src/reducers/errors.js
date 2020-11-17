import { LOGIN_ERROR, REGISTER_ERROR, RESET_ERROR } from "../actions/types";
const initialState = {
  login: false,
  register: false,
  error: [],
};
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_ERROR:
      return {
        ...state,
        register: false,
        login: true,
        error: payload,
      };
    case REGISTER_ERROR:
      return {
        ...state,
        login: false,
        register: true,
        error: payload,
      };
    case RESET_ERROR:
      return {
        ...state,
        login: false,
        register: false,
        error: [],
      };

    default:
      return state;
  }
}

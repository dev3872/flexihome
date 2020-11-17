import { REGISTER_MODAL, LOGIN_MODAL } from "../actions/types";

const initialState = {
  login_open: false,
  register_open: false,
};
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_MODAL:
      return {
        ...state,
        login_open: false,
        register_open: !state.register_open,
      };
    case LOGIN_MODAL:
      return {
        ...state,
        register_open: false,
        login_open: !state.login_open,
      };
    default:
      return state;
  }
}

import { REGISTER_MODAL, LOGIN_MODAL, RESET_ERROR } from "./types";

// Toggle Register
export const registerModal = () => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_MODAL,
    });
    dispatch({
      type: RESET_ERROR,
    });
  } catch (err) {
    console.log(err);
  }
};

// Toggle Login
export const loginModal = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_MODAL,
    });
  } catch (err) {
    console.log(err);
  }
};

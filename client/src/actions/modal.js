import {
  REGISTER_MODAL,
  LOGIN_MODAL,
  RESET_ERROR,
  POSTED_USER_MODAL,
} from "./types";

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

export const postedUserModal = () => async (dispatch) => {
  try {
    dispatch({
      type: POSTED_USER_MODAL,
    });
  } catch (err) {
    console.log(err);
  }
};

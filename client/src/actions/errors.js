import { RESET_ERROR } from "./types";

// Reset Errors
export const resetError = () => async (dispatch) => {
  dispatch({
    type: RESET_ERROR,
  });
};

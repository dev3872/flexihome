import { WHO_ARE_YOU, LISTING_PROPERTY_FOR } from "./types";

// set user type
export const setUser = (user) => async (dispatch) => {
  dispatch({
    type: WHO_ARE_YOU,
    payload: user,
  });
};

//set listing property details

export const setListingProperty = (data) => async (dispatch) => {
  dispatch({
    type: LISTING_PROPERTY_FOR,
    payload: data,
  });
};

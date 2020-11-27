import {
  WHO_ARE_YOU,
  LISTING_PROPERTY_FOR,
  PROPERTY_TYPE,
  LOCATION_DETAILS,
  PROPERTY_DETAILS,
  IMAGE_DETAILS,
  FURNISHING,
} from "./types";

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

//Set property type and property sub type

export const setPropertyType = (data) => async (dispatch) => {
  dispatch({
    type: PROPERTY_TYPE,
    payload: data,
  });
};

//set location details

export const setLocationDetails = (data) => async (dispatch) => {
  dispatch({
    type: LOCATION_DETAILS,
    payload: data,
  });
};

//set property details

export const setPropertyDetails = (data) => async (dispatch) => {
  dispatch({
    type: PROPERTY_DETAILS,
    payload: data,
  });
};

//Set Image Details

export const setImageDetails = (data) => async (dispatch) => {
  dispatch({
    type: IMAGE_DETAILS,
    payload: data,
  });
};

//Furnishing

export const setFurnishingList = (data) => async (dispatch) => {
  dispatch({
    type: FURNISHING,
    payload: data,
  });
};

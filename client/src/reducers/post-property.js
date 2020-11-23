import {
  WHO_ARE_YOU,
  LISTING_PROPERTY_FOR,
  PROPERTY_TYPE,
  LOCATION_DETAILS,
} from "../actions/types";
const initialState = {
  user: "",
  listingPropertyFor: {},
  propertyType: {
    propertyType: "",
    propertySubType: "",
  },
  locationDetails: {
    defState: "",
    defCity: "",
    projectName: "",
    address: "",
    locality: "",
    pincode: "",
  },
};
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case WHO_ARE_YOU:
      return {
        ...state,
        user: payload,
      };
    case LISTING_PROPERTY_FOR:
      return {
        ...state,
        listingPropertyFor: payload,
      };

    case PROPERTY_TYPE:
      return {
        ...state,
        propertyType: payload,
      };
    case LOCATION_DETAILS:
      return {
        ...state,
        locationDetails: payload,
      };

    default:
      return state;
  }
}

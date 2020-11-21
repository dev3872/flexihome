import {
  WHO_ARE_YOU,
  LISTING_PROPERTY_FOR,
  PROPERTY_TYPE,
} from "../actions/types";
const initialState = {
  user: "",
  listingPropertyFor: {},
  propertyType: {
    propertyType: "",
    propertySubType: "",
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

    default:
      return state;
  }
}

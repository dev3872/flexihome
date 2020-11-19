import { WHO_ARE_YOU, LISTING_PROPERTY_FOR } from "../actions/types";
const initialState = {
  user: "",
  listingPropertyFor: {},
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

    default:
      return state;
  }
}

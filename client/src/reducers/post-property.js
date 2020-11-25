import {
  WHO_ARE_YOU,
  LISTING_PROPERTY_FOR,
  PROPERTY_TYPE,
  LOCATION_DETAILS,
  PROPERTY_DETAILS,
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
  propertyDetails: {
    superBuiltUpArea: 0,
    builtUpArea: 0,
    carpetArea: 0,
    unit: "",
    roomCount: {
      bedrooms: 0,
      bathrooms: 0,
      balconies: 0,
      poojaRoom: 0,
      studyRoom: 0,
      serventRoom: 0,
    },
    reservedParking: "",
    parkingCount: 0,
    constructionCount: 0,
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
    case PROPERTY_DETAILS:
      return {
        ...state,
        propertyDetails: payload,
      };

    default:
      return state;
  }
}

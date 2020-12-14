import { SEARCH_RESULTS } from "../actions/types";
const initialState = {
  results: [],
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SEARCH_RESULTS:
      return {
        ...state,
        results: payload,
      };
    default:
      return state;
  }
}

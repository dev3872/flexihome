import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import modal from "./modal";
import errors from "./errors";
import postProperty from "./post-property";
import searchResults from "./search-results";

export default combineReducers({
  alert,
  auth,
  modal,
  errors,
  postProperty,
  searchResults,
});

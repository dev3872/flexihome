import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import modal from "./modal";
import errors from "./errors";

export default combineReducers({
  alert,
  auth,
  modal,
  errors,
});

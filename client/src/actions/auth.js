import api from "../utils/api";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_MODAL,
  LOGIN_MODAL,
  LOGIN_ERROR,
  REGISTER_ERROR,
  RESET_ERROR,
} from "./types";

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get("/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/users", formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch({
      type: REGISTER_MODAL,
    });
    dispatch({
      type: RESET_ERROR,
    });

    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: REGISTER_ERROR,
      payload: err.response.data.errors,
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const body = { email, password };

  try {
    const res = await api.post("/auth", body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch({
      type: LOGIN_MODAL,
    });
    dispatch({
      type: RESET_ERROR,
    });

    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: LOGIN_ERROR,
      payload: err.response.data.errors,
    });

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout
export const logout = () => ({ type: LOGOUT });

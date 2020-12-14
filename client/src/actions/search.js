import api from "../utils/api";
import { SEARCH_RESULTS } from "./types";

export const submitSearch = (data) => async (dispatch) => {
  const res = await api.post("/searchProperty/search", data);
  dispatch({ type: SEARCH_RESULTS, payload: res.data });
};
export const contactUser = (data) => async (dispatch) => {
  const tobesend = { id: data };
  const res = await api.post("/searchProperty/contactUser", tobesend);
  console.log(res);
};

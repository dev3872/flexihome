import api from "../utils/api";

export const submitSearch = (data) => async (dispatch) => {
  const res = await api.post("/searchProperty/search", data);
  console.log(data);
  console.log(res);
};

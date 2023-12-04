import axios from "../api/axios";

export const exitFromEvent = async (jwt, evt_url) => {
  let response;

  try {
    response = await axios.post("/event/exit", {
      token: jwt,
      evt_url: evt_url,
    });
    if (response.data) {
      console.log(response.data);
      return response.data;
    }
  } catch (e) {
    console.log(response);
    return e;
  }
};

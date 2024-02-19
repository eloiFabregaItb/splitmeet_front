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


export const fireFromEvent = async (jwt, evt_url, usr_id) => {
  let response;

  try {
    response = await axios.post("/event/fire", {
      token: jwt,
      evt_url,
      usr_id
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

import axios from "../api/axios";

export const getEvents = async (jwt) => {
  let response;

  try {
    response = await axios.post("/user/events", {
      token: jwt,
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

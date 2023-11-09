import axios from "../api/axios";

export const addEvent = async (event_name, eventImage, eventMembers, jwt) => {
  let response;

  try {
    response = await axios.post("/event/create", {
      evt_name: event_name,
      token: jwt,
    });
    if (response.data) {
      console.log(response.data);
      return response.data;
    }
  } catch (e) {
    console.log("ERRROORR");
    console.log(e);
    return e;
  }
};

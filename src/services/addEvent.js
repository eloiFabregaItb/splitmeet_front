import axios from "../api/axios";

export const addEvent = async (eventName, eventImage, eventMembers, token) => {
  let response;

  try {
    response = await axios.post("/event/create", {
      evt_name: eventName,
      token: token
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

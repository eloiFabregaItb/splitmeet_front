import axios from "../api/axios";

export const sendEventInvitations = async (jwt, evt_url, emails) => {
  let response;

  try {
    response = await axios.post("/event/invite", {
      token: jwt,
      evt_url: evt_url,
      emails: emails,
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

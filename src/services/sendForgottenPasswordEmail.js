import axios from "../api/axios";

export const sendForgottenPasswordEmail = async (usr_mail) => {
  let response;

  try {
    response = await axios.post("/auth/forgotten", {
      email: usr_mail
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

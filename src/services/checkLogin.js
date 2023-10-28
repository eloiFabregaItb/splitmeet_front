import axios from "../api/axios";

export const checkLogin = async (email, password) => {
  let response;

  try {
    response = await axios.post("/auth/login", {
      usr_mail: email,
      usr_pass: password,
    });
    if (response.data) {
      console.log(response.data);
      return response.data;
    }
  } catch (e) {
    console.log(e);
    return e;
  }
};

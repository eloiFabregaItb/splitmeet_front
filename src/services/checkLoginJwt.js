import axios from "../api/axios";

export const checkLoginJwt = async (jwt) => {
  let response;

  try {
    response = await axios.post("/auth/loginjwt", {
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

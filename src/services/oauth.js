import axios from "../api/axios";

export const oauth = async () => {
  let response;

  try {
    response = await axios.get("/auth/oauth");
    if (response.data) {
      console.log(response.data);
      return response.data;
    }
  } catch (e) {
    console.log(response);
    return e;
  }
};

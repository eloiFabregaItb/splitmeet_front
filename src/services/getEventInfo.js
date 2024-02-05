import axios from "../api/axios";
import { api_url } from "../utils/constants";
import { getHashedLandscape } from "./getHashedLandscape";

export const getEventInfo = async (jwt, evt_url) => {
  let response;

  try {
    response = await axios.post("/event/info", {
      token: jwt,
      evt_url: evt_url,
    });
    if (response.data) {
      console.log(response.data);

      if(!response.data.event.imgUrl){
        response.data.event.imgUrl = await getHashedLandscape(response.data.event.url)
      }else{
        response.data.event.imgUrl = `${api_url}/public/evtPic/${response.data.event.imgUrl}`
      }
      return response.data;
    }
  } catch (e) {
    console.log(response);
    return e;
  }
};

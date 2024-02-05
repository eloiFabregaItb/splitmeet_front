import axios from "../api/axios";
import { api_url } from "../utils/constants";
import { getHashedLandscapeMultiple } from "./getHashedLandscape";

export const getEvents = async (jwt) => {
  let response;

  const imageHasher = await getHashedLandscapeMultiple("thumb")

  try {
    response = await axios.post("/user/events", {
      token: jwt,
    });
    if (response.data) {
      
      // return response.data;
      for (const event of response.data.events) {
        if(!event.imgUrl){
          event.imgUrl = await imageHasher(event.url)
        }else{
          event.imgUrl = `${api_url}/public/evtPic/${event.imgUrl}`
        }
      }
      return response.data
    }
  } catch (e) {
    console.error(e)
    console.log(response);
    return e;
  }
};

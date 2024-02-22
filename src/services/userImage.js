import { api_url } from "../utils/constants";



export async function getUserProfileValidUrl(filename){
  
  const imgUrl = `${api_url}/public/usrProfilePic/${filename}`
  const exist = await doesEndpointExist(imgUrl) 
  
  return exist ? `${api_url}/public/usrProfilePic/${filename}` : `${api_url}/public/usrProfilePic/default.png` 
}






async function doesEndpointExist(url) {
  try {
    const response = await fetch(url, { method: 'GET' });
    return response.status !== 404;
  } catch (error) {
    console.error('Error checking endpoint existence:', error);
    return false;
  }
}
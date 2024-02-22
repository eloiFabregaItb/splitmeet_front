import { hegHashColor } from "../../services/getHashedLandscape"
import { api_url } from "../../utils/constants"
import "./UserImage.css"

export function UserImage({userInfo,className="",test}){

  if(test){

    console.log(userInfo)
  }
  const useRobohash = true

  const name = userInfo.name || userInfo.usr_name || userInfo.nombre
  const image = userInfo.img || userInfo.usr_img || userInfo.fotoPerfil

  if(useRobohash){
    const bgColor = hegHashColor(name)
    return <>
      <img
        style={{backgroundColor:bgColor}}
        className={"userImage " + className }
        src={`https://robohash.org/${name}`}
        alt={`User icon ${name}`}
      />
  </>
  }




  return <>
    <img
      className={"userImage " + className }
      src={`${api_url}/public/usrProfilePic/${image}`}
      alt={`User icon ${name}`}
    />
  </>
}
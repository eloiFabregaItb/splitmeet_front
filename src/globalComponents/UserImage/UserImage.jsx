import { useState } from "react"
import { hegHashColor } from "../../services/getHashedLandscape"
import { api_url } from "../../utils/constants"
import "./UserImage.css"
import { getUserProfileValidUrl } from "../../services/userImage"

export function UserImage({userInfo,className=""}){

  const useRobohash = false

  const [imgUrl, setImgUrl] = useState(useRobohash ? `https://robohash.org/${name}`  : "")

  const name = userInfo.name || userInfo.usr_name || userInfo.nombre
  const image = userInfo.img || userInfo.usr_img || userInfo.fotoPerfil

  const bgColor = hegHashColor(name)

  let style = {}


  if(!useRobohash){
    getImgUrl()
  }else{
    style = {backgroundColor:bgColor}
  }

  async function getImgUrl(){
    const url = await getUserProfileValidUrl(image)
    setImgUrl(url)
  }


  return <>
    <img
      style={style}
      className={"userImage " + className }
      src={imgUrl}
      alt={`User icon ${name}`}
    />
  </>
}
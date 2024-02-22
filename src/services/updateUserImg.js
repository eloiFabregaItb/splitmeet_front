import axios from '../api/axios'

export const updateUserImg = async (userImage, jwt) => {
  let response

  const form = new FormData()
  // form.append('token', jwt)
  form.append('img', userImage)

  console.log(jwt)
  try {
    response = await axios.post('/user/profileImg', form,{
      headers:{
        "x-access-token":jwt
      }
    })

    if (response.data) {
      console.log(response.data)
      return response.data
    }
  } catch (e) {
    console.log(e)
    return e
  }
}

import axios from '../api/axios'

export const changePassword = async (jwt, password) => {
  let response

  try {
    response = await axios.post('/user/updateUser', {
      token: jwt,
      password: password,
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

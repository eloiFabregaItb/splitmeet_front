import axios from '../api/axios'

export const updateUserInfo = async (jwt, usr_name, password, old_password) => {
  let response

  try {
    response = await axios.post('/user/updateUser', {
      token: jwt,
      name: usr_name,
      oldPassword: old_password,
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

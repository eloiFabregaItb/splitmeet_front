import axios from '../api/axios'

export const validateMail = async (jwt) => {
  let response

  try {
    response = await axios.post('/auth/validateMail', {
      token: jwt,
    })
    if (response.data) {
      console.log(response.data)
      return response.data
    }
  } catch (e) {
    console.log(response)
    return e
  }
}

import axios from '../api/axios'

export const sendVerificationEmail = async (jwt) => {
  let response

  try {
    response = await axios.post('/auth/resendValidate', {
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

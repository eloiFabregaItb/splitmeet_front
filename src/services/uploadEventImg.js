import axios from '../api/axios'

export const uploadEventImg = async (event_url, eventImage, jwt) => {
  let response

  const form = new FormData()
  form.append('evt_url', event_url)
  form.append('token', jwt)
  form.append('img', eventImage)

  console.log(jwt)
  try {
    response = await axios.post('/event/img', form)

    if (response.data) {
      console.log(response.data)
      return response.data
    }
  } catch (e) {
    console.log(e)
    return e
  }
}

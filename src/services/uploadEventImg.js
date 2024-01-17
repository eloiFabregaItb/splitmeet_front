import axios from '../api/axios'

export const uploadEventImg = async (event_url, eventImage, jwt) => {
  let response

  const form = new FormData()
  form.append('evt_url', event_url)
  form.append('img', eventImage)
  form.append('token', jwt)

  console.log(jwt)
  try {
    response = await axios.post('/event/img', form, {
      headers: {
        accept: 'application/json',
        'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
      },
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

import axios from '../api/axios'

export const addExpense = async (jwt, evt_url,concept,lenderId,description,date,coords,transactions) => {

  try {
    const response = await axios.post('/event/expenses/new', {
      token: jwt,
      evt_url: evt_url,
      concept,
      lenderId,
      description,
      date,
      coords,
      transactions
    })
    if (response.data) {
      return response.data
    }
  } catch (e) {
    return e.response.data
  }
}

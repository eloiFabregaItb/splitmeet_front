import './NewExpense.css'
import Header from '../../globalComponents/Header/Header'
import user from '../../assets/icons/user.svg'

import { Link, useParams } from 'react-router-dom'

import { useRef, useState, useEffect } from 'react'

import Button from '../../globalComponents/Button'
import UserInvitation from '../Invitation/UserInvitation/UserInvitation'
import { useLoginDataContext } from '../../contexts/LoginDataContext'
import { addEvent } from '../../services/addEvent'
import { uploadEventImg } from '../../services/uploadEventImg'
import { sendEventInvitations } from '../../services/sendEventInvitations'
import { useNavigate } from 'react-router-dom'
import { getEventInfo } from '../../services/getEventInfo'
import { ModalSelect } from '../../globalComponents/ModalSelect/ModalSelect'
import { ModalDistributeExpenses } from './ModalDistributeExpenses'
import { addExpense } from '../../services/addExpense'

const PAGES = {
  AMOUNT: 'amount',
  DISTRIBURION: 'distribution',
}

export function NewExpense() {
  const params = useParams()

  const navigate = useNavigate()

  const { jwt, email } = useLoginDataContext()
  const [expenseName, setExpenseName] = useState('')
  const [errName, setErrName] = useState(false)
  const [errAmount, setErrAmount] = useState(false)

  const [inpAmount, setInpAmount] = useState('')
  const [users, setUsers] = useState([])

  const [lender, setLender] = useState(null)
  const [borrowers, setBorrowers] = useState([])

  const [eventInfo, setEventInfo] = useState({})

  const [page, setPage] = useState(PAGES.AMOUNT)

  useEffect(() => {
    fetchEventInfo()
  }, [])

  async function fetchEventInfo() {
    const eventData = await getEventInfo(jwt, params.event_url)
    if (eventData?.success) {
      console.log('EVENT DATA', eventData)
      const apiUsers = eventData.users
      const apiLender = apiUsers.find((x) => x.mail === email)
      setUsers(apiUsers)
      setLender(apiLender)
      setEventInfo(eventData.event)
    } else {
      setUsers(eventData.users)
    }
  }

  function handleChangeBorrowers(borrowers) {
    setBorrowers(borrowers)
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const now = new Date().toISOString().slice(0, 10)
    const transactions = makeTransactions(borrowers)

    const response = await addExpense(
      jwt,
      eventInfo.url,
      expenseName,
      lender.id,
      '' /*description*/,
      now,
      '' /*coords*/,
      transactions
    )

    console.log('EXPENSE RESPONSE', response)
    navigate(`/event/${params.event_url}`)
  }

  function makeTransactions(borrowers) {
    return borrowers
      .filter(
        (x) => x.hasOwnProperty('amount') && !isNaN(x.amount) && x.amount !== 0
      )
      .map((x) => ({
        borrowerId: x.id,
        amount: x.amount,
      }))
  }

  function handleNextPage(e) {
    e.preventDefault()
    if (Number(inpAmount) <= 0) {
      setErrAmount('Fill the amount field')
      return
    }

    if (expenseName === '') {
      setExpenseName('New expense')
    }

    setPage(PAGES.DISTRIBURION)
  }

  return (
    <>
      <Header back={`/event/${params.event_url}`}></Header>

      <div className='container'>
        <main className='box'>
          {page === PAGES.AMOUNT && (
            <>
              <h1 className='newevent__title'>New expense</h1>
              <form noValidate onSubmit={handleNextPage} className='event_form'>
                <div className='form-container'>
                  <div className='add_name'>
                    <label className='newevent__text' htmlFor='name'>
                      Expense Name
                    </label>
                    {errName && <p className='error'>{errName}</p>}
                    <div className='newevent__form_inputContainer'>
                      <input
                        className='newevent__form_input'
                        type='text'
                        placeholder='Road trip...'
                        name='event_name'
                        id='event_name'
                        value={expenseName}
                        onChange={(e) => setExpenseName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className='add_amount'>
                    <label className='newevent__text'>Amount</label>
                    <div className='newevent__form_inputContainer'>
                      <input
                        className='newevent__form_input'
                        type='number'
                        placeholder='0,00€'
                        value={inpAmount}
                        onChange={(e) => setInpAmount(e.target.value)}
                      />
                    </div>
                  </div>

                  {errAmount && <p className='error w-100'>{errAmount}</p>}
                  <Button
                    className='newevent_form_btn newevent_form_btn--login'
                    text='NEXT'
                  />
                </div>
              </form>
            </>
          )}

          {page === PAGES.DISTRIBURION && (
            <form onSubmit={(e) => e.preventDefault()} className='ExpenseDistribution__form'>
              <h1 className='newevent__title'>{expenseName}</h1>
              <h2>{inpAmount}€</h2>

              <div className='who_paid'>
                Paid by
                <ModalSelect
                  items={users}
                  getItemText={(u) => (u.mail === email ? 'You' : u.name)}
                  onSelect={(u) => setLender(u)}
                  itemSelected={lender}
                />
              </div>

              <div className='who_paid'>

                and split
                {users?.length > 0 && (
                  <ModalDistributeExpenses
                    users={users}
                    onChange={handleChangeBorrowers}
                    amount={Number(inpAmount) || 0}
                  />
                )}
              </div>

              <Button
                className='newevent_form_btn newevent_form_btn--login'
                text='NEXT'
                onClick={onSubmit}
              />
            </form>
          )}
        </main>
      </div>
    </>
  )
}

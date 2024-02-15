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

const PAGES={
  AMOUNT:"amount",
  DISTRIBURION:"distribution"
}

function NewEvent() {
  const initialData = {
    name: 'Oriol',
  }
  const params = useParams()

  const inputFileRef = useRef(null)
  const [userData] = useState(initialData)
  const { jwt, email } = useLoginDataContext()
  const [eventName, setEventName] = useState('')
  const [event_image, setImage] = useState(null)
  const [event_image64, setImage64] = useState(null)
  const [userMail, setUserMail] = useState('')
  const [inputDisabled, setInputDisabled] = useState(true)
  const [userInvitations, setUserInvitations] = useState([])
  const { loginContext } = useLoginDataContext()
  const [showDataError, setShowDataError] = useState(false)

  const [inpAmount,setInpAmount] = useState("")
  const [users,setUsers] = useState([])

  const navigate = useNavigate()

  const plusButton = useRef(null)

  const [lender,setLender] = useState(null)
  const [lenders,setLenders] = useState([])


  const [page, setPage] = useState(PAGES.AMOUNT)


  useEffect(()=>{
    fetchEventInfo()
  },[])

  
  //Cuando cambia el email, se comprueba si el email es válido. Si no lo es, se desactiva el botón +
  useEffect(() => {
    setInputDisabled(!validUserMail(userMail))
  }, [userMail])


    
  async function fetchEventInfo(){
    const eventData = await getEventInfo(jwt,params.event_url)
    if(eventData?.success){
      const apiUsers = eventData.users 
      const apiLender = apiUsers.find(x=>x.mail === email )
      console.log(apiUsers,apiLender)
      setUsers(apiUsers)
      setLender(apiLender)
    }else{
      setUsers(eventData.users)
    }
  }


  const validUserMail = (email) => {
    if (userInvitations.includes(email)) return false

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return false
    return true
  }


  function handleChangeBorrowers(borrowers){
    setBorrowers(borrowers)
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    // const resAdd = await addEvent(event_name, event_image, userInvitations, jwt)
    // if (resAdd.success) {
    //   setShowDataError(false)
    //   const resImg = await uploadEventImg(resAdd.evt_url, event_image, jwt)

    //   if (resImg.success) {
    //     const resInvite = await sendEventInvitations(
    //       jwt,
    //       resAdd.evt_url,
    //       userInvitations
    //     )
    //   }
    //   //loginContext(resAdd);
    //   return navigate(`/event/${resAdd.evt_url}`)
    // }
    // setShowDataError(true)
    //localStorage.clear()
  }


  function handleNextPage(e){
    e.preventDefault()
    if(Number(inpAmount) <= 0){
      setShowDataError("campo valor necesario")
      return
    }

    if(eventName === ""){
      setEventName("New expense")
    }

    setPage(PAGES.DISTRIBURION)
  }


  return (
      <>
      <Header back={`/event/${params.event_url}`}></Header>
        
      <div className='container'>
        <main className='box'>

          {showDataError && <p>{showDataError}</p>}

          <h1 className='newevent__title'>New expense</h1>
          {
            page===PAGES.AMOUNT &&
            <>
              <form noValidate onSubmit={handleNextPage} className='event_form'>
                <div className='form-container'>

                  <div className='add_name'>
                    <label className='newevent__text' htmlFor='name'>
                      Expense Name
                    </label>
                    <div className='newevent__form_inputContainer'>
                      <input
                        className='newevent__form_input'
                        type='text'
                        placeholder='Road trip...'
                        name='event_name'
                        id='event_name'
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                      />
                    </div>
                  </div>

      
                  <div className='add_amount'>
                    <label className='newevent__text'>
                      Amount
                    </label>
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



                  <Button
                    className='newevent_form_btn newevent_form_btn--login'
                    text='NEXT'
                  />
                </div>
              </form>
            

            
            </>
          }

          {
            page===PAGES.DISTRIBURION && 
            <form onSubmit={onSubmit}>

              <h2>{eventName}</h2>
              <h2>{inpAmount}€</h2>

              <div className='who_paid'>
                    Payed by
                    <ModalSelect 
                      
                      items={users}
                      getItemText={u=>u.mail === email ? "You" : u.name}

                      onSelect={u=>setLender(u)}
                      itemSelected={lender}
                    />
                    and divided 
                    {
                      users.length>0&&
                      <McodeodalDistributeExpenses 
                        users={users}
                        onChange={handleChangeBorrowers}
                        amount={Number(inpAmount) || 0}
                      />
                    }
                  </div>
                

                  <Button
                    className='newevent_form_btn newevent_form_btn--login'
                    text='NEXT'
                  />

            </form>
          }



        </main>
      </div>
    </>
  )
}
export default NewEvent

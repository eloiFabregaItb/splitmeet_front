import './Invitation.css'
import Header from '../../globalComponents/Header/Header'
import user from '../../assets/icons/user.svg'

import { useRef, useState } from 'react'

import Button from '../../globalComponents/Button'
import { useLoginDataContext } from '../../contexts/LoginDataContext'
import { addEvent } from '../../services/addEvent'
import { uploadEventImg } from '../../services/uploadEventImg'
import { useNavigate } from 'react-router-dom'

function Invitation() {
  const {
    nombre,
    saldo,
    fotoPerfil,
    isLoggedIn,
    jwt,
    logoutContext,
    setEventInfo,
    eventInfo,
  } = useLoginDataContext()
  const [userMail, setUserMail] = useState('')
  const [userInvitations, setUserInvitations] = useState([])
  const [showDataError, setShowDataError] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()

    const resAdd = await addEvent(event_name, event_image, event_members, jwt)
    if (resAdd.success) {
      setShowDataError(false)
      const resImg = await uploadEventImg(resAdd.evt_url, event_image, jwt)
      console.log(resImg)
      //loginContext(resAdd);
      //return navigate("/home");
    }
    setShowDataError(true)
    localStorage.clear()
  }
  return (
    <>
      <Header nameEvent={eventInfo.event.name}></Header>
      <div className='container'>
        <main className='box'>
          <p>{showDataError}</p>
          <h1 className='newevent__title'>Invite Users</h1>

          <form noValidate onSubmit={onSubmit} className='event_form'>
            <div className='form-container'>
              <div className='add_name'>
                <label className='newevent__text' htmlFor='userMail'>
                  User email
                </label>
                <div className='newevent__form_inputContainer newevent__form_inputContainer--invitation'>
                  <input
                    className='newevent__form_input newevent__form_input--invitation'
                    type='text'
                    placeholder='user-example@gmail.com'
                    name='userMail'
                    id='userMail'
                    value={userMail}
                    onChange={(e) => setUserMail(e.target.value)}
                  />
                  <button className='invitation__plusButton'>+</button>
                </div>
              </div>

              <div className='newevent__members'>
                <label className='newevent__text' htmlFor='event_members'>
                  Invitations
                </label>
              </div>

              <Button
                className='newevent_form_btn newevent_form_btn--login'
                text='INVITE'
              />
            </div>
          </form>
        </main>
      </div>
    </>
  )
}
export default Invitation

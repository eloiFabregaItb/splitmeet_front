import './Invitation.css'
import Header from '../../globalComponents/Header/Header'
import user from '../../assets/icons/user.svg'

import { useEffect, useRef, useState } from 'react'

import Button from '../../globalComponents/Button'
import { useLoginDataContext } from '../../contexts/LoginDataContext'
import { sendEventInvitations } from '../../services/sendEventInvitations'
import { useNavigate } from 'react-router-dom'
import UserInvitation from './UserInvitation/UserInvitation'

/*ERROR: Al hacer f5 no lee el context y se queda en blanco (no encuentra "eventInfo")
Debería devolverte al Home, tal y como lo hace el componente EventDetail.jsx
*/
function Invitation() {
  const { jwt, eventInfo } = useLoginDataContext()
  const [userMail, setUserMail] = useState('')
  const [inputDisabled, setInputDisabled] = useState(true)
  const [userInvitations, setUserInvitations] = useState([])
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const navigate = useNavigate()

  const plusButton = useRef(null)

  const addInvitation = () => {
    setUserInvitations([...userInvitations, userMail])
    setUserMail('')
  }

  const removeInvitation = (email) => {
    const newUserInvitations = userInvitations.filter(
      (invitation) => invitation !== email
    )
    setUserInvitations(newUserInvitations)
  }

  const validUserMail = (email) => {
    if (userInvitations.includes(email)) return false

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return false
    return true
  }

  //Cuando cambia el email, se comprueba si el email es válido. Si no lo es, se desactiva el botón +
  useEffect(() => {
    setInputDisabled(!validUserMail(userMail))
  }, [userMail])

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      plusButton.current.click()
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const resInvite = await sendEventInvitations(
      jwt,
      eventInfo.event.url,
      userInvitations
    )
    if (resInvite.success) {
      setShowErrorMessage(false)
      setShowSuccessMessage(true)
      setTimeout(() => navigate(`/event/${eventInfo.event.url}`), 2000)
      return
    }
    setShowSuccessMessage(false)
    setShowErrorMessage(true)
    return
  }
  return (
    <>
      <Header nameEvent={eventInfo.event.name}></Header>
      <div className='container'>
        <main className='box'>
          <h1 className='newevent__title'>Invite Users</h1>

          <form
            noValidate
            onSubmit={onSubmit}
            className='event_form event_form--invitation'
          >
            <div className='form-container form-container--invitation'>
              <div className='form-container__container-invitation'>
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
                      onKeyDown={handleEnter}
                    />
                    <button
                      className={`invitation__button invitation__plusButton ${
                        inputDisabled && 'invitation__button--disabled'
                      }`}
                      onClick={addInvitation}
                      disabled={inputDisabled}
                      ref={plusButton}
                      type='button'
                    >
                      +
                    </button>
                  </div>
                  {userInvitations.includes(userMail) ? (
                    <span
                      className='error'
                      style={{ width: '100%', marginTop: '10px' }}
                    >
                      Email already in the list
                    </span>
                  ) : (
                    inputDisabled && (
                      <span
                        className='error'
                        style={{ width: '100%', marginTop: '10px' }}
                      >
                        Incorrect email format
                      </span>
                    )
                  )}
                </div>

                <div className='newevent__members'>
                  <label className='newevent__text' htmlFor='event_members'>
                    Invitations
                  </label>
                  <ul className='userInvitations'>
                    {userInvitations.map((mail, index) => (
                      <UserInvitation
                        key={index}
                        mail={mail}
                        removeInvitation={removeInvitation}
                      />
                    ))}
                  </ul>
                </div>
              </div>

              <Button
                className='newevent_form_btn newevent_form_btn--login'
                text='INVITE'
              />
            </div>
            {showSuccessMessage ? (
              <span className='success'>Invitations sent successfully</span>
            ) : (
              showErrorMessage && (
                <span className='error' style={{ width: '100%' }}>
                  An error has ocurred
                </span>
              )
            )}
          </form>
        </main>
      </div>
    </>
  )
}
export default Invitation

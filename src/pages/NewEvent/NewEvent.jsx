import './NewEvent.css'
import Header from '../../globalComponents/Header/Header'
import user from '../../assets/icons/user.svg'

import { useRef, useState, useEffect } from 'react'

import Button from '../../globalComponents/Button'
import UserInvitation from '../Invitation/UserInvitation/UserInvitation'
import { useLoginDataContext } from '../../contexts/LoginDataContext'
import { addEvent } from '../../services/addEvent'
import { uploadEventImg } from '../../services/uploadEventImg'
import { sendEventInvitations } from '../../services/sendEventInvitations'
import { useNavigate } from 'react-router-dom'

function NewEvent() {
  const initialData = {
    name: 'Oriol',
  }
  const inputFileRef = useRef(null)
  const [userData] = useState(initialData)
  const { jwt } = useLoginDataContext()
  const [event_name, setName] = useState('')
  const [event_image, setImage] = useState(null)
  const [event_image64, setImage64] = useState(null)
  const [userMail, setUserMail] = useState('')
  const [inputDisabled, setInputDisabled] = useState(true)
  const [userInvitations, setUserInvitations] = useState([])
  const { loginContext } = useLoginDataContext()
  const [showDataError, setShowDataError] = useState(false)
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

  function handleInputFile() {
    inputFileRef.current.click()
  }

  const handleInputImg = (event) => {
    const img = event.target.files[0]
    if (!img) return
    setImage(img)
    const reader = new FileReader()
    reader.onload = (e) => {
      const base64 = e.target.result
      setImage64(base64)
    }
    reader.readAsDataURL(img)
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const resAdd = await addEvent(event_name, event_image, userInvitations, jwt)
    if (resAdd.success) {
      setShowDataError(false)
      const resImg = await uploadEventImg(resAdd.evt_url, event_image, jwt)
      console.log(resImg)
      const resInvite = await sendEventInvitations(
        jwt,
        resAdd.event.url,
        userInvitations
      )
      console.log(resInvite)
      //loginContext(resAdd);
      //return navigate("/home");
    }
    setShowDataError(true)
    localStorage.clear()
  }
  return (
    <>
      <Header></Header>
      <div className='container'>
        <main className='box'>
          <p>{showDataError}</p>
          <h1 className='newevent__title'>New event</h1>

          <form noValidate onSubmit={onSubmit} className='event_form'>
            <div className='form-container'>
              <div className='add_name'>
                <label className='newevent__text' htmlFor='name'>
                  Event Name
                </label>
                <div className='newevent__form_inputContainer'>
                  <input
                    className='newevent__form_input'
                    type='text'
                    placeholder='event Name'
                    name='event_name'
                    id='event_name'
                    value={event_name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className='add_image'>
                <label className='newevent__text' htmlFor='event_image'>
                  Event Image
                </label>

                <input
                  type='file'
                  ref={inputFileRef}
                  className='newevent__inputFile'
                  name='event_image'
                  id='event_image'
                  onChange={handleInputImg}
                />
                <button
                  type='button'
                  className='newevent__buttonFile'
                  onClick={handleInputFile}
                >
                  Upload Image
                </button>
              </div>
              {event_image64 && <img src={event_image64} alt='' />}
              {/* <div className="newevent__members">
                <label className="newevent__text" htmlFor="event_members">
                  Event members
                </label>

                <textarea
                  className="newevent__form_textarea"
                  name="event_members"
                  cols="33"
                  rows="10"
                  value={event_members}
                  onChange={(e) => setMembers(e.target.value)}
                ></textarea>
              </div> */}
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

                <div className='newevent__members newevent__members--newEvent'>
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
                text='SUBMIT'
              />
            </div>
          </form>
        </main>
      </div>
    </>
  )
}
export default NewEvent

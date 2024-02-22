import '../NewEvent/NewEvent.css'
import '../Login/Login.css'
import '../ForgotPassword/ForgotPassword.css'
import Header from '../../globalComponents/Header/Header'
import candadoCerrado from '../../assets/icons/candadoCerrado.svg'
import eyeClosed from '../../assets/icons/eyeClosed.svg'
import eyeOpened from '../../assets/icons/eyeOpened.svg'
import { SHA256 } from 'crypto-js'

import { useRef, useState, useEffect } from 'react'

import Button from '../../globalComponents/Button'
import { useLoginDataContext } from '../../contexts/LoginDataContext'
import { updateUserImg } from '../../services/updateUserImg'
import { updateUserInfo } from '../../services/updateUserInfo'
import { useNavigate } from 'react-router-dom'
import { TextModal } from '../../globalComponents/TextModal/TextModal'

function Settings() {
  const inputFileRef = useRef(null);
  const { jwt, nombre, fotoPerfilUrl, setUserFromObject } = useLoginDataContext();
  const [username, setUsername] = useState("");
  const [userImage, setUserImage] = useState(null)
  const [userImage64, setUserImage64] = useState(null);
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const [showDataError, setShowDataError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);


  const [textModal,setTextModal] = useState("")

  const navigate = useNavigate()


  function handleInputFile() {
    inputFileRef.current.click()
  }

  const handleInputImg = (event) => {
    const img = event.target.files[0]
    if (!img) return
    setUserImage(img)
    const reader = new FileReader()
    reader.onload = (e) => {
      const base64 = e.target.result
      setUserImage64(base64)
    }
    reader.readAsDataURL(img)
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    let resImg, resAdd, cont = true

    if(username || newPassword){
      resAdd = await updateUserInfo(
        jwt,
        username,
        newPassword ? SHA256(newPassword).toString() : undefined,
        newPassword ? SHA256(oldPassword).toString() : undefined
      )
      if(! resAdd.success){
        setTextModal(resAdd.message || "Something went wrong")
        return
      }
    }    

    if (userImage) {
      setShowDataError(false)
      resImg = await updateUserImg(userImage, jwt)
      if(! resImg.success){
        setTextModal(resAdd.message || "Something went wrong")
        return
      }
    }

    if(resImg?.success || resAdd?.success){
      setUserFromObject(resImg?.user || resAdd?.user)
    }

    navigate("/")
  }
  return (
    <>
      {
        textModal && 
        <TextModal aceptar={()=>setTextModal("")} >{textModal}</TextModal>
      }
      <Header back='/'></Header>
      <div className={`container ${userImage64 ? ' pt-100' : ''}`}>
        <main className='box'>
          <p>{showDataError}</p>
          <h1 className='newevent__title'>User information</h1>

          <form noValidate onSubmit={onSubmit} className='event_form'>
            <div className='form-container'>
              <div className='add_name'>
                <label className='newevent__text' htmlFor='name'>
                  User name
                </label>
                <div className='newevent__form_inputContainer'>
                  <input
                    className='newevent__form_input'
                    type='text'
                    placeholder={nombre}
                    name='event_name'
                    id='event_name'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <div className='add_image_wrapper'>
                <div className='add_image'>
                  <label className='newevent__text' htmlFor='event_image'>
                    User image
                  </label>

                <input
                  type="file"
                  accept='image/*'
                  ref={inputFileRef}
                  className="newevent__inputFile"
                  name="event_image"
                  id="event_image"
                  onChange={handleInputImg}
                />
                <button
                  type="button"
                  className="newevent__buttonFile"
                  onClick={handleInputFile}
                >
                  Upload Image
                </button>
              </div>
              {userImage64 && (
                <img
                  className="newevent__imagen"
                  src={userImage64}
                  alt={`Imagen del usuario ${username}`}
                />
              )}
              
              {(!userImage64) && (
                <img
                  className="newevent__imagen"
                  src={fotoPerfilUrl}
                  alt={`Imagen del usuario ${username}`}
                />
              )}
              </div>
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
                  <label className='newevent__text' htmlFor='password'>
                    Old password
                  </label>
                  <div className='login_form_inputContainer mb-20'>
                    <img
                      src={candadoCerrado}
                      alt='Logo de un candado/password'
                      className='login_form_logo'
                    />
                    <input
                      className='login_form_input'
                      type={showPassword ? 'text' : 'password'}
                      placeholder='**********'
                      name='password'
                      id='password'
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <img
                      src={showPassword ? eyeOpened : eyeClosed}
                      alt={`Icono de ojo ${
                        showPassword ? 'abierto' : 'cerrado'
                      }`}
                      className='login_form_logo border-0'
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </div>
                  <label
                    className='newevent__text'
                    htmlFor='passwordConfirmation'
                  >
                    New password
                  </label>
                  <div className='login_form_inputContainer mb-20'>
                    <img
                      src={candadoCerrado}
                      alt='Logo de un candado/password'
                      className='login_form_logo'
                    />
                    <input
                      className='login_form_input'
                      type={showPasswordConfirmation ? 'text' : 'password'}
                      placeholder='***********'
                      name='passwordConfirmation'
                      id='passwordConfirmation'
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <img
                      src={showPasswordConfirmation ? eyeOpened : eyeClosed}
                      alt={`Icono de ojo ${
                        showPasswordConfirmation ? 'abierto' : 'cerrado'
                      }`}
                      className='login_form_logo border-0'
                      onClick={() =>
                        setShowPasswordConfirmation(!showPasswordConfirmation)
                      }
                    />
                  </div>
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
export default Settings

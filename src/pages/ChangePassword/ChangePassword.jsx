import '../Login/Login.css'
import '../ForgotPassword/ForgotPassword.css'
import eyeClosed from '../../assets/icons/eyeClosed.svg'
import eyeOpened from '../../assets/icons/eyeOpened.svg'
import { SHA256 } from 'crypto-js'
import Header from '../../globalComponents/Header/Header'
import Button from '../../globalComponents/Button'
import logo from '../../assets/icons/logo.svg'
import candadoCerrado from '../../assets/icons/candadoCerrado.svg'
import { changePassword } from '../../services/changePassword'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Loader from '../../globalComponents/Loader/Loader'

function ChangePassword() {
  const params = useSearchParams()
  const navigate = useNavigate()
  const errMsg = 'An error has occurred'
  const succMsg = 'The password has been changed successfully'
  const passError = 'Passwords do not much'
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false)
  const [showError, setShowError] = useState(false)
  const [showPassEqualError, setShowPassEqualError] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const checkPassEqualError = (pass1, pass2) => {
    if (pass1 !== pass2) {
      setShowPassEqualError(true)
      return true
    }
    setShowPassEqualError(false)
    return false
  }

  const sendChangePasswordRequest = async (e) => {
    e.preventDefault()
    setShowError(false)
    setShowSuccess(false)
    setShowPassEqualError(false)
    setLoading(true)

    if (checkPassEqualError(password, passwordConfirmation)) {
      setLoading(false)
      return setShowPassEqualError(true)
    }

    const resChangePassword = await changePassword(
      params[0].get('id'),
      SHA256(password).toString()
    )
    if (resChangePassword.success) {
      setLoading(false)
      setShowSuccess(true)
      return setTimeout(() => navigate('/login'), 2000)
    }
    setLoading(false)
    setShowError(true)
  }

  return (
    <>
      <Header></Header>
      <div className='contenedor'>
        <main className='login'>
          <img className='login_logo' src={logo} alt='Logo de Splitmeet' />
          <h1 className='login_titulo'>SplitMeet</h1>
          <p className='verify_text'>Set your new password</p>
          {/*           <input
            type='password'
            className='input mb-10'
            placeholder='Enter your new password here'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /> */}
          <form
            noValidate
            className='flex-center'
            onSubmit={(e) => sendChangePasswordRequest(e)}
          >
            <div className='login_form_inputContainer mb-20'>
              <img
                src={candadoCerrado}
                alt='Logo de un candado/password'
                className='login_form_logo'
              />
              <input
                className='login_form_input'
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                name='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <img
                src={showPassword ? eyeOpened : eyeClosed}
                alt={`Icono de ojo ${showPassword ? 'abierto' : 'cerrado'}`}
                className='login_form_logo border-0'
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            <div className='login_form_inputContainer mb-20'>
              <img
                src={candadoCerrado}
                alt='Padlock/password logo'
                className='login_form_logo'
              />
              <input
                className='login_form_input'
                type={showPasswordConfirmation ? 'text' : 'password'}
                placeholder='Password'
                name='passwordConfirmation'
                id='passwordConfirmation'
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
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
            <Button
              classname='login_form_btn login_form_btn--login mt-30'
              text='VERIFY'
            />
          </form>
          {loading && <Loader />}
          {(showError || showSuccess || showPassEqualError) && (
            <span
              className={
                showError || showPassEqualError
                  ? 'error pt-40'
                  : showSuccess && 'success pt-40'
              }
            >
              {showError && errMsg} {showSuccess && succMsg}
              {showPassEqualError && passError}
            </span>
          )}
        </main>
      </div>
    </>
  )
}

export default ChangePassword

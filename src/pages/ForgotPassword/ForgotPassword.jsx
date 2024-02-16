import '../Login/Login.css'
import './ForgotPassword.css'

import Header from '../../globalComponents/Header/Header'
import Button from '../../globalComponents/Button'
import Loader from '../../globalComponents/Loader/Loader'
import logo from '../../assets/icons/logo.svg'
import { sendForgottenPasswordEmail } from '../../services/sendForgottenPasswordEmail'
import { useState } from 'react'

function ForgotPassword() {
  const [errMsg, setErrMsg] = useState('An error has occurred')
  const succMsg = 'The email has been sent successfully'
  const emailErr = 'Incorrect email format'
  const [email, setEmail] = useState('')
  const [showError, setShowError] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showEmailError, setShowEmailError] = useState(false)
  const [loading, setLoading] = useState(false)

  const sendEmail = async () => {
    setLoading(true)
    if (checkEmailError(email)) return setLoading(false)
    const resSendEmail = await sendForgottenPasswordEmail(email)
    if (resSendEmail.success) {
      setLoading(false)
      setShowError(false)
      setShowSuccess(true)
      return
    }
    setLoading(false)
    setShowSuccess(false)
    setErrMsg(resSendEmail.message)
    setShowError(true)
  }

  const checkEmailError = (email) => {
    const expresionRegular = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if (!expresionRegular.test(email)) {
      setShowEmailError(true)
      return true
    }
    setShowEmailError(false)
    return false
  }

  return (
    <>
      <Header></Header>
      <div className='contenedor'>
        <main className='login'>
          <img className='login_logo' src={logo} alt='Logo de Splitmeet' />
          <h1 className='login_titulo'>SplitMeet</h1>
          <p className='verify_text'>
            Write your email to receive a link to reset your password.
          </p>
          <input
            type='text'
            className='input mb-20'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div onClick={sendEmail}>
            <Button
              classname='login_form_btn login_form_btn--login'
              text='VERIFY'
            />
          </div>
          {loading && <Loader />}
          {(showError || showSuccess || showEmailError) && (
            <span
              className={
                showError || showEmailError
                  ? 'error pt-40'
                  : showSuccess && 'success pt-40'
              }
            >
              {showEmailError
                ? emailErr
                : showError
                ? errMsg
                : showSuccess && succMsg}
            </span>
          )}
        </main>
      </div>
    </>
  )
}

export default ForgotPassword

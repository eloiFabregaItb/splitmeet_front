import './Verification.css'

import Header from '../../globalComponents/Header/Header'
import Button from '../../globalComponents/Button'
import logo from '../../assets/icons/logo.svg'
import { useLoginDataContext } from '../../contexts/LoginDataContext'
import { sendVerificationEmail } from '../../services/sendVerificationEmail'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

function Verification() {
  const { email } = useLoginDataContext()
  const params = useParams()
  const errMsg = 'An error occurred while sending the email'
  const succMsg = 'The email has been sent successfully'
  const [showError, setShowError] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const sendEmail = async () => {
    const resSendEmail = await sendVerificationEmail(params.jwt)
    if (resSendEmail.success) {
      setShowError(false)
      setShowSuccess(true)
      return
    }

    setShowSuccess(false)
    setShowError(true)
  }

  return (
    <>
      <Header></Header>
      <div className='contenedor'>
        <main className='login'>
          <img className='login_logo' src={logo} alt='Logo de Splitmeet' />
          <h1 className='login_titulo'>SplitMeet</h1>
          <p className='verify_text'>
            Check your email
            <strong> {email} </strong>
            and verify your SplitMeet account.
          </p>

          <div onClick={sendEmail}>
            <Button
              classname='login_form_btn login_form_btn--login'
              text='VERIFY'
            />
          </div>
          {(showError || showSuccess) && (
            <span
              className={
                showError ? 'error pt-40' : showSuccess && 'success pt-40'
              }
            >
              {showError ? errMsg : showSuccess && succMsg}
            </span>
          )}
        </main>
      </div>
    </>
  )
}

export default Verification

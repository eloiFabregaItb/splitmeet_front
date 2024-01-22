import './Verification.css'

import Header from '../../globalComponents/Header/Header'
import Button from '../../globalComponents/Button'
import logo from '../../assets/icons/logo.svg'
import { useLoginDataContext } from '../../contexts/LoginDataContext'

function Verification() {
  const { email } = useLoginDataContext()
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

          <Button
            classname='login_form_btn login_form_btn--login'
            text='VERIFY'
          />
        </main>
      </div>
    </>
  )
}

export default Verification

import Header from '../../globalComponents/Header/Header'
import Button from '../../globalComponents/Button'
import logo from '../../assets/icons/logo.svg'
import user from '../../assets/icons/user.svg'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { api_url } from '../../utils/constants'

function Verification() {
  return (
    <>
      <Header></Header>
      <div className='contenedor'>
        <main className='login'>
          <img className='login_logo' src={logo} alt='Logo de Splitmeet' />
          <h1 className='login_titulo'>SplitMeet</h1>

          <form noValidate className='login_form'>
            <Button
              classname='login_form_btn login_form_btn--login'
              text='LOGIN'
            />
          </form>
        </main>
      </div>
    </>
  )
}

export default Verification

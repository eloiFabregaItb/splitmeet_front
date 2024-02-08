import './Login.css'
import logo from '../../assets/icons/logo.svg'
import user from '../../assets/icons/user.svg'
import google from '../../assets/icons/google.svg'
import candadoAbierto from '../../assets/icons/candadoAbierto.svg'
import candadoCerrado from '../../assets/icons/candadoCerrado.svg'

import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react'

import { SHA256 } from 'crypto-js'
import { checkLogin } from '../../services/checkLogin'
import {oauth} from "../../services/oauth"
import { joinEvent } from '../../services/joinEvent'
import { api_url } from '../../utils/constants'
import Header from '../../globalComponents/Header/Header'
import Button from '../../globalComponents/Button'
import { useLoginDataContext } from '../../contexts/LoginDataContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showEmailError, setShowEmailError] = useState(false)
  const [showDataError, setShowDataError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { loginContext } = useLoginDataContext()

  const navigate = useNavigate()
  const params = useSearchParams()

  /*
    Function that checks if the email inputed has an email structure.
    If it doesn't have an email structure, it shows an errorMsg (showEmailError = true) and returns true.
    If it has an email structure, it doesn't show an errorMsg (showEmailError = false) and returns false.
    */
  const checkEmailError = (email) => {
    const expresionRegular = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if (!expresionRegular.test(email)) {
      setShowEmailError(true)
      return true
    }
    setShowEmailError(false)
    return false
  }

  const oauthLogin = async () => {
    const resOauth = await oauth()
    if (resOauth.success) {
      console.log(resOauth);
    }
  }

  /*
    Function that checks the email structure and sends the email and password to the server.
    */
  const onSubmit = async (e) => {
    e.preventDefault()
    //console.log(SHA256(password).toString());
    //If the email has the proper structure, then the email and password is sent to the server.
    if (!checkEmailError(email) && password.trim() !== '') {
      const resLogin = await checkLogin(email, SHA256(password).toString())
      if (resLogin.success) {
        setShowDataError(false)
        // localStorage.setItem("jwt", resLogin.jwt);
        loginContext(resLogin)
        if (location.pathname === '/login/invitation') {
          const resJoinEvent = joinEvent(resLogin.jwt, params[0].get('evt_url'))
          if (resJoinEvent.success) {
            return navigate(`/event/${params[0].get('evt_url')}`)
          }
        }

        if (resLogin.mailValidated === 0) {
          return navigate(`/verification/${resLogin.jwt}`)
        }

        return navigate('/')
      }
      setShowDataError(true)
      localStorage.clear()
    }
  }

  return (
    <>
      <Header></Header>
      <div className='contenedor'>
        <main
          className={`login ${
            showEmailError || showDataError ? 'login--error' : ''
          }`}
        >
          <img className='login_logo' src={logo} alt='Logo de Splitmeet' />
          <h1 className='login_titulo'>SplitMeet</h1>

          <form noValidate onSubmit={onSubmit} className='login_form'>
            <div className='login_form_inputContainer'>
              <img
                src={user}
                alt='Logo de usuario'
                className='login_form_logo'
              />
              <input
                className='login_form_input'
                type='email'
                placeholder='Email'
                name='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='login_form_inputContainer'>
              <img
                src={showPassword ? candadoAbierto : candadoCerrado}
                alt='Logo de un candado/password'
                className='login_form_logo'
                onClick={() => setShowPassword(!showPassword)}
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
            </div>

            {showEmailError ? (
              <span className='error'>Incorrectly formatted email</span>
            ) : showDataError ? (
              <span className='error'>
                The email and/or password are incorrect
              </span>
            ) : (
              ''
            )}
            <Button
              classname='login_form_btn login_form_btn--login'
              text='LOGIN'
            />
          </form>

          <p className='login_mensajeRegistro'>
            You do not have an account?
            <Link to='/signup' className='subrayado'>
              Sign up
            </Link>
          </p>

          <div className='login_buttons'>
            {/*                         <a
                            href="/"
                            className="login_form_btn login_form_btn--google"
                        >
                            <img
                                className="lWogin_buttons_logo"
                                src={google}
                                alt="Logo de Google"
                            />
                            Continue with Google
                        </a> */}
            <button
              onClick={oauthLogin}
/*               href={`${api_url}/auth/oauth`}
              to='/auth/oauth' */
              className='subrayado login_form_btn login_form_btn--google'
            >
              <img
                className='login_buttons_logo'
                src={google}
                alt='Logo de Google'
              />
              Continue with Google
            </button>
          </div>
        </main>
      </div>
    </>
  )
}

export default Login

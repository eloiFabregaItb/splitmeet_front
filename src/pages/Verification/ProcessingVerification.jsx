import { useEffect, useState } from 'react'
import { validateMail } from '../../services/ValidateMail'
import { checkLoginJwt } from '../../services/checkLoginJwt'
import { useLoginDataContext } from '../../contexts/LoginDataContext'
import Loader from '../../globalComponents/Loader/Loader'
import Header from '../../globalComponents/Header/Header'
import { useParams, useNavigate } from 'react-router-dom'

function ProcessingVerification() {
  const { loginContext } = useLoginDataContext()
  const params = useParams()
  const navigate = useNavigate()
  const jwt = params.jwt

  useEffect(() => {
    const validateEmail = async () => {
      const resValidateMail = await validateMail(jwt)
      if (resValidateMail.success) {
        const resCheckLogin = await checkLoginJwt(jwt)
        if (resCheckLogin.success) {
          loginContext(resCheckLogin)
          localStorage.setItem('jwt', resCheckLogin.jwt)
          return navigate('/')
        }
        return navigate('/login')
      }
      return navigate(`/verification/${params.jwt}`)
    }

    validateEmail()
  }, [])

  return (
    <>
      <Header></Header>
      <Loader></Loader>
    </>
  )
}

export default ProcessingVerification

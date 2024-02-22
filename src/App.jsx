import { useEffect } from 'react'
// import { io, Manager } from "socket.io-client";
// const url = "http://172.30.4.55:3000";
import {
  Link,
  Route,
  Routes,
  useNavigate,
  useSearchParams,
  useLocation,
} from 'react-router-dom'
import { checkLoginJwt } from './services/checkLoginJwt.js'
import { joinEvent } from './services/joinEvent.js'

import './App.css'

import {
  ProtectedRoute,
  useLoginDataContext,
} from './contexts/LoginDataContext.jsx'

// PAGES
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import Home from './pages/Home/Home'
import Error404 from './pages/Error404/Error404'
import NewEvent from './pages/NewEvent/NewEvent.jsx'
import EventDetail from './pages/EventDetail/EventDetail.jsx'
import Verification from './pages/Verification/Verification.jsx'
import Invitation from './pages/Invitation/Invitation.jsx'
import ProcessingVerification from './pages/Verification/ProcessingVerification.jsx'
import Settings from './pages/Settings/Settings.jsx'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.jsx'
import ChangePassword from './pages/ChangePassword/ChangePassword.jsx'
import { NewExpense } from './pages/NewExpense/NewExpense.jsx'

function App() {
  const { loginContext, isLoggedIn, emailValidated, jwt } =
    useLoginDataContext()
  const navigate = useNavigate()
  const location = useLocation()
  const params = useSearchParams()

  useEffect(() => {
    const checkLogin = async () => {
      if (emailValidated === 0) {
        return navigate(`/verification?jwt=${jwt}`)
      }
      const token = localStorage.getItem('jwt')
      if (location.pathname === '/login/invitation') {
        const resJoinEvent = await joinEvent(
          /* jwt */ token,
          params[0].get('evt_url')
        )
        if (resJoinEvent.success) {
          return navigate(`/event/${params[0].get('evt_url')}`)
        }
      }
      if (!isLoggedIn && token) {
        const resUserInfo = await checkLoginJwt(token)
        if (resUserInfo.success) {
          loginContext(resUserInfo)
          return navigate('/')
        }
      }
    }

    checkLogin()
  }, [location.pathname])

  // const [ioSocket, setIoSocket] = useState(null);
  // useEffect(() => {
  //   const socket = io(url);
  //   setIoSocket(socket);
  //   socket.on("chatMsg", (msg) => {
  //     console.log(msg);
  //   });

  //   return () => {
  //     if (socket) {
  //       socket.disconnect();
  //     }
  //   };
  // }, []);

  return (
    <>
      <div className='App'>
        {/* <button
          onClick={() => {
            ioSocket.emit("chatMsg", "hola");
          }}
        >
          Hola
        </button> */}
        {/* <Header /> */}

        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route
            path='/newExpense/:event_url'
            element={
              <ProtectedRoute>
                <NewExpense />
              </ProtectedRoute>
            }
          />
          <Route
            path='/new'
            element={
              <ProtectedRoute>
                <NewEvent />
              </ProtectedRoute>
            }
          />
          <Route
            path='/event/:url'
            element={
              <ProtectedRoute>
                <EventDetail />
              </ProtectedRoute>
            }
          />
          <Route path='/login/invitation' element={<Login />} />
          <Route
            path='/invitation/:event_url'
            element={
              <ProtectedRoute>
                <Invitation />
              </ProtectedRoute>
            }
          />
          {/* <Route path="/event/:url/users" element={<Users />} /> */}
          <Route
            path='/verification'
            element={
              <ProtectedRoute>
                <Verification />
              </ProtectedRoute>
            }
          />{' '}
          {/* ARREGLAR ERROR */}
          <Route
            path='/validateMail'
            element={<ProcessingVerification />} /* ARREGLAR ERROR */
          />
          <Route
            path='/settings'
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route path='/forgotten' element={<ForgotPassword />} />
          <Route
            path='/change-password'
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />{' '}
          {/* ARREGLAR ERROR */}
          <Route path='*' element={<Error404 />} />
        </Routes>
      </div>
    </>
  )
}

export default App

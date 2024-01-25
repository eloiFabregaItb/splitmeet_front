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
import Dashboard from './pages/Dashboard/Dashboard'
import Error404 from './pages/Error404/Error404'
import NewEvent from './pages/NewEvent/NewEvent.jsx'
import Header from './globalComponents/Header/Header.jsx'
import EventDetail from './pages/EventDetail/EventDetail.jsx'
import Verification from './pages/Verification/Verification.jsx'
import Users from './pages/EventDetail/views/Calendar.jsx'
import Invitation from './pages/Invitation/Invitation.jsx'
import NewExpense from './pages/NewExpense/NewExpense.jsx'
import ProcessingVerification from './pages/Verification/ProcessingVerification.jsx'

function App() {
  const { loginContext, isLoggedIn, emailValidated, jwt } =
    useLoginDataContext()
  const navigate = useNavigate()
  const location = useLocation()
  const params = useSearchParams()

  useEffect(() => {
    const checkLogin = async () => {
      if (emailValidated === 0) {
        return navigate(`/verification/${jwt}`)
      }
      const token = localStorage.getItem('jwt')
      if (!isLoggedIn && token) {
        const resUserInfo = await checkLoginJwt(token)
        if (resUserInfo.success) {
          loginContext(resUserInfo)
          return navigate('/home')
        }
      }
      if (location.pathname === '/login/invitation') {
        const resJoinEvent = joinEvent(jwt, params[0].get('evt_url'))
        if (resJoinEvent.success) {
          return navigate(`/event/${params[0].get('evt_url')}`)
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
              <>
                <Header></Header>
                <h1>Main page</h1>
              </>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route
            path='/home'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/new' element={<NewEvent />} />
          <Route path='/event/:url' element={<EventDetail />} />
          <Route path='/login/invitation' element={<Login />} />
          <Route path='/invitation/:event_url' element={<Invitation />} />
          {/* <Route path="/event/:url/users" element={<Users />} /> */}
          <Route path='/verification/:jwt' element={<Verification />} />
          <Route path='/newExpense/:event_url' element={<NewExpense />} />
          
          <Route path='*' element={<Error404 />} />
          <Route
            path='/validateMail/:jwt'
            element={<ProcessingVerification />}
          />
        </Routes>
      </div>
    </>
  )
}

export default App

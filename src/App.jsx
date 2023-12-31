import { useEffect } from "react";
// import { io, Manager } from "socket.io-client";
// const url = "http://172.30.4.55:3000";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { checkLoginJwt } from "./services/checkLoginJwt.js";

import "./App.css";

import {
  ProtectedRoute,
  useLoginDataContext,
} from "./contexts/LoginDataContext.jsx";

// PAGES
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Error404 from "./pages/Error404/Error404";
import NewEvent from "./pages/NewEvent/NewEvent.jsx";
import Header from "./globalComponents/Header/Header.jsx";
import EventDetail from "./pages/EventDetail/EventDetail.jsx";
import Verification from "./pages/Verification/Verification.jsx";
import Users from "./pages/EventDetail/views/Calendar.jsx";
import Invitation from "./pages/Invitation/Invitation.jsx";

function App() {
  const { loginContext, isLoggedIn } = useLoginDataContext();
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      const jwt = localStorage.getItem("jwt");
      if (!isLoggedIn && jwt) {
        const resUserInfo = await checkLoginJwt(jwt);
        if (resUserInfo.success) {
          loginContext(resUserInfo);
          navigate("/home");
        }
      }
    };

    checkLogin();
  }, []);

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
          <Route path='/error' element={<Error404 />} />
          <Route path='/event/:url' element={<EventDetail />} />
          <Route path='/invitation/:event_url' element={<Invitation />} />
          {/* <Route path="/event/:url/users" element={<Users />} /> */}
          <Route path='/verification/:jwt' element={<Verification />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

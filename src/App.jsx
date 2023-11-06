import { useEffect } from "react";
// import { io, Manager } from "socket.io-client";
// const url = "http://172.30.4.55:3000";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { checkLoginJwt } from "./services/checkLoginJwt.js";

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

function App() {
  const { logoutContext, loginContext, isLoggedIn } = useLoginDataContext();
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

  function handleLogout(e) {
    e.preventDefault();
    logoutContext();
    navigate("/");
  }

  return (
    <>
      <div className="App">
        {/* <button
          onClick={() => {
            ioSocket.emit("chatMsg", "hola");
          }}
        >
          Hola
        </button> */}

        <header>
          <nav>
            {isLoggedIn && (
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <a href="#" onClick={handleLogout}>
                    Logout
                  </a>
                </li>
                <li>
                  <Link to="/home">Dashboard</Link>
                </li>
              </ul>
            )}
            {!isLoggedIn && (
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Sign-Up</Link>
                </li>
              </ul>
            )}
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<h1>Main page</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/error" element={<Error404 />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

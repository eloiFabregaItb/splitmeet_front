import { createContext, useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

export const LoginDataContext = createContext();

export const useLoginDataContext = () => {
  return useContext(LoginDataContext);
};

export const LoginDataProvider = ({ children }) => {
  const [codUsuario, setCodUsuario] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [nombre, setNombre] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [emailValidated, setEmailValidated] = useState(false);
  const [jwt, _setJwt] = useState(""); //todo use local storage
  const [saldo, setSaldo] = useState(1500.51);
  const [eventInfo, setEventInfo] = useState({});
  const setJwt = (x) => {
    _setJwt(x);
    localStorage.setItem("jwt", x);
  };

  async function login(userData) {
    setIsLoggedIn(true);
    setUserFromObject(userData);
  }

  async function logout() {
    //TODO localStorace.clear()
    console.log("LOGOUT");
    setIsLoggedIn(false);
    setCodUsuario("");
    setFotoPerfil("");
    setTipoUsuario("");
    setNombre("");
    setEmail("");
    setEmailValidated(false);
    setJwt("");
    setEventInfo({});
  }

  function setUserFromObject(userData) {
    setCodUsuario("");
    setFotoPerfil(userData.img);
    setTipoUsuario(userData.type);
    setNombre(userData.name);
    setEmail(userData.mail);
    setEmailValidated(userData.mailValidated);
    setJwt(userData.jwt);
    //userData.oauth?
  }

  return (
    <LoginDataContext.Provider
      value={{
        loginContext: login,
        logoutContext: logout,
        isLoggedIn,
        nombre,
        codUsuario,
        fotoPerfil,
        email,
        tipoUsuario,
        emailValidated,
        jwt,
        saldo,
        eventInfo,
        setEventInfo,
      }}
    >
      {children}
    </LoginDataContext.Provider>
  );
};

export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useLoginDataContext();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ location }} />;
  }

  return children;
};

/*
then in login:
  const location = useLocation()
  const locationPrev = location?.state?.location?.pathname ?? "/"
  function handleLogin(){
    // ...
    navigate(loacationPrev)
  }
*/

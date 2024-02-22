import { createContext, useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getUserProfileValidUrl } from "../services/userImage";

export const LoginDataContext = createContext();

export const useLoginDataContext = () => {
  return useContext(LoginDataContext);
};

export const LoginDataProvider = ({ children }) => {
  const [codUsuario, setCodUsuario] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [nombre, setNombre] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState("");
  const [imgUrl,setImgUrl] = useState("")
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

  async function setUserFromObject(userData) {

    setCodUsuario(userData.id);
    setFotoPerfil(userData.img);
    setEmail(userData.mail);
    setEmailValidated(userData.mailValidated);
    setNombre(userData.name);
    
    if(userData.type !== undefined){
      setTipoUsuario(userData.type);
    }
    if(userData.jwt){
      setJwt(userData.jwt);
    }
    //userData.oauth?


    const imgUrl = await getUserProfileValidUrl(userData.img)
    setImgUrl(imgUrl)
  }

  return (
    <LoginDataContext.Provider
      value={{
        loginContext: login,
        logoutContext: logout,
        setUserFromObject,
        isLoggedIn,
        nombre,
        codUsuario,
        fotoPerfil,
        fotoPerfilUrl : imgUrl,
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

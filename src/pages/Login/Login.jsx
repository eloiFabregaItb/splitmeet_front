import "./Login.css";
import logo from "../../assets/icons/logo.svg";
import user from "../../assets/icons/user.svg";
import google from "../../assets/icons/google.svg";
import candado from "../../assets/icons/password.svg";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { SHA256 } from "crypto-js";
import { checkLogin } from "../../services/checkLogin";
import { api_url } from "../../utils/constants";
import Button from "../../globalComponents/Button";
import { useLoginDataContext } from "../../contexts/LoginDataContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showEmailError, setShowEmailError] = useState(false);
  const [showDataError, setShowDataError] = useState(false);

  const { loginContext } = useLoginDataContext();

  const navigate = useNavigate();

  /*
    Function that checks if the email inputed has an email structure.
    If it doesn't have an email structure, it shows an errorMsg (showEmailError = true) and returns true.
    If it has an email structure, it doesn't show an errorMsg (showEmailError = false) and returns false.
    */
  const checkEmailError = (email) => {
    const expresionRegular = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!expresionRegular.test(email)) {
      setShowEmailError(true);
      return true;
    }
    setShowEmailError(false);
    return false;
  };

  /*
    Function that checks the email structure and sends the email and password to the server.
    */
  const onSubmit = async (e) => {
    e.preventDefault();
    //console.log(SHA256(password).toString());
    //If the email has the proper structure, then the email and password is sent to the server.
    if (!checkEmailError(email) && password.trim() !== "") {
      const resLogin = await checkLogin(email, SHA256(password).toString());
      if (resLogin.success) {
        setShowDataError(false);
        // localStorage.setItem("jwt", resLogin.jwt);
        loginContext(resLogin);
        return navigate("/home");
      }
      setShowDataError(true);
      localStorage.clear();
    }
  };

  return (
    <>
      <div className="contenedor">
        <main
          className={`login ${
            showEmailError || showDataError ? "login--error" : ""
          }`}
        >
          <img className="login_logo" src={logo} alt="Logo de Splitmeet" />
          <h1 className="login_titulo">SplitMeet</h1>

          <form noValidate onSubmit={onSubmit} className="login_form">
            <div className="login_form_inputContainer">
              <img
                src={user}
                alt="Logo de usuario"
                className="login_form_logo"
              />
              <input
                className="login_form_input"
                type="email"
                placeholder="Email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="login_form_inputContainer">
              <img
                src={candado}
                alt="Logo de un candado/password"
                className="login_form_logo"
              />
              <input
                className="login_form_input"
                type="password"
                placeholder="Contraseña"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {showEmailError ? (
              <span className="error">Email con formato incorrecto</span>
            ) : showDataError ? (
              <span className="error">
                El correo y/o la contraseña son incorrectos
              </span>
            ) : (
              ""
            )}
            <Button
              classname="login_form_btn login_form_btn--login"
              text="LOGIN"
            />
          </form>

          <p className="login_mensajeRegistro">
            ¿No tienes una cuenta?
            <Link to="/signup" className="subrayado">
              Regístrate
            </Link>
          </p>

          <div className="login_buttons">
            {/*                         <a
                            href="/"
                            className="login_form_btn login_form_btn--google"
                        >
                            <img
                                className="login_buttons_logo"
                                src={google}
                                alt="Logo de Google"
                            />
                            Continue with Google
                        </a> */}
            <a
              href={`${api_url}/auth/google`}
              to="/auth/google"
              className="subrayado login_form_btn login_form_btn--google"
            >
              <img
                className="login_buttons_logo"
                src={google}
                alt="Logo de Facebook"
              />
              Continue with Google
            </a>
          </div>
        </main>
      </div>
    </>
  );
}

export default Login;

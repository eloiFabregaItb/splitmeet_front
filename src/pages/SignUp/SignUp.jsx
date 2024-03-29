import { signUp } from "../../services/signUp";
import "../Login/Login.css";
import "./SignUp.css";
import "../ForgotPassword/ForgotPassword.css";
import logo from "../../assets/icons/logo.svg";
import user from "../../assets/icons/user.svg";
import correo from "../../assets/icons/correo.svg";
import candadoCerrado from "../../assets/icons/candadoCerrado.svg";
import eyeOpened from "../../assets/icons/eyeOpened.svg";
import eyeClosed from "../../assets/icons/eyeClosed.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { SHA256 } from "crypto-js";
import { useNavigate } from "react-router-dom";
import Header from "../../globalComponents/Header/Header";
import Button from "../../globalComponents/Button";
import Loader from "../../globalComponents/Loader/Loader";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showInputError, setShowInputError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPassEqualError, setShowPassEqualError] = useState(false);
  const [showDataError, setShowDataError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const checkIfInputsAreFilled = () => {
    if (
      username.trim() !== "" &&
      email.trim() !== "" &&
      password1.trim() !== "" &&
      password2.trim() !== ""
    ) {
      setShowInputError(false);
      return true;
    }
    setShowInputError(true);
    return false;
  };

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

  const checkPassEqualError = (pass1, pass2) => {
    if (pass1 !== pass2) {
      setShowPassEqualError(true);
      return true;
    }
    setShowPassEqualError(false);
    return false;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    //If the email has the proper structure, passwords are equal and not void, then the username, email and password is sent to the server.
    if (
      checkIfInputsAreFilled() &&
      !checkEmailError(email) &&
      !checkPassEqualError(password1, password2)
    ) {
      setLoading(true);
      const resLogin = await signUp(
        username,
        email,
        SHA256(password1).toString()
      );
      if (resLogin.success) {
        setShowDataError(false);
        setShowSuccess(true);
        localStorage.setItem("jwt", resLogin.jwt);
        setLoading(false);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        return;
      }
      setLoading(false);
      setShowDataError(true);
    }
  };

  return (
    <>
      <Header></Header>
      <div className="contenedor">
        <main
          className={`login login--signup${
            showInputError ||
            showEmailError ||
            showPassEqualError ||
            showDataError ||
            showSuccess
              ? " signup--error"
              : ""
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
                type="text"
                placeholder="Username"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="login_form_inputContainer">
              <img
                src={correo}
                alt="Logo de email"
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
                src={candadoCerrado}
                alt="Logo de un candado/password"
                className="login_form_logo"
              />
              <input
                className="login_form_input"
                type={showPassword1 ? "text" : "password"}
                placeholder="Password"
                name="password1"
                id="password1"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
              />
              <img
                src={showPassword1 ? eyeOpened : eyeClosed}
                alt={`Icono de ojo ${showPassword1 ? "abierto" : "cerrado"}`}
                className="login_form_logo border-0"
                onClick={() => setShowPassword1(!showPassword1)}
              />
            </div>

            <div className="login_form_inputContainer">
              <img
                src={candadoCerrado}
                alt="Logo de un candado/password"
                className="login_form_logo"
              />
              <input
                className="login_form_input"
                type={showPassword2 ? "text" : "password"}
                placeholder="Repeat password"
                name="password2"
                id="password2"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
              <img
                src={showPassword2 ? eyeOpened : eyeClosed}
                alt={`Icono de ojo ${showPassword2 ? "abierto" : "cerrado"}`}
                className="login_form_logo border-0"
                onClick={() => setShowPassword2(!showPassword2)}
              />
            </div>
            {loading && <Loader />}
            {showInputError ? (
              <span className="error">Fill in all fields</span>
            ) : showEmailError ? (
              <span className="error">Incorrect email format</span>
            ) : showPassEqualError ? (
              <span className="error">Passwords do not match</span>
            ) : showDataError ? (
              <span className="error">
                The entered email is already registered
              </span>
            ) : showSuccess ? (
              <span className="success">User registered successfully</span>
            ) : (
              ""
            )}

            <Button
              classname="login_form_btn login_form_btn--login"
              text="SIGN UP"
            />
          </form>

          <p className="login_mensajeRegistro">
            Already have an account?
            <Link to="/login" className="subrayado">
              Log in
            </Link>
          </p>
        </main>
      </div>
    </>
  );
}

export default SignUp;

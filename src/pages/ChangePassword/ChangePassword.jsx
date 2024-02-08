import "../Login/Login.css";
import "../ForgotPassword/ForgotPassword.css";
import eyeClosed from "../../assets/icons/eyeClosed.svg";
import eyeOpened from "../../assets/icons/eyeOpened.svg";

import Header from "../../globalComponents/Header/Header";
import Button from "../../globalComponents/Button";
import logo from "../../assets/icons/logo.svg";
import candadoCerrado from "../../assets/icons/candadoCerrado.svg";
import { changePassword } from "../../services/changePassword";
import { useParams } from "react-router-dom";
import { useState } from "react";

function ChangePassword() {
  const params = useParams();
  const errMsg = "An error occurred while sending the email";
  const succMsg = "The email has been sent successfully";
  const passError = "Passwords do not much";
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const [showError, setShowError] = useState(false);
  const [showPassEqualError, setShowPassEqualError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const checkPassEqualError = (pass1, pass2) => {
    if (pass1 !== pass2) {
      setShowPassEqualError(true);
      return true;
    }
    setShowPassEqualError(false);
    return false;
  };

  const sendChangePasswordRequest = async (e) => {
    e.preventDefault();
    setShowError(false);
    setShowSuccess(false);
    setShowPassEqualError(false);

    if (checkPassEqualError(password, passwordConfirmation)) {
      setShowPassEqualError(true);
      return;
    }

    const resChangePassword = await changePassword(params.jwt, password);
    if (resChangePassword.success) {
      setShowSuccess(true);
      return;
    }

    setShowError(true);
  };

  return (
    <>
      <Header></Header>
      <div className="contenedor">
        <main className="login">
          <img className="login_logo" src={logo} alt="Logo de Splitmeet" />
          <h1 className="login_titulo">SplitMeet</h1>
          <p className="verify_text">Set your new password</p>
          {/*           <input
            type='password'
            className='input mb-10'
            placeholder='Enter your new password here'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /> */}
          <form
            noValidate
            className="flex-center"
            onSubmit={(e) => sendChangePasswordRequest(e)}
          >
            <div className="login_form_inputContainer mb-20">
              <img
                src={candadoCerrado}
                alt="Logo de un candado/password"
                className="login_form_logo"
              />
              <input
                className="login_form_input"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <img
                src={showPassword ? eyeOpened : eyeClosed}
                alt={`Icono de ojo ${showPassword ? "abierto" : "cerrado"}`}
                className="login_form_logo border-0"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            <div className="login_form_inputContainer mb-20">
              <img
                src={candadoCerrado}
                alt="Logo de un candado/password"
                className="login_form_logo"
              />
              <input
                className="login_form_input"
                type={showPasswordConfirmation ? "text" : "password"}
                placeholder="Password"
                name="passwordConfirmation"
                id="passwordConfirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
              <img
                src={showPasswordConfirmation ? eyeOpened : eyeClosed}
                alt={`Icono de ojo ${
                  showPasswordConfirmation ? "abierto" : "cerrado"
                }`}
                className="login_form_logo border-0"
                onClick={() =>
                  setShowPasswordConfirmation(!showPasswordConfirmation)
                }
              />
            </div>
            <Button
              classname="login_form_btn login_form_btn--login mt-30"
              text="VERIFY"
            />
          </form>
          {(showError || showSuccess) && (
            <span
              className={
                showError ? "error pt-40" : showSuccess && "success pt-40"
              }
            >
              {showError && errMsg} {showSuccess && succMsg}{" "}
              {showPassEqualError && passError}
            </span>
          )}
        </main>
      </div>
    </>
  );
}

export default ChangePassword;

import "../NewEvent/NewEvent.css";
import "../Login/Login.css";
import "../ForgotPassword/ForgotPassword.css";
import Header from "../../globalComponents/Header/Header";
import user from "../../assets/icons/user.svg";
import candadoCerrado from "../../assets/icons/candadoCerrado.svg";
import eyeClosed from "../../assets/icons/eyeClosed.svg";
import eyeOpened from "../../assets/icons/eyeOpened.svg";

import { useRef, useState, useEffect } from "react";

import Button from "../../globalComponents/Button";
import UserInvitation from "../Invitation/UserInvitation/UserInvitation";
import { useLoginDataContext } from "../../contexts/LoginDataContext";
import { addEvent } from "../../services/addEvent";
import { uploadEventImg } from "../../services/uploadEventImg";
import { sendEventInvitations } from "../../services/sendEventInvitations";
import { useNavigate } from "react-router-dom";

function Settings() {
  const initialData = {
    name: "",
  };
  const passError = "Passwords do not much";
  const inputFileRef = useRef(null);
  const [userData] = useState(initialData);
  const { jwt, nombre } = useLoginDataContext();
  const [event_name, setName] = useState("");
  const [event_image, setImage] = useState(null);
  const [event_image64, setImage64] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [inputDisabled, setInputDisabled] = useState(true);
  const [userInvitations, setUserInvitations] = useState([]);
  const { loginContext } = useLoginDataContext();
  const [showDataError, setShowDataError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const [showPassEqualError, setShowPassEqualError] = useState(false);
  const navigate = useNavigate();

  const plusButton = useRef(null);

  const addInvitation = () => {
    setUserInvitations([...userInvitations, userMail]);
    setUserMail("");
  };

  const removeInvitation = (email) => {
    const newUserInvitations = userInvitations.filter(
      (invitation) => invitation !== email
    );
    setUserInvitations(newUserInvitations);
  };

  const validUserMail = (email) => {
    if (userInvitations.includes(email)) return false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;
    return true;
  };

  //Cuando cambia el email, se comprueba si el email es válido. Si no lo es, se desactiva el botón +
  /*   useEffect(() => {
    setInputDisabled(!validUserMail(userMail));
  }, [userMail]); */

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      plusButton.current.click();
    }
  };

  function handleInputFile() {
    inputFileRef.current.click();
  }

  const handleInputImg = (event) => {
    const img = event.target.files[0];
    if (!img) return;
    setImage(img);
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result;
      setImage64(base64);
    };
    reader.readAsDataURL(img);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const resAdd = await addEvent(
      event_name,
      event_image,
      userInvitations,
      jwt
    );
    if (resAdd.success) {
      setShowDataError(false);
      const resImg = await uploadEventImg(resAdd.evt_url, event_image, jwt);

      if (resImg.success) {
        const resInvite = await sendEventInvitations(
          jwt,
          resAdd.evt_url,
          userInvitations
        );
      }
      //loginContext(resAdd);
      return navigate(`/event/${resAdd.evt_url}`);
    }
    setShowDataError(true);
    //localStorage.clear()
  };
  return (
    <>
      <Header back="/"></Header>
      <div className="container">
        <main className="box">
          <p>{showDataError}</p>
          <h1 className="newevent__title">User information</h1>

          <form noValidate onSubmit={onSubmit} className="event_form">
            <div className="form-container">
              <div className="add_name">
                <label className="newevent__text" htmlFor="name">
                  User name
                </label>
                <div className="newevent__form_inputContainer">
                  <input
                    className="newevent__form_input"
                    type="text"
                    placeholder={nombre}
                    name="event_name"
                    id="event_name"
                    value={event_name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="add_image">
                <label className="newevent__text" htmlFor="event_image">
                  User image
                </label>

                <input
                  type="file"
                  ref={inputFileRef}
                  className="newevent__inputFile"
                  name="event_image"
                  id="event_image"
                  onChange={handleInputImg}
                />
                <button
                  type="button"
                  className="newevent__buttonFile"
                  onClick={handleInputFile}
                >
                  Upload Image
                </button>
              </div>
              {event_image64 && (
                <img
                  className="newevent__imagen"
                  src={event_image64}
                  alt={`Imagen del evento ${event_name}`}
                />
              )}
              {/* <div className="newevent__members">
                <label className="newevent__text" htmlFor="event_members">
                  Event members
                </label>

                <textarea
                  className="newevent__form_textarea"
                  name="event_members"
                  cols="33"
                  rows="10"
                  value={event_members}
                  onChange={(e) => setMembers(e.target.value)}
                ></textarea>
              </div> */}
              <div className="form-container__container-invitation">
                <div className="add_name">
                  <label className="newevent__text" htmlFor="password">
                    New password
                  </label>
                  <div className="login_form_inputContainer mb-20">
                    <img
                      src={candadoCerrado}
                      alt="Logo de un candado/password"
                      className="login_form_logo"
                    />
                    <input
                      className="login_form_input"
                      type={showPassword ? "text" : "password"}
                      placeholder="**********"
                      name="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <img
                      src={showPassword ? eyeOpened : eyeClosed}
                      alt={`Icono de ojo ${
                        showPassword ? "abierto" : "cerrado"
                      }`}
                      className="login_form_logo border-0"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </div>
                  <label
                    className="newevent__text"
                    htmlFor="passwordConfirmation"
                  >
                    Confirm new password
                  </label>
                  <div className="login_form_inputContainer mb-20">
                    <img
                      src={candadoCerrado}
                      alt="Logo de un candado/password"
                      className="login_form_logo"
                    />
                    <input
                      className="login_form_input"
                      type={showPasswordConfirmation ? "text" : "password"}
                      placeholder="***********"
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
                </div>
              </div>

              <Button
                className="newevent_form_btn newevent_form_btn--login"
                text="SUBMIT"
              />
            </div>
          </form>
        </main>
      </div>
    </>
  );
}
export default Settings;

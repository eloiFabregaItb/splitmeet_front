import { signUp } from "../../services/signUp";
import "../Login/Login.css";
import "./SignUp.css";
import logo from "../../assets/icons/logo.svg";
import user from "../../assets/icons/user.svg";
import correo from "../../assets/icons/correo.svg";
import candado from "../../assets/icons/password.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { SHA256 } from "crypto-js";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [showInputError, setShowInputError] = useState(false);
    const [showEmailError, setShowEmailError] = useState(false);
    const [showPassEqualError, setShowPassEqualError] = useState(false);
    const [showDataError, setShowDataError] = useState(false);

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
        const expresionRegular =
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
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
            const resLogin = await signUp(
                username,
                email,
                SHA256(password1).toString()
            );
            if (resLogin.success) {
                setShowDataError(false);
                localStorage.setItem("jwt", resLogin.jwt);
                return navigate("/login");
            }
            setShowDataError(true);
        }
    };

    return (
        <>
            <div className="contenedor">
                <main
                    className={`login login--signup${
                        showInputError ||
                        showEmailError ||
                        showPassEqualError ||
                        showDataError
                            ? " signup--error"
                            : ""
                    }`}
                >
                    <img
                        className="login_logo"
                        src={logo}
                        alt="Logo de Splitmeet"
                    />
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
                                src={candado}
                                alt="Logo de un candado/password"
                                className="login_form_logo"
                            />
                            <input
                                className="login_form_input"
                                type="password"
                                placeholder="Contraseña"
                                name="password1"
                                id="password1"
                                value={password1}
                                onChange={(e) => setPassword1(e.target.value)}
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
                                placeholder="Repita su contraseña"
                                name="password2"
                                id="password2"
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                            />
                        </div>

                        {showInputError ? (
                            <span className="error">
                                Rellena todos los campos
                            </span>
                        ) : showEmailError ? (
                            <span className="error">
                                Email con formato incorrecto
                            </span>
                        ) : showPassEqualError ? (
                            <span className="error">
                                Las contraseñas no son iguales
                            </span>
                        ) : showDataError ? (
                            <span className="error">
                                El email introducido ya está registrado
                            </span>
                        ) : (
                            ""
                        )}

                        <button className="login_form_btn login_form_btn--login">
                            SIGN UP
                        </button>
                    </form>

                    <p className="login_mensajeRegistro">
                        ¿Ya tienes una cuenta?
                        <Link to="/login" className="subrayado">
                            Inicia sesión
                        </Link>
                    </p>
                </main>
            </div>
        </>
    );
}

export default SignUp;

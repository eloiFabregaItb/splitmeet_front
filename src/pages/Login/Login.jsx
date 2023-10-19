import "./Login.css";
import logo from "../../assets/icons/logo.svg";
import user from "../../assets/icons/user.svg";
import google from "../../assets/icons/google.svg";
import facebook from "../../assets/icons/facebook.svg";
import candado from "../../assets/icons/password.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showEmailError, setShowEmailError] = useState(false);
    const [showDataError, setShowDataError] = useState(false);

    /*
    Function that checks if the email inputed has an email structure.
    If it doesn't have an email structure, it shows an errorMsg (showEmailError = true) and returns true.
    If it has an email structure, it doesn't show an errorMsg (showEmailError = false) and returns false.
    */
    const checkEmailError = () => {
        const expresionRegular =
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!expresionRegular.test(email)) {
            setShowEmailError(true);
            return true;
        }
        setShowEmailError(false);
        return false;
    };

    /*
    Function that sends the email and password to the server for checking if those parameters are both correct in the database.
    */
    const checkData = () => {};

    /*
    Function that checks the email structure and sends the email and password to the server.
    */
    const onSubmit = (e) => {
        e.preventDefault();
        //If the email has the proper structure, then the email and password is sent to the server.
        if (!checkEmailError()) {
            checkData();
        }
    };

    return (
        <>
            <div className='contenedor'>
                <main className='login'>
                    <img
                        className='login_logo'
                        src={logo}
                        alt='Logo de Splitmeet'
                    />
                    <h1 className='login_titulo'>SplitMeet</h1>

                    <form noValidate onSubmit={onSubmit} className='login_form'>
                        <div className='login_form_inputContainer'>
                            <img
                                src={user}
                                alt='Logo de usuario'
                                className='login_form_logo'
                            />
                            <input
                                className='login_form_input'
                                type='email'
                                placeholder='Email'
                                name='email'
                                id='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className='login_form_inputContainer'>
                            <img
                                src={candado}
                                alt='Logo de un candado/password'
                                className='login_form_logo'
                            />
                            <input
                                className='login_form_input'
                                type='password'
                                placeholder='Contraseña'
                                name='password'
                                id='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {showEmailError ? (
                            <span className='error'>
                                Email con formato incorrecto
                            </span>
                        ) : (
                            ""
                        )}

                        <button className='login_form_btn login_form_btn--login'>
                            LOGIN
                        </button>
                    </form>

                    <p className='login_mensajeRegistro'>
                        ¿No tienes una cuenta?
                        <Link to='/signup' className='subrayado'>
                            Regístrate
                        </Link>
                    </p>

                    <div className='login_buttons'>
                        <a
                            href='#'
                            className='login_form_btn login_form_btn--google'
                        >
                            <img
                                className='login_buttons_logo'
                                src={google}
                                alt='Logo de Google'
                            />
                            Continue with Google
                        </a>

                        <a
                            href='#'
                            className='login_form_btn login_form_btn--facebook'
                        >
                            <img
                                className='login_buttons_logo'
                                src={facebook}
                                alt='Logo de Facebook'
                            />
                            Continue with Facebook
                        </a>
                    </div>
                </main>
            </div>
        </>
    );
}

export default Login;

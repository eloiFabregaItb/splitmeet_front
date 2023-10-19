import "./Login.css";
import logo from "../../assets/icons/logo.svg";
import user from "../../assets/icons/user.svg";
import candado from "../../assets/icons/password.svg";

function Login() {
    return (
        <>
            <div className="contenedor">
                <main className="login">
                    <img
                        className="login_logo"
                        src={logo}
                        alt="Logo de Splitmeet"
                    />
                    <h1 className="login_titulo">SplitMeet</h1>

                    <form action="" className="login_form">
                        <div className="login_form_input">
                            <img
                                src={user}
                                alt="Logo de usuario"
                                className="login_form_logo"
                            />
                            <input
                                type="text"
                                placeholder="Email"
                                name="username"
                                id="username"
                            />
                        </div>

                        <div className="login_form_input">
                            <img
                                src={candado}
                                alt="Logo de un candado/password"
                                className="login_form_logo"
                            />
                            <input
                                type="password"
                                placeholder="Contraseña"
                                name="password"
                                id="password"
                            />
                        </div>

                        <button className="login_form_btn--login">LOGIN</button>
                    </form>
                </main>
            </div>
        </>
    );
}

export default Login;

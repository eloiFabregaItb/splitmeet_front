//import user from "../../assets/icons/user.svg";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/icons/logo.svg";
import ico_burger from "../../assets/icons/burger.svg";
import ico_x from "../../assets/icons/x.svg";

import { useLoginDataContext } from "../../contexts/LoginDataContext";
import { api_url } from "../../utils/constants";
import "./Header.css";
import "./Navbar.css";
import { useEffect, useRef, useState } from "react";

function Header() {
  const { logoutContext, nombre, fotoPerfil, isLoggedIn } =
    useLoginDataContext();
  const navigate = useNavigate();
  const navbarRef = useRef();

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log(
        "OPEN NAVBAR",
        navbarRef.current && !navbarRef.current.contains(event.target)
      );

      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target) &&
        isNavbarOpen
      ) {
        setIsNavbarOpen(false);
      }
    };

    // Add event listener to the document
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function handleOpenNavbar(e) {
    e.stopPropagation();
    e.preventDefault();
    setIsNavbarOpen(true);
  }

  function handleLogout(e) {
    e.preventDefault();
    logoutContext();
    navigate("/");
  }

  function handleClickNav() {
    setIsNavbarOpen(false);
  }

  return (
    <>
      <header className="header">
        <button onClick={handleOpenNavbar} className="buttonActionIco">
          <img src={ico_burger} alt="" />
        </button>

        <div className="header_logo">
          <h1 className="header_splitmeet">Splitmeet</h1>
          <img className="logo" src={logo} alt="Logo de SplitMeet" />
        </div>

        {isLoggedIn && (
          <div className="header_userInfo">
            <p className="header_userInfo_username">{nombre}</p>
            <img
              className="header_userInfo_img"
              src={`${api_url}/public/usrProfilePic/${fotoPerfil}`}
              alt={`Icono del usuario ${nombre}`}
            />
          </div>
        )}
      </header>

      {isNavbarOpen && (
        <>
          <aside className="Navbar" ref={navbarRef}>
            <button
              onClick={() => setIsNavbarOpen(false)}
              className="buttonActionIco"
            >
              <img src={ico_x} alt="" />
            </button>
            <nav>
              {isLoggedIn ? (
                <ul>
                  <li>
                    <Link onClick={handleClickNav} to="/">
                      Home
                    </Link>
                  </li>
                  <li>
                    <a href="#" onClick={handleLogout}>
                      Logout
                    </a>
                  </li>
                  <li>
                    <Link onClick={handleClickNav} to="/home">
                      Dashboard
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul>
                  <li>
                    <Link onClick={handleClickNav} to="/">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link onClick={handleClickNav} to="/login">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link onClick={handleClickNav} to="/signup">
                      Sign-Up
                    </Link>
                  </li>
                </ul>
              )}
            </nav>
          </aside>
        </>
      )}
    </>
  );
}

export default Header;

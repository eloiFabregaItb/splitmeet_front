//styles
import "./Header.css";
import "./Navbar.css";

//lib
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//icons
import logo from "../../assets/icons/logo.svg";
import ico_burger from "../../assets/icons/burger.svg";
import ico_x from "../../assets/icons/x.svg";
import ico_back from "../../assets/icons/back--arrow--black.svg"

//constants & context
import { useLoginDataContext } from "../../contexts/LoginDataContext";

import icoLogout from "../../assets/icons/logout.svg"
import { UserImage } from "../UserImage/UserImage";

function Header({ nameEvent,children, back }) {
  const userInfo = useLoginDataContext();
  const { logoutContext, nombre, fotoPerfil, isLoggedIn } = userInfo
  const navigate = useNavigate();
  const navbarRef = useRef();

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
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
        <div className="left">
          {
            !isLoggedIn &&
            <button onClick={handleOpenNavbar} className="buttonActionIco">
              <img src={ico_burger} alt="Icono del menú" />
            </button>
          }
          {
            back &&
            <Link to={back} className="back">
              <img src={ico_back}/>
            </Link>
          }
        </div>

        <div className="header_logo">
          <h1 className="header_splitmeet">
            {nameEvent ? nameEvent : "SplitMeet"}
          </h1>
          {!nameEvent && (
            <img className="logo" src={logo} alt="Logo de SplitMeet" />
          )}
        </div>


        <div className="header__nav">

            {
              children
            }
        </div>

        <div className="right">
          {isLoggedIn && (
            <div className="header_userInfo">
              <p className="header_userInfo_username">{nombre}</p>
              <UserImage test userInfo={userInfo} />
              <nav className="header__userMenu">
                <ul>
                  <li>
                    <a href="#" onClick={handleLogout}>
                      <img src={icoLogout} alt="" />
                      Logout
                    </a>
                  </li>

                  {/* <hr /> */}
                </ul>
              </nav>
            </div>
          )}
        </div>
      </header>

      {(isNavbarOpen && !isLoggedIn) && (
        <>
          <aside className="Navbar" ref={navbarRef}>
            <button
              onClick={() => setIsNavbarOpen(false)}
              className="buttonActionIco"
            >
              <img src={ico_x} alt="Icono de una cruz" />
            </button>
            <nav>
              <ul>
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
            </nav>
          </aside>
        </>
      )}
    </>
  );
}

export default Header;

import user from "../../assets/icons/user.svg";
import logo from "../../assets/icons/logo.svg";
import "./Header.css";

function Header({ userImg, username }) {
  return (
    <header className="header">
      <div className="header_userInfo">
        <img
          className="header_userInfo_img"
          src={user}
          alt={`Icono del usuario ${username}`}
        />
        <p className="header_userInfo_username">{username}</p>
      </div>
      <div className="header_logo">
        <h1 className="header_splitmeet">Splitmeet</h1>
        <img className="logo" src={logo} alt="Logo de SplitMeet" />
      </div>
    </header>
  );
}

export default Header;

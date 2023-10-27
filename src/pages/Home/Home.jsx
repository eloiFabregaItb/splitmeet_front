import { useState, useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { checkLoginJwt } from "../../services/checkLoginJwt";
import Loader from "../../globalComponents/Loader/Loader";

function Home() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (!localStorage.getItem("jwt")) {
      //navigate("/login");
      return;
    }
    const res = checkLoginJwt(localStorage.getItem("jwt"));
    console.log(res);
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <header>
            <div>
              <img src="" alt={`Icono del usuario ${userData.usr_name}`} />
              <p></p>
            </div>
          </header>
          <main>
            <section></section>
            <section></section>
            <section></section>
          </main>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Home;

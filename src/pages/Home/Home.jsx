import { useState, useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { checkLoginJwt } from "../../services/checkLoginJwt";
import { getEvents } from "../../services/getEvents";
import Loader from "../../globalComponents/Loader/Loader";
import Header from "../../globalComponents/Header/Header";
import user from "../../assets/icons/user.svg";

function Home() {
  const initialData = {
    name: "Oriol",
  };

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(initialData);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const checkLogin = async () => {
      const resUserInfo = await checkLoginJwt(localStorage.getItem("jwt"));
      if (resUserInfo.success) {
        setUserData(resUserInfo);
        const resEventsInfo = await getEvents(localStorage.getItem("jwt"));
        if (resEventsInfo.success) {
          setEvents(resEventsInfo.events);
          setLoading(false);
          return;
        }
        return;
      }
      navigate("/login");
    };

    if (!localStorage.getItem("jwt")) {
      navigate("/login");
      return;
    }
    checkLogin();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <Header img={user} username={userData.name} />
          <main className="background home-container">
            <section>
              <h2>Eventos</h2>
              <div></div>
            </section>
            <section>
              <h2>Saldo</h2>
              <div></div>
            </section>
            <section>
              <h2>Últimas transacciones</h2>
              <div></div>
            </section>
          </main>
        </>
      ) : (
        <main className="loader-container">
          <Loader />
        </main>
      )}
    </>
  );
}

export default Home;

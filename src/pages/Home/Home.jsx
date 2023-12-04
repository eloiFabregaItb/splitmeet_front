import { useState, useEffect } from "react";
import "./Home.css";
import { getEvents } from "../../services/getEvents";
import Loader from "../../globalComponents/Loader/Loader";
import Button from "../../globalComponents/Button";
import Header from "../../globalComponents/Header/Header";
import Event from "./components/Event/Event";
import { useLoginDataContext } from "../../contexts/LoginDataContext";
import { Link } from "react-router-dom";

function Home() {
  const { nombre, saldo, fotoPerfil, isLoggedIn, jwt } = useLoginDataContext();

  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const checkLogin = async () => {
      if (isLoggedIn) {
        const resEventsInfo = await getEvents(jwt);
        if (resEventsInfo.success) {
          setEvents(resEventsInfo.events);
          setLoading(false);
          return;
        }
        return;
      }
    };

    checkLogin();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <Header></Header>
          <main className="background home-container">
            <section className="home-container_section">
              <h2 className="home-container_title">Events</h2>
              <div className="home-container_events">
                <div className="home-container_info">
                  {events.map((event) => (
                    <Event eventInfo={event} key={event.id} />
                  ))}
                </div>
                <Link to="/new">
                  <Button text="NEW EVENT" />
                </Link>
              </div>
            </section>

            <section className="home-container_section">
              <h2 className="home-container_title">Balance</h2>
              <div className="home-container_events home-container_saldo">
                <p className={`balance ${saldo >= 0 ? "green" : "red"}`}>
                  {saldo}€
                </p>
              </div>
            </section>

            <section className="home-container_section">
              <h2 className="home-container_title">Last transactions</h2>
              <div className="home-container_events"></div>
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

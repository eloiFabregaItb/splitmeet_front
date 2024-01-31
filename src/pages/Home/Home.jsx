import { useState, useEffect } from "react";
import "./Home.css";
import { getEvents } from "../../services/getEvents";
import Loader from "../../globalComponents/Loader/Loader";
import Button from "../../globalComponents/Button";
import Header from "../../globalComponents/Header/Header";
import EventCard from "./components/Event/Event";
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
          <main className="home-container">

            <div className="scroller">

              <section className="home-container_section balance">
                {/* <h2 className="home-container_title">Balance</h2> */}
                <div className="home-container_events home-container_saldo">
                  <p className={`balance ${saldo >= 0 ? "green" : "red"}`}>
                    {saldo}€
                  </p>
                </div>
              </section>

              <section className="home-container_section events">
                {/* <h2 className="home-container_title">Events</h2> */}
                <div className="home-container_events">
                  <div className="home-container_info">
                    {events.map((event) => (
                      <EventCard eventInfo={event} key={event.id} />
                    ))}
                  </div>
                    {/* <Link to="/new">
                      <Button text="NEW EVENT" />
                    </Link> */}
                </div>
              </section>



              <section className="home-container_section transactions">
                {/* <h2 className="home-container_title">Last transactions</h2> */}
                <div className="home-container_events">
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                    <p>last transaction</p>
                </div>
              </section>

            </div>

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

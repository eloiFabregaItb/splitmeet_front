import { useState, useEffect } from "react";
import "./Home.css";
import { getEvents } from "../../services/getEvents";
import Loader from "../../globalComponents/Loader/Loader";
import Header from "../../globalComponents/Header/Header";
import Button from "../../globalComponents/Button";
import Event from "./components/Event/Event";
import { Link } from "react-router-dom";
//import user from "../../assets/icons/user.svg";
import { useLoginDataContext } from "../../contexts/LoginDataContext";

function Home() {
  const { nombre, fotoPerfil, isLoggedIn, jwt } = useLoginDataContext();

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
          <Header img={fotoPerfil} username={nombre} />
          <main className='background home-container'>
            <section className='home-container_section'>
              <h2>Eventos</h2>
              <div className='home-container_events'>
                <div className='home-container_info'>
                  {events.map((event) => (
                    <Event eventInfo={event} key={event.id} />
                  ))}
                </div>
                <Link to='/new'>
                  <Button text='NEW GROUP' />
                </Link>
              </div>
            </section>
            <section className='home-container_section'>
              <h2>Saldo</h2>
              <div className='home-container_info'></div>
            </section>
            <section className='home-container_section'>
              <h2>Últimas transacciones</h2>
              <div className='home-container_info'></div>
            </section>
          </main>
        </>
      ) : (
        <main className='loader-container'>
          <Loader />
        </main>
      )}
    </>
  );
}

export default Home;

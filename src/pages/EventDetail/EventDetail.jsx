import { useState, useEffect } from "react";
import { api_url } from "../../utils/constants";
import "./EventDetail.css";
import users from "../../assets/icons/users.svg";
import calendar from "../../assets/icons/calendar.svg";
import settings from "../../assets/icons/settings.svg";
import { getEventInfo } from "../../services/getEventInfo";
import Loader from "../../globalComponents/Loader/Loader";
import Header from "../../globalComponents/Header/Header";
import Expense from "./components/Expense";
import Button from "../../globalComponents/Button";
import { useLoginDataContext } from "../../contexts/LoginDataContext";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function EventDetail() {
  const params = useParams();

  const { nombre, saldo, fotoPerfil, isLoggedIn, jwt } = useLoginDataContext();

  const [loading, setLoading] = useState(true);
  const [eventInfo, setEventInfo] = useState({});

  useEffect(() => {
    const fetchInfo = async () => {
      if (isLoggedIn) {
        const resEventsInfo = await getEventInfo(jwt, params.url);
        if (resEventsInfo.success) {
          setEventInfo(resEventsInfo);
          setLoading(false);
          console.log(resEventsInfo);
          return;
        }
        return;
      }
    };

    fetchInfo();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <Header nameEvent={eventInfo.event.name}></Header>
          <main className="background home-container">
            <aside className="home-container_aside">
              <Link to={"users"}>
                <img
                  className="home-container_aside_icon"
                  src={users}
                  alt="Users icon"
                />
              </Link>
              <Link to={"calendar"}>
                <img
                  className="home-container_aside_icon"
                  src={calendar}
                  alt="Calendar icon"
                />
              </Link>
              <Link to={"settings"}>
                <img
                  className="home-container_aside_icon"
                  src={settings}
                  alt="Settings icon"
                />
              </Link>
            </aside>
            <section className="home-container_section home-container_section--detail">
              <h2 className="home-container_title">Expenses</h2>
              <div className="home-container_events">
                <div className="home-container_info">
                  {eventInfo.expenses.map((expense) => (
                    <Expense expenseInfo={expense} key={expense.id} />
                  ))}
                </div>
                <Link to="expense">
                  <Button text="NEW EXPENSE" />
                </Link>
              </div>
            </section>

            <section className="home-container_section home-container_section--detail">
              <img
                className="home-container_section--detail_event-img"
                src={`${api_url}/public/evtPic/${eventInfo.event.imgUrl}`}
                alt={`Imagen del evento ${eventInfo.event.imgUrl}`}
              />
              <article>
                <h2 className="home-container_title">Balance</h2>
                <div className="home-container_events home-container_saldo">
                  <p className={`balance ${saldo >= 0 ? "green" : "red"}`}>
                    {saldo}€
                  </p>
                </div>
              </article>
            </section>

            <section className="home-container_section home-container_section--detail">
              <h2 className="home-container_title">Chat</h2>
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

export default EventDetail;

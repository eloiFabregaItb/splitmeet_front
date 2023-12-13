import { useState, useEffect } from "react";
import { api_url } from "../../utils/constants";
import "./EventDetail.css";
import users from "../../assets/icons/users.svg";
import calendar from "../../assets/icons/calendar.svg";
import settings from "../../assets/icons/settings.svg";
import exit from "../../assets/icons/exit.svg";
import home from "../../assets/icons/home.svg";
import { getEventInfo } from "../../services/getEventInfo";
import { exitFromEvent } from "../../services/exitFromEvent";
import Loader from "../../globalComponents/Loader/Loader";
import Header from "../../globalComponents/Header/Header";
import Expense from "./components/Expense/Expense";
import Button from "../../globalComponents/Button";
import { useLoginDataContext } from "../../contexts/LoginDataContext";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ExpenseTransactions from "./components/ExpenseTransactions/ExpenseTransactions";

function EventDetail() {
  const params = useParams();
  const navigate = useNavigate();

  const {
    nombre,
    saldo,
    fotoPerfil,
    isLoggedIn,
    jwt,
    logoutContext,
    setEventInfo,
    eventInfo,
  } = useLoginDataContext();

  const [loading, setLoading] = useState(true);
  //const [eventInfo, setEventInfo] = useState({});
  const [showExpenses, setShowExpenses] = useState(true);
  const [currentExpense, setCurrentExpense] = useState({});
  const [showUsers, setShowUsers] = useState(false);

  //TODO -> Ordenar las expenses por fecha
  //TODO -> Crear desplegable para filtrar las expenses según usuarios
  useEffect(() => {
    const fetchInfo = async () => {
      if (isLoggedIn) {
        const resEventsInfo = await getEventInfo(jwt, params.url);
        if (resEventsInfo.success) {
          setEventInfo(resEventsInfo);
          setLoading(false);
          return;
        }
        return;
      }
    };

    fetchInfo();
  }, []);

  const exitEvent = async () => {
    const resExitEvent = await exitFromEvent(jwt, params.url);
    if (resExitEvent.success) {
      navigate("/home");
      return;
    }
    return;
  };

  const clickHome = () => {
    setShowExpenses(true);
    setShowUsers(false);
  };

  const clickUsers = () => {
    setShowExpenses(false);
    setShowUsers(true);
  };

  return (
    <>
      {!loading ? (
        <>
          <Header nameEvent={eventInfo.event.name}></Header>
          <main className="background home-container">
            <aside className="home-container_aside">
              <img
                className="home-container_aside_icon"
                src={home}
                alt="Users icon"
                onClick={clickHome}
              />
              <img
                className="home-container_aside_icon"
                src={users}
                alt="Users icon"
                onClick={clickUsers}
              />
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
              <img
                onClick={exitEvent}
                className="home-container_aside_icon"
                src={exit}
                alt="Exit icon"
              />
            </aside>
            <section className="home-container_section home-container_section--detail">
              <h2 className="home-container_title">
                {showUsers
                  ? "Users"
                  : showExpenses
                  ? "Expenses"
                  : "Transactions"}
              </h2>
              {showExpenses ? (
                <div className="home-container_events">
                  <div className="home-container_info">
                    {eventInfo.expenses.map((expense) => (
                      <Expense
                        setShowExpenses={setShowExpenses}
                        setCurrentExpense={setCurrentExpense}
                        expenseInfo={expense}
                        key={expense.exp_id}
                      />
                    ))}
                  </div>
                  <Link to="expense">
                    <Button text="NEW EXPENSE" />
                  </Link>
                </div>
              ) : (
                <ExpenseTransactions
                  setShowExpenses={setShowExpenses}
                  expense={currentExpense}
                />
              )}
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

//styles
import './EventDetail.css'

//lib
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'

//constants & context
import { useLoginDataContext } from '../../contexts/LoginDataContext'

//icons
import icoConfig from '../../assets/icons/config.svg'
import IcoBack from "../../assets/icons/back--arrow.svg"
import icoAddMoney from "../../assets/icons/addMoney.svg"
import icoAddUser from "../../assets/icons/add-user.svg"

//components
import Loader from '../../globalComponents/Loader/Loader'
import Header from '../../globalComponents/Header/Header'
import Expense from './components/Expense/Expense'
import Debts from './components/Debts/Debts'
import Button from '../../globalComponents/Button'
import ExpenseTransactions from './components/ExpenseTransactions/ExpenseTransactions'
import User from './components/Users/User'

//api
import { getEventInfo } from '../../services/getEventInfo'
import { exitFromEvent, fireFromEvent } from '../../services/exitFromEvent'
import { TextModal } from '../../globalComponents/TextModal/TextModal'



const PAGES = {
  EXPENSES: "expenses",
  CONFIG: "config"
}


function EventDetail() {
  const params = useParams()
  const navigate = useNavigate()


  const {
    nombre,
    saldo,
    fotoPerfil,
    isLoggedIn,
    jwt,
    logoutContext,
    setEventInfo,
    eventInfo,
    codUsuario,
    email
  } = useLoginDataContext()

  const [loading, setLoading] = useState(true)
  //const [eventInfo, setEventInfo] = useState({});
  const [expenseSelected, setExpenseSelected] = useState(null)
  const [page, setPage] = useState(PAGES.EXPENSES)


  const IS_CREATOR = codUsuario === eventInfo?.event?.creator?.id

  const [askExitModal, setAskExitModal] = useState(false)


  //TODO -> Ordenar las expenses por fecha
  //TODO -> Crear desplegable para filtrar las expenses según usuarios
  useEffect(() => {
    const fetchInfo = async () => {


      if (isLoggedIn) {
        const resEventsInfo = await getEventInfo(jwt, params.url)
        if (resEventsInfo.success) {
          setEventInfo(resEventsInfo)
          setLoading(false)
          return
        }
        return
      }
    }
    fetchInfo()
  }, [])



  const handleExitEvent = async () => {
    const resExitEvent = await exitFromEvent(jwt, params.url)
    if (resExitEvent.success) {
      navigate('/')
      return
    }
    return
  }



  function handleBack() {
    if (page !== PAGES.EXPENSES) {
      setPage(PAGES.EXPENSES)
    } else {
      navigate("/")
    }
  }

  function handleConfig() {
    if (page === PAGES.CONFIG) {
      setPage(PAGES.EXPENSES)
    } else {
      setPage(PAGES.CONFIG)
    }
  }


  const calculateDebts = () => {
    const debts = [];
    const balanceMatrix = eventInfo.event.expenses.balance;
    const user = eventInfo.users.findIndex(usr => usr.mail === email)

    for (let i = 0; i < balanceMatrix.length; i++) {
      for (let j = 0; j < balanceMatrix[i].length; j++) {
        if (i !== j && balanceMatrix[i][j] !== 0 && i === user) {
          const creditor = eventInfo.users[i].name;
          const debtor = eventInfo.users[j].name;
          const amount = balanceMatrix[i][j];
          debts.push({ creditor, debtor, amount });
        }
      }
    }

    return debts;
  };



  const handleFire = async (userInfo) => {
    const {success,users} = await fireFromEvent(jwt, params.url,userInfo.id)
    if(success){
      setEventInfo(prev=>{
        prev.users = users
        return prev
      })
    }
  }


  if (loading) return (<>
    <main className='loader-container'>
      <Loader />
    </main>
  </>)

  return (
    <>
      {
        askExitModal &&
        <TextModal
          title="Alert"
          cancelar={() => setAskExitModal(false)}
          aceptar={handleExitEvent}
          aceptarRed
        >Estas seguro que quieres salir del evento?</TextModal>
      }

      <nav className='absoluteButton'>
        <Link to={`/newExpense/${params.url}`}>
          <img
            className='home-container_aside_icon'
            src={icoAddMoney}
            alt='Calendar icon'
          />
        </Link>
      </nav>

      <div className='EventDetail'>
        <main className='EventDetail__content'>

          <header className={'EventDetail__header' + (page === PAGES.CONFIG ? " small" : "")} style={{ background: `linear-gradient(#0004, #0009), url(${eventInfo.event.imgUrl})` }}>
            <button className='back' onClick={handleBack}><img src={IcoBack} alt="" /></button>

            <h1>{eventInfo.event.name}</h1>
            <button className='config' onClick={handleConfig}><img src={icoConfig} alt="" /></button>

            <div style={{ overflow: "hidden", position: "absolute", bottom: "-5px", width: "100%" }}>
              <svg
                preserveAspectRatio="none"
                viewBox="0 0 1200 120"
                xmlns="http://www.w3.org/2000/svg"
                style={{ fill: '#FAFAFA', width: '100%', height: 17, transform: 'rotate(180deg)' }}
              >
                <path d="M321.39 56.44c58-10.79 114.16-30.13 172-41.86 82.39-16.72 168.19-17.73 250.45-.39C823.78 31 906.67 72 985.66 92.83c70.05 18.48 146.53 26.09 214.34 3V0H0v27.35a600.21 600.21 0 00321.39 29.09z" />
              </svg>
            </div>

          </header>

          <main className='home-container'>

            {(page === PAGES.EXPENSES && !expenseSelected) &&
              <>




                <section>
                  <h2 className='home-container_title'>Debts</h2>
                  <div className='home-container_events'>
                    {calculateDebts().map((debt, index) => (
                      <Debts key={index} creditor={debt.creditor} debtor={debt.debtor} amount={debt.amount} users={eventInfo.users} />
                    ))}
                  </div>
                </section>


                {/* [
  [0,-5,-6],
  [5,0,7],
  [6,-7,0]
]

user0 -(5$)-> user1
user0 -(6$)-> user2
user2 -(7$)-> user1

user0 -(11$)-> user2
user2 -(12$)-> user1

user0 -(11$)-> user1
user2 -(1$)-> user1 */}


                <section>
                  <h2 className='home-container_title'>Expenses</h2>
                  <div className='home-container_events'>
                    {eventInfo.expenses.map((expense) => (
                      <Expense
                        onClick={setExpenseSelected}
                        expenseInfo={expense}
                        key={expense.exp_id}
                      />
                    ))}
                  </div>
                </section>
              </>
            }

            {
              (page === PAGES.EXPENSES && expenseSelected) &&
              <>
                <h2 className='home-container_title'>Expenses</h2>
                <ExpenseTransactions
                  users={eventInfo.users}
                  onClickBack={() => setExpenseSelected(null)}
                  expense={expenseSelected}
                />
              </>

            }

            {
              page === PAGES.CONFIG &&
              <>

                <section className='home-container_events'>
                  <div className='home-container_info'>
                    <Link to={`/invitation/${eventInfo.event.url}`} className='user'>
                      <img
                        className='home-container_aside_icon'
                        src={icoAddUser}
                        alt='Calendar icon'
                      />
                      <p>Add user to the group</p>
                    </Link>
                    {eventInfo.users.map(
                      (userInfo) =>
                        userInfo.active === 1 && (
                          <User userInfo={userInfo} key={userInfo.usr_id}
                            onFire={ (IS_CREATOR && userInfo.id !== codUsuario ) ? handleFire : undefined}
                          />
                        )
                    )}

                  </div>
                </section>
                <hr />
                <Button text="Salir del evento" onClick={() => setAskExitModal(true)} red />
              </>
            }


          </main>


        </main>

      </div>

    </>

  )
}

export default EventDetail

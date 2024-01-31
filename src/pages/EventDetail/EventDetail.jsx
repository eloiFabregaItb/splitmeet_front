import { useState, useEffect } from 'react'
import { api_url } from '../../utils/constants'
import './EventDetail.css'
import icoUsers from '../../assets/icons/users.svg'
import calendar from '../../assets/icons/calendar.svg'
import settings from '../../assets/icons/settings.svg'
import exit from '../../assets/icons/exit.svg'
import icoHome from '../../assets/icons/home.svg'
import { getEventInfo } from '../../services/getEventInfo'
import { exitFromEvent } from '../../services/exitFromEvent'
import Loader from '../../globalComponents/Loader/Loader'
import Header from '../../globalComponents/Header/Header'
import Expense from './components/Expense/Expense'
import Button from '../../globalComponents/Button'
import { useLoginDataContext } from '../../contexts/LoginDataContext'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import ExpenseTransactions from './components/ExpenseTransactions/ExpenseTransactions'
import User from './components/Users/User'
import IcoBack from "../../assets/icons/back--arrow.svg"

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
  } = useLoginDataContext()

  const [loading, setLoading] = useState(true)
  //const [eventInfo, setEventInfo] = useState({});
  const [expenseSelected, setExpenseSelected] = useState(null)
  const [page,setPage] = useState(0) // 0-users 1-expenses


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

  const icoExitEvent = async () => {
    const resExitEvent = await exitFromEvent(jwt, params.url)
    if (resExitEvent.success) {
      navigate('/')
      return
    }
    return
  }


  if(loading) return (<>
    <main className='loader-container'>
      <Loader />
    </main>
  </>)

  return (
    <>
      <div className='EventDetail'>
        <main className='EventDetail__content'>
          <header className='EventDetail__header' style={{background:`linear-gradient(#0004, #0009), url(${api_url}/public/evtPic/${eventInfo.event.imgUrl})`}}>
            <Link to="/" className='back'><img src={IcoBack} alt="" /></Link>
            <h1>{eventInfo.event.name}</h1>
          </header>


          <section className='home-container_section home-container_section--detail'>

            <article>
              <h2 className='home-container_title'>Balance</h2>
              <div className='home-container_events home-container_saldo'>
                <p className={`balance ${saldo >= 0 ? 'green' : 'red'}`}>
                  {saldo}€
                </p>
              </div>
            </article>
          </section>

          

          <section className='home-container_section home-container_section--detail'>
            


            {page===1&&
              <>
                <h2 className='home-container_title'>Users</h2>
                <div className='home-container_events'>
                  <div className='home-container_info'>
                    {eventInfo.users.map(
                      (userInfo) =>
                        userInfo.active === 1 && (
                          <User userInfo={userInfo} key={userInfo.usr_id} />
                        )
                    )}
                  </div>
                  <Link to={`/invitation/${eventInfo.event.url}`}>
                    <Button text='INVITE USERS' />
                  </Link>
                </div>
              </>
            }
            {(page===0 && !expenseSelected)&&
              <>
                <h2 className='home-container_title'>Expenses</h2>
                <div className='home-container_events'>
                  <div className='home-container_info'>
                    {eventInfo.expenses.map((expense) => (
                      <Expense
                        onClick={setExpenseSelected}
                        expenseInfo={expense}
                        key={expense.exp_id}
                      />
                    ))}
                  </div>
                  <Link to={`/newExpense/${params.url}`}>
                    <Button text='NEW EXPENSE'/>
                  </Link>
                </div>
              </>
            }

            {
              (page===0 && expenseSelected) &&
              <>
                <h2 className='home-container_title'>Expenses</h2>
                <ExpenseTransactions
                  onClickBack={()=>setExpenseSelected(null)}
                  expense={expenseSelected}
                />
              </>

            }
            
          </section>


        </main>

        


      <nav className='home-container_aside'>
          <img
            className='home-container_aside_icon'
            src={icoHome}
            alt='Users icon'
            onClick={()=>setPage(0)}
          />
          <img
            className='home-container_aside_icon'
            src={icoUsers}
            alt='Users icon'
            onClick={()=>setPage(1)}
          />
          {/* <Link to={'calendar'}>
            <img
              className='home-container_aside_icon'
              src={calendar}
              alt='Calendar icon'
            />
          </Link> */}
          
          <Link to={'settings'}>
            <img
              className='home-container_aside_icon'
              src={settings}
              alt='Settings icon'
            />
          </Link>
          <img
            onClick={icoExitEvent}
            className='home-container_aside_icon'
            src={exit}
            alt='Exit icon'
          />
        </nav>
      </div>

    </>

  )
}

export default EventDetail

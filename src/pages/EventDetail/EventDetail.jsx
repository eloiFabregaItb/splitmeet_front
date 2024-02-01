//styles
import './EventDetail.css'

//lib
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'

//constants & context
import { api_url } from '../../utils/constants'
import { useLoginDataContext } from '../../contexts/LoginDataContext'

//icons
import icoUsers from '../../assets/icons/users.svg'
import IcoBack from "../../assets/icons/back--arrow.svg"
import icoCalendar from '../../assets/icons/calendar.svg'
import icoSettings from '../../assets/icons/settings.svg'
import exit from '../../assets/icons/exit.svg'
import icoHome from '../../assets/icons/home.svg'
import icoAddMoney from "../../assets/icons/addMoney.svg"
import icoAddUser from "../../assets/icons/add-user.svg"

//components
import Loader from '../../globalComponents/Loader/Loader'
import Header from '../../globalComponents/Header/Header'
import Expense from './components/Expense/Expense'
import Button from '../../globalComponents/Button'
import ExpenseTransactions from './components/ExpenseTransactions/ExpenseTransactions'
import User from './components/Users/User'

//api
import { getEventInfo } from '../../services/getEventInfo'
import { exitFromEvent } from '../../services/exitFromEvent'
import { TextModal } from '../../globalComponents/TextModal/TextModal'



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
  const PAGES = ["Expenses","Users","Config"]

  const [askExitModal,setAskExitModal] = useState(false)


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


  if(loading) return (<>
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
      cancelar={()=>setAskExitModal(false)}
      aceptar={handleExitEvent}
      aceptarRed
      >Estas seguro que quieres salir del evento?</TextModal>
    }
      <Header>

      {
          page === 0 &&
          <>
            <Link to={`/newExpense/${params.url}`}>
              <img
                className='home-container_aside_icon'
                src={icoAddMoney}
                alt='Calendar icon'
              />
            </Link>     
          </>
        }

        {
          page === 1 &&
          <>
            <Link to={`/invitation/${eventInfo.event.url}`}>
              <img
                className='home-container_aside_icon'
                src={icoAddUser}
                alt='Calendar icon'
              />
            </Link>  
          </>
        }

      </Header>

      <div className='EventDetail'>
        <main className='EventDetail__content'>

          <header className='EventDetail__header' style={{background:`linear-gradient(#0004, #0009), url(${api_url}/public/evtPic/${eventInfo.event.imgUrl})`}}>
            <Link to="/" className='back'><img src={IcoBack} alt="" /></Link>
            <h1>{eventInfo.event.name}</h1>
          </header>
          <nav className='EventDetail__navPages'>
            <ul>
              {
                PAGES.map((x,i)=>
                  <li key={i} className={page===i?"active":""} onClick={()=>setPage(i)}>{x}</li>
                )
              }
            </ul>
          </nav>

          <section className='home-container_section home-container_section--detail'>
            
          {(page===0 && !expenseSelected)&&
              <>
                <article>
                  <h2 className='home-container_title'>Balance</h2>
                  <div className='home-container_events home-container_saldo'>
                    <p className={`balance ${saldo >= 0 ? 'green' : 'red'}`}>
                      {saldo}€
                    </p>
                  </div>
                </article>

                <article>
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
                </div>
                </article>
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
                </div>
              </>
            }

            {
              page===2 &&
              <>
                <Button text="Salir del evento" onClick={()=>setAskExitModal(true)} red/>
              </>
            }

            
          </section>


        </main>

        

{/* 
      <nav className='home-container_aside'>
          
        </nav> */}
      </div>

    </>

  )
}

export default EventDetail

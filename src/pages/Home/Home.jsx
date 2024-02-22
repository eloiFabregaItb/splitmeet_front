//styles
import './Home.css'

//lib
import { useState, useEffect } from 'react'

//api
import { getEvents } from '../../services/getEvents'

//components
import Loader from '../../globalComponents/Loader/Loader'
import Header from '../../globalComponents/Header/Header'
import EventCard from './components/Event/Event'
import { Link } from 'react-router-dom'
//icons
import ico_more from '../../assets/icons/add.svg'
import ico_more_1 from '../../assets/icons/add_1.svg'

//constants & context
import { useLoginDataContext } from '../../contexts/LoginDataContext'

function Home() {
  const { nombre, saldo, fotoPerfil, isLoggedIn, jwt } = useLoginDataContext()

  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState([])

  useEffect(() => {
    const checkLogin = async () => {
      if (isLoggedIn) {
        const resEventsInfo = await getEvents(jwt)
        if (resEventsInfo.success) {
          setEvents(resEventsInfo.events)
          setLoading(false)
          return
        }
        return
      }
    }

    checkLogin()
  }, [])

  return (
    <>
      {!loading ? (
        <>
          <Header>
            <Link to='/new'>
              <img src={ico_more} alt='nuevo evento' />
            </Link>
          </Header>
          <main className='home-container'>
            <div className='home-container--wrapper'>
              {events.map((event) => (
                <EventCard eventInfo={event} key={event.id} />
              ))}
            </div>
          </main>
          <nav className='absoluteButton'>
            <Link className='absoluteButton_flex' to={`/new`}>
              <img
                className='home-container_aside_icon'
                src={ico_more_1}
                alt='New event'
              />
            </Link>
          </nav>
        </>
      ) : (
        <main className='loader-container'>
          <Loader />
        </main>
      )}
    </>
  )
}

export default Home

import "./Event.css";
import { Link } from "react-router-dom";
import { api_url } from "../../../../utils/constants";

function Event({ eventInfo }) {
  return (
    <Link className='router-link' to={`/event/${eventInfo.url}`}>
      <article className='event'>
        <div className='event_info'>
          <p className='event_info_name'>{eventInfo.name}</p>
          <div className='event_info_userPics'>
            {eventInfo.users.slice(0, 4).map((user, index) => (
              <img
                className='event_info_userPic'
                /* src={`${api_url}/public/usrProfilePic/${user.img}`} */
                src={`https://robohash.org/${user.name}`}
                alt={`Imagen del usuario ${user.name}`}
                key={index}
              />
            ))}
            {eventInfo.users.length > 4 && (
              <span>{`+${eventInfo.users.length - 4}`}</span>
            )}
          </div>
        </div>
        <img
          className='event_img'
          src={`${api_url}/public/evtPic/${eventInfo.imgUrl}`}
          alt={`Imagen del evento ${eventInfo.name}`}
        />
      </article>
    </Link>
  );
}

export default Event;

import "./Event.css";
import { Link } from "react-router-dom";
import { api_url } from "../../../../utils/constants";

function Event({ eventInfo }) {
  return (
    <article className="event">
      <div className="event_info">
        <Link className="router-link" to={`/event/${eventInfo.url}`}>
          <p className="event_info_name">{eventInfo.name}</p>
        </Link>
        <div className="event_info_userPics">
          {eventInfo.users.map((user, index) => (
            <img
              className="event_info_userPic"
              /* src={`${api_url}/public/usrProfilePic/${user.img}`} */
              src={`https://robohash.org/${user.name}`}
              alt={`Imagen del usuario ${user.name}`}
              key={index}
            />
          ))}
        </div>
      </div>
      <img
        className="event_img"
        src={`${api_url}/public/evtPic/${eventInfo.imgUrl}`}
        alt={`Imagen del evento ${eventInfo.name}`}
      />
    </article>
  );
}

export default Event;

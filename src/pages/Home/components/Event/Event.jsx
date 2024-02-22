import "./Event.css";
import { Link } from "react-router-dom";
import { api_url } from "../../../../utils/constants";
import { UserImage } from "../../../../globalComponents/UserImage/UserImage";

function EventCard({ eventInfo }) {
  const imgSrc = eventInfo.imgUrl;
  const styleBg =
    eventInfo.imgUrl == null ? {} : { background: `url(${imgSrc})` };

  return (
    <Link className="router-link EventCard" to={`/event/${eventInfo.url}`}>
      <article className="event">
        <div className="event_info">
          <p className="event_info_name">{eventInfo.name}</p>
          <div className="event_info_userPics">
            {eventInfo.users.slice(0, 4).map((user, index) => (
              <UserImage
                userInfo={user}
                key={index}
                className="event_info_userPic"
              />
            ))}
            {eventInfo.users.length > 4 && (
              <span>{`+${eventInfo.users.length - 4}`}</span>
            )}
          </div>
        </div>
        <div className="backgroundImage" style={styleBg} />
      </article>
    </Link>
  );
}

export default EventCard;

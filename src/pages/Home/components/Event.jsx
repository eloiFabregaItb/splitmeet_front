function Event({ eventInfo }) {
  return (
    <article className="event">
      <div className="event_info">
        <p>{eventInfo.name}</p>
        <div className="event_info_userPics">
          {eventInfo.users.map((user) => {
            <img
              src={`http://localhost:3000/public/usrProfilePic/${user.img}`}
              alt={`Imagen del usuario ${user.name}`}
            />;
          })}
        </div>
      </div>
      <img
        className="event_img"
        src={`http://localhost:3000/public/evtPic/${eventInfo.imgUrl}`}
        alt={`Imagen del evento ${eventInfo.name}`}
      />
    </article>
  );
}

export default Event;

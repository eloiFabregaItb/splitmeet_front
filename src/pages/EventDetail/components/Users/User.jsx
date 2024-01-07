import "./User.css";

function User({ userInfo }) {
  return (
    <article className='user'>
      <img
        /* src={`${api_url}/public/usrProfilePic/${userInfo.usr_img}`} */
        src={`https://robohash.org/${userInfo.usr_img}`}
        alt={`Icono del usuario ${userInfo.usr_name}`}
      />
      <p>{userInfo.usr_name}</p>
    </article>
  );
}

export default User;

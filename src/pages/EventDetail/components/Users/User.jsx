import { UserImage } from "../../../../globalComponents/UserImage/UserImage";
import "./User.css";

function User({ userInfo }) {
  return (
    <article className='user'>
      <UserImage userInfo={userInfo} />
      <p>{userInfo.name}</p>
    </article>
  );
}

export default User;

import "./UserInvitation.css";

function UserInvitation({ mail, removeInvitation }) {
  return (
    <li className='userInvitation'>
      <p>{mail}</p>
      <button
        onClick={() => removeInvitation(mail)}
        className='invitation__button invitation__crossButton'
      >
        x
      </button>
    </li>
  );
}

export default UserInvitation;

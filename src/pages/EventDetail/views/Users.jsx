import Header from "../../../globalComponents/Header/Header";
import { useLoginDataContext } from "../../../contexts/LoginDataContext";

function Users() {
  const { eventInfo } = useLoginDataContext();
  return (
    <>
      <Header nameEvent={eventInfo.event.name} />
    </>
  );
}

export default Users;

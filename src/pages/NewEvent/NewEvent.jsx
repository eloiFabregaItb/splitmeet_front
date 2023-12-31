import "./NewEvent.css";
import Header from "../../globalComponents/Header/Header";
import user from "../../assets/icons/user.svg";

import { useRef, useState } from "react";

import Button from "../../globalComponents/Button";
import { useLoginDataContext } from "../../contexts/LoginDataContext";
import { addEvent } from "../../services/addEvent";
import { uploadEventImg } from "../../services/uploadEventImg";
import { useNavigate } from "react-router-dom";

function NewEvent() {
  const initialData = {
    name: "Oriol",
  };
  const inputFileRef = useRef(null);
  const [userData] = useState(initialData);
  const { jwt } = useLoginDataContext();
  const [event_name, setName] = useState("");
  const [event_image, setImage] = useState(null);
  const [event_image64, setImage64] = useState(null);
  const [event_members, setMembers] = useState("");
  const { loginContext } = useLoginDataContext();
  const [showDataError, setShowDataError] = useState(false);
  const navigate = useNavigate();

  function handleInputFile() {
    inputFileRef.current.click();
  }

  const handleInputImg = (event) => {
    const img = event.target.files[0];
    if (!img) return;
    setImage(img);
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result;
      setImage64(base64);
    };
    reader.readAsDataURL(img);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const resAdd = await addEvent(event_name, event_image, event_members, jwt);
    if (resAdd.success) {
      setShowDataError(false);
      const resImg = await uploadEventImg(resAdd.evt_url, event_image, jwt);
      console.log(resImg);
      //loginContext(resAdd);
      //return navigate("/home");
    }
    setShowDataError(true);
    localStorage.clear();
  };
  return (
    <>
      <Header></Header>
      <div className="container">
        <main className="box">
          <p>{showDataError}</p>
          <h1 className="newevent__title">New event</h1>

          <form noValidate onSubmit={onSubmit} className="event_form">
            <div className="form-container">
              <div className="add_name">
                <label className="newevent__text" htmlFor="name">
                  Event Name
                </label>
                <div className="newevent__form_inputContainer">
                  <input
                    className="newevent__form_input"
                    type="text"
                    placeholder="event Name"
                    name="event_name"
                    id="event_name"
                    value={event_name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="add_image">
                <label className="newevent__text" htmlFor="event_image">
                  Event Image
                </label>

                <input
                  type="file"
                  ref={inputFileRef}
                  className="newevent__inputFile"
                  name="event_image"
                  id="event_image"
                  onChange={handleInputImg}
                />
                <button
                  type="button"
                  className="newevent__buttonFile"
                  onClick={handleInputFile}
                >
                  Upload Image
                </button>
              </div>
              {event_image64 && <img src={event_image64} alt="" />}
              <div className="newevent__members">
                <label className="newevent__text" htmlFor="event_members">
                  Event members
                </label>

                <textarea
                  className="newevent__form_textarea"
                  name="event_members"
                  cols="33"
                  rows="10"
                  value={event_members}
                  onChange={(e) => setMembers(e.target.value)}
                ></textarea>
              </div>

              <Button
                className="newevent_form_btn newevent_form_btn--login"
                text="SUBMIT"
              />
            </div>
          </form>
        </main>
      </div>
    </>
  );
}
export default NewEvent;

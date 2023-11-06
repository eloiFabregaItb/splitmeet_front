import "./NewGroup.css";
import Header from "../../globalComponents/Header/Header"
import user from "../../assets/icons/user.svg";

import { useState } from "react";

import Button from "../../globalComponents/Button";

function NewGroup() {
    const initialData = {
        name: "Oriol",
    };
    const [userData] = useState(initialData);

    return (
        <>
            <Header img={user} username={userData.name} />
            <div className="container">
                <main className="box" >
                    <h1 className="new_group_title">New Group</h1>

                    <form noValidate className="group_form">
                        <div className="test">
                            <label htmlFor="name">Name of the group</label>

                            <div className="new_group_form_inputContainer">
                                <input
                                    className="login_form_input"
                                    type="text"
                                    placeholder="Name"
                                    name="group_name"
                                    id="group_name"
                                />
                            </div>
                        </div>


                        <div className="new_group_form_inputContainer">

                            <input
                                className="login_form_input"
                                type="password"
                                placeholder="Contraseña"
                                name="password"
                                id="password"
                            />
                        </div>

                        <Button
                            classname="login_form_btn login_form_btn--login"
                            text="LOGIN"
                        />
                    </form>


                </main>

            </div>
        </>
    );
}
export default NewGroup;

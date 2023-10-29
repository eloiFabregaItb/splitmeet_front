import { useState, useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { checkLoginJwt } from "../../services/checkLoginJwt";
import Loader from "../../globalComponents/Loader/Loader";

function Home() {
    const initialData = {
        name: "Oriol",
    };

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(initialData);

    useEffect(() => {
        const checkLogin = async () => {
            const res = await checkLoginJwt(localStorage.getItem("jwt"));
            if (res.success) {
                setLoading(false);
                setUserData(res);
                return;
            }
            navigate("/login");
        };

        if (!localStorage.getItem("jwt")) {
            navigate("/login");
            return;
        }
        checkLogin();
    }, []);

    return (
        <>
            {!loading ? (
                <>
                    <header>
                        <div>
                            <img
                                src=''
                                alt={`Icono del usuario ${userData.name}`}
                            />
                            <p>{userData.name}</p>
                        </div>
                    </header>
                    <main>
                        <section></section>
                        <section></section>
                        <section></section>
                    </main>
                </>
            ) : (
                <Loader />
            )}
        </>
    );
}

export default Home;

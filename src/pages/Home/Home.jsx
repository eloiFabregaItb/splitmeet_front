import { useState, useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { checkLoginJwt } from "../../services/checkLoginJwt";
import Loader from "../../globalComponents/Loader/Loader";
import Header from "../../globalComponents/Header/Header";
import user from "../../assets/icons/user.svg";

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
                    <Header img={user} username={userData.name} />
                    <main className='background'>
                        <section></section>
                        <section></section>
                        <section></section>
                    </main>
                </>
            ) : (
                <main className='loader-container'>
                    <Loader />
                </main>
            )}
        </>
    );
}

export default Home;

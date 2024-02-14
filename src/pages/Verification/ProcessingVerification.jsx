import { useEffect, useState } from "react";
import { validateMail } from "../../services/ValidateMail";
import { checkLoginJwt } from "../../services/checkLoginJwt";
import { useLoginDataContext } from "../../contexts/LoginDataContext";
import Loader from "../../globalComponents/Loader/Loader";
import Header from "../../globalComponents/Header/Header";
import { useSearchParams, useNavigate } from "react-router-dom";

function ProcessingVerification() {
  const { loginContext } = useLoginDataContext();
  const params = useSearchParams();
  const navigate = useNavigate();
  const jwt = params[0].get("id");

  useEffect(() => {
    const validateEmail = async () => {
      const resValidateMail = await validateMail(jwt);
      if (resValidateMail.success) {
        //ARREGLAR ERROR TOKEN (NO SON IGUALES)
        const resCheckLogin = await checkLoginJwt(jwt);
        if (resCheckLogin.success) {
          loginContext(resCheckLogin);
          localStorage.setItem("jwt", resCheckLogin.jwt);
          return navigate("/home");
        }
        return navigate("/login");
      }
      return navigate(`/verification?jwt=${jwt}`);
    };

    validateEmail();
  }, []);

  return (
    <>
      <Header></Header>
      <Loader></Loader>
    </>
  );
}

export default ProcessingVerification;

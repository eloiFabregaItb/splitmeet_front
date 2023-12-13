import "./Expense.css";
import { api_url } from "../../../../utils/constants";

function Expense({ setShowExpenses, setCurrentExpense, expenseInfo }) {
  const handleClick = () => {
    setCurrentExpense(expenseInfo);
    setShowExpenses(false);
  };

  return (
    <article className="expense">
      <div className="expense_img-concept">
        <img
          /* src={`${api_url}/public/usrProfilePic/${expenseInfo.usr_id_lender}`} */
          src={`https://robohash.org/${expenseInfo.usr_id_lender}`}
          alt={`Icono del usuario ${expenseInfo.usr_id_lender}`}
        />
        <p onClick={handleClick}>{expenseInfo.exp_concept}</p>
      </div>
      <p
        className={`expense_amount ${
          expenseInfo.status === "RECEIVED"
            ? "expense_amount--red"
            : expenseInfo.status === "PAID"
            ? "expense_amount--green"
            : ""
        }`}
      >
        {expenseInfo.status === "NONE"
          ? "You don't participate"
          : `You ${expenseInfo.status === "PAID" ? "lent" : "owe"} ${
              expenseInfo.total
            }€`}
      </p>
    </article>
  );
}

export default Expense;

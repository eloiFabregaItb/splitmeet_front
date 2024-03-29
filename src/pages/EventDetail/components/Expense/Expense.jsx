import "./Expense.css";
import { api_url } from "../../../../utils/constants";

function Expense({ onClick, expenseInfo }) {
  const handleClick = () => {
    onClick(expenseInfo);
  };

  return (
    <article className='expense' onClick={handleClick}>
      <div className='expense_img-concept'>
        <p>{expenseInfo.exp_concept}</p>
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
          ? "You didn't participate"
          : `You ${expenseInfo.status === "PAID" ? "lent" : "owe"} ${
              expenseInfo.total
            }€`}
      </p>
    </article>
  );
}

export default Expense;

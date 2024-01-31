import "./ExpenseTransactions.css";
import back from "../../../../assets/icons/back.svg";

function ExpenseTransactions({ onClickBack, expense }) {
  return (
    <div className="expense-transactions">
      <div className="expense-transactions_info">
        <img onClick={onClickBack} src={back} alt="Icono de flecha hacia atrás" />
        <div className="expense-transactions_info_header">
          <div className="expense-transactions_info_header_title">
            <h3>{expense.exp_concept}</h3>
            <img
              src={`https://robohash.org/${expense.usr_id_lender}`}
              alt={`Imagen del usuario ${expense.usr_id_lender}`}
            />
          </div>
          <p>{expense.exp_description}</p>
          <p>{`${expense.usr_id_lender} paid ${expense.total}€`}</p>
        </div>
        <ul className="expense-transactions_info_transactions">
          {expense.transactions.map((transaction) => (
            <li
              className="expense-transactions_info_transactions_transaction"
              key={transaction.tra_id}
            >
              {`${transaction.usr_id_borrower} paid ${transaction.tra_amount}€`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ExpenseTransactions;

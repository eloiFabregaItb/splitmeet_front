import "./ExpenseTransactions.css";
import back from "../../../../assets/icons/back.svg";
import { UserImage } from "../../../../globalComponents/UserImage/UserImage";

function ExpenseTransactions({ onClickBack, expense,users }) {

  // const activeUsers = users.filter(x=>x.active)
  // console.log("USERS",activeUsers)
  // console.log("EXPENSE",expense)

  function getUserName(userId){
    const user = users.find(x=>x.id === userId)
    return user?.name
  }

  function getUserInfo(userId){
    return users.find(x=>x.id === userId)
  }

  return (
    <div className="expense-transactions">
      <img onClick={onClickBack} className="expense-transactions_info__back" src={back} alt="flecha hacia atrás" />

      <div className="expense-transactions_info">

        <div className="expense-transactions_info_header_title">
          <h3>{expense.exp_concept}</h3>
          <p>{expense.exp_description}</p>
        </div>

            
        <p className="expense-transactions_info_transactions_transaction">
          <UserImage userInfo={getUserInfo(expense.usr_id_lender)} />
          <span>{`${getUserName(expense.usr_id_lender)}`}</span>
          <span>{` paid ${expense.total}€`}</span>
        </p>

        <ul className="expense-transactions_info_transactions">
          {expense.transactions.map((transaction) => (
            <li
              className="expense-transactions_info_transactions_transaction"
              key={transaction.tra_id}
            >
              <UserImage userInfo={getUserInfo(transaction.usr_id_borrower)} />
              <span>{` ${getUserName(transaction.usr_id_borrower)}`}</span>
              <span>{`${transaction.tra_amount.toFixed(2)}€ `}</span>
            </li>
          ))}
        </ul>
      

      </div>
    </div>
  );
}

export default ExpenseTransactions;

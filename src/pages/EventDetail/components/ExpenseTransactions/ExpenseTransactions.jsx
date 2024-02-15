import "./ExpenseTransactions.css";
import back from "../../../../assets/icons/back.svg";
import { UserImage } from "../../../../globalComponents/UserImage/UserImage";

function ExpenseTransactions({ onClickBack, expense,users }) {

  const activeUsers = users.filter(x=>x.active)
  console.log("USERS",activeUsers)
  console.log("EXPENSE",expense)

  function getUserName(userId){
    const user = users.find(x=>x.id === userId)
    return user?.name
  }



  function getUserInfo(userId){
    return users.find(x=>x.id === userId)
  }

  return (
    <div className="expense-transactions">
      <div className="expense-transactions_info">
        <img onClick={onClickBack} src={back} alt="Icono de flecha hacia atrás" />
        <div className="expense-transactions_info_header">
          <div className="expense-transactions_info_header_title">
            <h3>{expense.exp_concept}</h3>

          </div>
          <p>{expense.exp_description}</p>
          <p>
            
            <UserImage userInfo={getUserInfo(expense.usr_id_lender)} />
            
            {`${getUserName(expense.usr_id_lender)} paid ${expense.total}€`}</p>
        </div>
        <ul className="expense-transactions_info_transactions">
          {expense.transactions.map((transaction) => (
            <li
              className="expense-transactions_info_transactions_transaction"
              key={transaction.tra_id}
            >
              <UserImage userInfo={getUserInfo(transaction.usr_id_borrower)} />
              {`${transaction.tra_amount}€ of ${getUserName(transaction.usr_id_borrower)}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ExpenseTransactions;

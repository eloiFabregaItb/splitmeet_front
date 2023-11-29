function Expense({ expenseInfo }) {
  return (
    <article className="expense">
      <div className="expense_img-concept">
        <img
          src={expenseInfo.usr_name_lender}
          alt={`Icono del usuario ${expenseInfo.usr_name_lender}`}
        />
        <p>{expenseInfo.exp_concept}</p>
      </div>
      <p
        className={`expense_amount ${
          expenseInfo.color ? "expense_amount--green" : "expense_amount--red"
        }`}
      >
        {expenseInfo.amount}
      </p>
    </article>
  );
}

export default Expense;

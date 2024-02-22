import React from 'react';
import "./Debts.css"; // Asegúrate de importar correctamente el archivo de estilos
import { api_url } from "../../../../utils/constants";
import { UserImage } from '../../../../globalComponents/UserImage/UserImage';

function Debts({ creditor, debtor, amount, users }) {


    //   function getUserInfo(userId){
    //     return users.find(x=>x.id === userId)
    //   }



    return (
<article className='debts'>
  {amount < 0 ? (
    <>
      <div className='debts_img-concept'>
        <UserImage userInfo={debtor} />
        <p>{debtor.name}</p>
      </div>

      <p className={`debts_amount debts_amount--red`}>
        You owe
        {" "+Math.abs(amount).toFixed(2)} €
      </p>

    </>
  ) : (
    <>
      <div className='debts_img-concept'>
        <UserImage userInfo={debtor} />
        <p>{debtor.name}</p>
      </div>

      <p className={`debts_amount debts_amount--green`}>
        Owes you
        {" "+amount.toFixed(2)} €
      </p>

    </>
  )}
</article>

    );
}

export default Debts;

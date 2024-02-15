import React from 'react';
import "./Debts.css"; // Asegúrate de importar correctamente el archivo de estilos
import { api_url } from "../../../../utils/constants";
import { UserImage } from '../../../../globalComponents/UserImage/UserImage';

function Debts({ creditor, debtor, amount, users }) {

    
  function getUserInfo(userId){
    return users.find(x=>x.id === userId)
  }



    return (
        <article className='expense' >
            <div className='expense_img-concept'>
              {/* <UserImage userInfo={userObject} /> */}
                <img
                    src={`https://robohash.org/${creditor}`} 
                    alt={`Icono del usuario ${creditor}`} 
                />
                <p>{creditor}</p>
            </div>
            <p>→</p>
            <div className='expense_img-concept'>
                <img
                    src={`https://robohash.org/${debtor}`} 
                    alt={`Icono del usuario ${debtor}`} 
                />
                <p>{debtor}</p>
            </div>

            <p className={`expense_amount ${amount > 0 ? "expense_amount--red" : "expense_amount--green"}`}>
                {amount > 0 ? `You owe ${amount}€ to ${creditor}` : `You lent ${-amount}€ to ${debtor}`}
            </p>
        </article>
    );
}

export default Debts;

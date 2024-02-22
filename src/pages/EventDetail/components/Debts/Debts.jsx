import React from 'react';
import "./Debts.css"; // Asegúrate de importar correctamente el archivo de estilos
import { api_url } from "../../../../utils/constants";
import { UserImage } from '../../../../globalComponents/UserImage/UserImage';

function Debts({ creditor, debtor, amount, users }) {


    //   function getUserInfo(userId){
    //     return users.find(x=>x.id === userId)
    //   }



    return (
        <article className='debts' >
            <div className='debts_img-concept'>
                <UserImage userInfo={creditor} />

                <p>{creditor.name}</p>
            </div>
            <p>→</p>
            <p className={`debts_amount ${amount<0?'debts_amount--red ':'debts_amount--green'}`}>
                {Math.abs(amount)} €
            </p>
            <p>→</p>

            <div className='debts_img-concept'>
                <UserImage userInfo={debtor} />

                <p>{debtor.name}</p>
            </div>


        </article>
    );
}

export default Debts;

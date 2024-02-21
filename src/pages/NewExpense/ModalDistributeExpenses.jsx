import "./NewExpense.css"

import { useState } from "react";
import { TextModal } from "../../globalComponents/TextModal/TextModal";


const PAGES = {
  EQUAL:"equal",
  QUANTITY:"quantity",
  PERCENTAGE:"percentage"
}

const PAGES_NAMES = {
 equal:"Equal parts" ,
 quantity:"By Quantity",
 percentage:"By percentage"
}

const FALTA = "missing"
const SOBRA = "left"

export function ModalDistributeExpenses({
  users,
  onChange,
  amount

}){

  const [isOpen,setIsOpen] = useState()
  const [page,setPage] = useState(PAGES.EQUAL)
  
  const amounts = split_equal(amount,users.length)
  
  const [moneyDistribution,setMoneyDistribution] = useState(users.map((x,i)=>({...x,checked:true,amount:amounts[i]})))
  const [errMsg,setErrMsg] = useState("")

  //page quantity
  const remaining = amount - moneyDistribution.reduce((acc,u)=>acc + (u.amount === undefined ? 0 : Number(u.amount)),0)
  //page percentage
  const remainingPercentage = 100 - moneyDistribution.reduce((acc,u)=>acc + (u.percentage === undefined ? 0 : Number(u.percentage)),0)





  function handleSetPage(newPage){
    setPage(newPage)

    if(newPage === PAGES.EQUAL){
      updateUsersByEqualPartsOpen()
    } else if(newPage === PAGES.PERCENTAGE){
      updateUsersByPercentage()
    }
  }



  // --------------------------- EQUAL PARTS ----------------------------
  //checkbox all
  function handleClickAllCheckbox(e){
    const newVal = ! moneyDistribution.every(x=>x.checked)
    const updatedUsers = moneyDistribution.map(x=>({...x,checked:newVal}))
    updateUsersByEqualParts(updatedUsers)
  }

  //checbox user
  function handleCheckUser(user){
    const index = moneyDistribution.findIndex(x=>x.id === user.id)
    const updatedUsers = moneyDistribution.map((x,i)=> i === index ? ({...x,checked:!x.checked}) : x)
    updateUsersByEqualParts(updatedUsers)
  }


  function updateUsersByEqualPartsOpen(){
    const updatedUsers = moneyDistribution.map((x)=> ({...x,checked:x.amount>0}) )

    updateUsersByEqualParts(updatedUsers)
  }

  function updateUsersByEqualParts(users=moneyDistribution){
    setMoneyDistribution(()=>{

      const updated = users.map(u=>({...u,amount:0}))
      
      //update users amount
      const participants = updated.filter(x=>x.checked)
      const amounts = split_equal(amount,participants.length).sort((a,b)=>Math.random()>0.5?1:0)
      participants.forEach((u,i) => {
        u.amount = amounts[i]
      });

      return updated
    })
  }

  // --------------------------------------------------------------------







  //-------------------------------- QUANTITY ---------------------------
  function handleChangeAmount(user,e){
    setMoneyDistribution(prev=>{
      const updated = [...prev]
      const i = updated.indexOf(user)
      updated[i].amount = e.target.value
      return updated
    })



  }

  //--------------------------------------------------------------------










  // -------------------------- PERCENTAGE -----------------------------
  function handleChangePercentage(user,e){
    setMoneyDistribution(prev=>{
      const updated = [...prev]
      const i = updated.indexOf(user)
      updated[i].percentage = e.target.value
      
      const newAmount = amount * Number(e.target.value) / 100
      if( ! isNaN(newAmount) ){
        updated[i].amount = newAmount
      }

      return updated
    })
  }


  function updateUsersByPercentage(){
    // get the percentage based on the amounts

    const quantityTotal = moneyDistribution.reduce((acc,v)=>acc+Number(v.amount),0)

    setMoneyDistribution(prev=>{
      const updated = prev.map(x=>({...x,percentage:(x.amount/quantityTotal*100).toFixed(2) }))


      return updated
    })
  }


  // ------------------------------------------------------------------




  
  
  function handleSubmit(){
    // onChange && onChange()
    if(page===PAGES.EQUAL){
      if(!moneyDistribution.some(x=>x.checked)) return

      const participants = moneyDistribution.reduce((acc,u)=>acc+u.checked,0)
      const each = amount/participants

    }else if(page === PAGES.QUANTITY){
      if(remaining !== 0){
        setErrMsg(`${remaining}€ ${(remaining>0?FALTA:SOBRA)} to share`)
      }

    }else if(page === PAGES.PERCENTAGE){
      if(remainingPercentage !== 0){
        setErrMsg(`${remainingPercentage}% ${(remainingPercentage>0?FALTA:SOBRA)} to share`)
      }
    }
    
  }


  return (
    <>
      <button className="button" onClick={()=>setIsOpen(true)} >{PAGES_NAMES[page]}</button>
      {
        isOpen &&
        <TextModal
          title={"Share the expense with..."}
          setIsOpen={setIsOpen}
          aceptar={handleSubmit}
        >
          {errMsg && <TextModal title="Error" aceptar={()=>setErrMsg("")} setIsOpen={()=>setErrMsg("")}>{errMsg}</TextModal>}

          <ul className="NewExpense__modal__nav">
            {
              Object.values(PAGES).map((d,i)=>(<li key={i}><button onClick={()=>handleSetPage(d)} className={page === d? "active":""}>{PAGES_NAMES[d]}</button></li>))
            }
          </ul>
          
          <main className="NewExpense__modal__content">
            {
              page=== PAGES.EQUAL && //equal parts
              <div className="User__distribution__list">
                <p 
                  className="NewExpense__modal__content__header"
                  onClick={handleClickAllCheckbox}
                > 
                <input 
                  type="checkbox" 
                  onChange={handleClickAllCheckbox}
                  checked={moneyDistribution.every(x=>x.checked)}
                /> Everybody </p>
                {
                  moneyDistribution.map((user,i)=>
                    <p
                      key={i}
                      className="User__distribution__element"
                      onClick={()=>handleCheckUser(user)}
                    >
                      <input 
                        type="checkbox" 
                        onChange={()=>handleCheckUser(user)}
                        checked={user.checked}
                      /> 
                      <label>{user.name}</label>
                      <span>{user.amount}€</span>
                    </p>  
                  )
                }

                <div className={!moneyDistribution.some(x=>x.checked) ? "error" : ""}>
                  {roundStr(amount/moneyDistribution.reduce((acc,u)=>acc+u.checked,0))} € / person
                </div>

              </div>
            }

            {
              page=== PAGES.QUANTITY && //by quantity
              <div className="User__distribution__list">

                {
                  moneyDistribution.map((user,i)=>
                  <p 
                    key={i}
                    className="User__distribution__element"
                  >
                    <label>{user.name}</label>
                    <input type="number"
                      onChange={e=>handleChangeAmount(user,e)}
                      value={user.amount === undefined ? 0 : user.amount}
                    />
                    €
                  </p>
                  )
                }


              {remaining !== 0 &&
                <p className={remaining === 0?"":"error"}>
                  {Math.abs(remaining)}€
                  {remaining > 0 ? FALTA : SOBRA}
                </p>
              } 
              </div>
            }


            {
              page=== PAGES.PERCENTAGE && //by percentage
              <div className="User__distribution__list">

                {
                  moneyDistribution.map((user,i)=>
                  <p 
                    key={i}
                    className="User__distribution__element"
                  >
                    <label>{user.name}</label>

                    <span>
                      <input type="number"
                        onChange={e=>handleChangePercentage(user,e)}
                        value={user.percentage === undefined ? 0 : user.percentage}
                      ></input>%
                    </span>

                    <span>{roundStr(user.amount)} €</span>

                  </p>
                  )
                }

              {remainingPercentage !== 0 &&
                <p className={remainingPercentage === 0?"":"error"}>
                  {Math.abs(remainingPercentage)}%
                  {remainingPercentage > 0 ? FALTA : SOBRA}
                </p>
              } 
              </div>
            }
          </main>
          



        </TextModal>
      }
    </>
  )
}



function roundStr(n){
  if(n === Infinity) return "0.00"
  n = String(n)
  const point = n.indexOf(".")
  if(point <0) return n+".00"

  const pointsToAdd = n.indexOf(".")  - n.length +1+2
  if(pointsToAdd>0){
    return n+("0".repeat(pointsToAdd))
  }else if(pointsToAdd<0){
    return "~"+(n.substr(0,n.length+pointsToAdd))
  }
}







function decimals2 (n){
  return  Math.floor(n*100)/100
}





function split_equal(amount,n){
  if(n===0)return []
  if(n===1) return [amount]
  const each = decimals2(amount / n)
  const result = Array.from({length:n-1}).fill(each)
  const remaining = amount - result.reduce((acc,v)=>acc+v)
  result.push(decimals2(remaining))
  return result
}
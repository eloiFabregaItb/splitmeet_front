import { useEffect, useState } from "react";
import { TextModal } from "../../globalComponents/TextModal/TextModal";


export function ModalDistributeExpenses({
  users,
  onChange,
  amount

}){

  const [isOpen,setIsOpen] = useState()
  
  const divisions = ["Equal parts",  "Por cantidades","Por porcentaje"]
  const [page,setPage] = useState(0) // 0-> equal parts
  

  //equal parts
  const [equalPartsDiv,setEqualPartsDiv] = useState(users.map(x=>({...x,checked:true})))
  const [isAllChecked,setIsAllChecked] = useState(true)
  const [errMsg,setErrMsg] = useState("")

  const remaining = amount - equalPartsDiv.reduce((acc,u)=>acc + (u.amount === undefined ? 0 : Number(u.amount)),0)
  const remainingPercentage = 100 - equalPartsDiv.reduce((acc,u)=>acc + (u.percentage === undefined ? 0 : Number(u.percentage)),0)


  useEffect(()=>{
    console.log("users",equalPartsDiv)

  },[equalPartsDiv])


  //page 0
  function handleClickAllCheckbox(e){
    const newVal = !isAllChecked
    setIsAllChecked(newVal)
    setEqualPartsDiv(prev=>prev.map(x=>({...x,checked:newVal})))
  }

  //page 0
  function handleCheckUser(user){
    console.log(user)
    setEqualPartsDiv(prev=>{
      const updated = prev.map(u=>({...u,amount:0}))
      const i = updated.findIndex(x=>x.usr_id === user.usr_id)

      updated[i].checked =!user.checked
      setIsAllChecked(updated.some(x=>x.checked))


      // //update users amount
      const participants = updated.filter(x=>x.checked)
      const amounts = split_equal(amount,participants.length).sort((a,b)=>Math.random()>0.5?1:0)
      participants.forEach((u,i) => {
        u.amount = amounts[i]
      });

      return updated
    })

  }

  //page 1
  function handleChangeAmount(user,e){
    setEqualPartsDiv(prev=>{
      const updated = [...prev]
      const i = updated.indexOf(user)
      updated[i].amount = e.target.value
      return updated
    })


  }

  //page 2
  function handleChangePercentage(user,e){
    setEqualPartsDiv(prev=>{
      const updated = [...prev]
      const i = updated.indexOf(user)
      updated[i].percentage = e.target.value
      return updated
    })
  }
  
  function handleSubmit(){
    // onChange && onChange()
    if(page===0){
      const participants = equalPartsDiv.reduce((acc,u)=>acc+u.checked,0)
      const each = amount/participants

    }else if(page === 1){
      if(remaining !== 0){
        setErrMsg((remaining>0?"Faltan":"Sobran")+`${remaining}€ por distribuir`)
      }

    }else if(page === 2){
      if(remainingPercentage !== 0){
        setErrMsg((remainingPercentage>0?"Faltan":"Sobran")+`${remainingPercentage}% por distribuir`)
      }
    }
    
  }

  function calcEachUserPay(){
    if(page === 0){
      const participants = equalPartsDiv.filter(x=>x.checked)
      const amounts = split_equal(amount,participants.length)
      setEqualPartsDiv(prev=>{
        const updated = prev.map(u=>({u,amount:0}))

        participants.forEach((u,i) => {
          const j = updated.indexOf(u)
          updated[j].amount = amounts[i]
        });

        return updated
      })

    }else if(page === 1){

    }else if(page === 2){

    }
  }

  return (
    <>
      <button className="button" onClick={()=>setIsOpen(true)}>{divisions[page]}</button>
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
              divisions.map((d,i)=>(<li key={i}><button onClick={()=>setPage(i)} className={page === i? "active":""}>{d}</button></li>))
            }
          </ul>
          
          <main className="NewExpense__modal__content">
            {
              page===0 && //equal parts
              <div>
                <p className="NewExpense__modal__content__header"> <input 
                type="checkbox" 
                onChange={handleClickAllCheckbox}
                checked={isAllChecked}
                /> Tdods </p>
                {
                  equalPartsDiv.map((user,i)=>
                    <p
                      key={i}
                    >
                      <input 
                        type="checkbox" 
                        onChange={()=>handleCheckUser(user)}
                        checked={user.checked}
                      /> 
                      <label >{user.usr_name}</label>
                      _ 
                      <span>{user.amount}€</span>
                    </p>  
                  )
                }

                <div>
                  {roundStr(amount/equalPartsDiv.reduce((acc,u)=>acc+u.checked,0))}€/person
                </div>

              </div>
            }

            {
              page===1 && //by quantity
              <div>

                {
                  equalPartsDiv.map((user,i)=>
                  <p key={i}>
                    {user.usr_name}
                    <input type="number"
                      onChange={e=>handleChangeAmount(user,e)}
                      value={user.amount === undefined ? 0 : user.amount}
                    />
                    <span>{user.amount}</span>
                  </p>
                  )
                }


              {remaining !== 0 &&
                <p className={remaining === 0?"":"error"}>
                  {remaining > 0 ? "Falta " : "Sobra "}
                  {remaining}€
                </p>
              } 
              </div>
            }


            {
              page===2 && //by percentage
              <div>

                {
                  equalPartsDiv.map((user,i)=>
                  <p>
                    {user.usr_name}
                    <input type="number"
                      onChange={e=>handleChangePercentage(user,e)}
                      value={user.percentage === undefined ? 0 : user.percentage}
                    ></input>
                  </p>
                  )
                }

              {remainingPercentage !== 0 &&
                <p className={remainingPercentage === 0?"":"error"}>
                  {remainingPercentage > 0 ? "Falta " : "Sobra "}
                  {remainingPercentage}%
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
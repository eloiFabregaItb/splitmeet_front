import { useEffect, useState } from "react"
import { TextModal } from "../TextModal/TextModal"
import IcoSearch from "../../assets/icons/search.svg"

import "./ModalSelect.css"

export function ModalSelect({
  items,
  title,
  placeholder,
  getItemText=e=>e,
  filterItem=undefined,
  onSelect,
  initialItem,
  itemSelected,
  optional=false,
  disabled=false,
  addText,
  onAdd,
  children
}){
  if(filterItem===undefined) filterItem = (item,filterStr)=>getItemText(item).toLowerCase().includes(filterStr.toLowerCase())

  const [selectedItem,setSelectedItem] = useState(initialItem || itemSelected || null)
  const [isModalOpen,setIsModalOpen] = useState(false)

  const [filter,setFilter] = useState("")


  useEffect(()=>{
    setSelectedItem(itemSelected)
  },[itemSelected])

  function handleSelect(item){
    setIsModalOpen(false)
    if(onSelect) onSelect(item)
    setSelectedItem(item)
  }


  return(<>
    <button 
      className="button ModalSelect__btn" 
      onClick={()=>setIsModalOpen(!disabled && true)}
      >
        {selectedItem? getItemText(selectedItem) : (placeholder || title)}
      </button>

    {(isModalOpen && !disabled) &&
    
    <TextModal title={title || placeholder} setIsOpen={setIsModalOpen}>
      {children}
      <div className="ModalSelect">
        <div className="ModalSelect__searchInput">
          <input 
            autoFocus 
            type="text" 
            placeholder="Buscar..." 
            value={filter} 
            onChange={e=>setFilter(e.target.value)}
          />
          <img src={IcoSearch} alt="" />
        </div>
        <div className="ModalSelect__items">
          {
            optional &&
            <div 
              className="ModalSelect__items__item"
              onClick={()=>handleSelect(undefined)}
            >-</div>
          }

          {
            items.filter(x=>filterItem(x,filter)).map((item,i)=>{
              return (
                <div 
                  onClick={()=>handleSelect(item)} 
                  className={"ModalSelect__items__item" + (item===selectedItem?" active":"")} 
                  key={i}
                >
                  {getItemText(item)}
                </div>
              )
            })
          }

        </div>

        {
          onAdd &&
          <button className="button" onClick={onAdd}>{addText || "Añadir"}</button>
        }

      </div>

    </TextModal>
    }
  


  </>)
}
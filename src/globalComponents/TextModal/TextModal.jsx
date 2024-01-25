import "./TextModal.css";
import { Modal } from "../Modal/Modal";
import ico_close from "../../assets/icons/close.svg"
import { useEffect } from "react";
export function TextModal({
  title,
  contentClassName,
  children,
  setIsOpen,
  cancelar,
  aceptar,
  aceptarRed,
  cancelarRed,
  aceptarLoading=false,
  cancelarLoading=false,
  buttons=[]
}) {

  const isLoading = aceptarLoading || cancelarLoading || buttons.some(x=>x.loading)


  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && setIsOpen) {
        console.log("CLOSE")
        event.stopPropagation()
        event.preventDefault()
        setIsOpen(false)
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [setIsOpen]);




  return (
    <>
      <Modal closeModal={setIsOpen}>
        <div className="textModal">

        {title &&
          <header className="textModal__header">
            <h2 className="textModal__text">{title}</h2>
            {setIsOpen&&
              <img src={ico_close} alt="" 
                className="textModal__close"
                onClick={()=>setIsOpen(false)}
              />
            }
          </header>
        }
        <div className={contentClassName || "textModal__content"}>
          {children}
        </div>
        {
          (aceptar || cancelar) &&
          <footer className="textModal__buttons__cont">
            {
              aceptar && (
                <button onClick={aceptar} className={"textModal__button"+(aceptarRed?" red":"")} disabled={isLoading}>
                  {aceptarLoading ?
                  <span className="spinner--small"/>
                  :
                  "ACEPTAR"
                  }
                </button>
              )
            }
            {
              cancelar &&(
                <button onClick={cancelar} className={"textModal__button"+(cancelarRed?" red":"")} disabled={isLoading}>
                {cancelarLoading ?
                <span className="spinner--small"/>
                :
                "CANCELAR"}
                  </button>
              )
            }
            {
              (buttons && buttons.length >0) &&
              buttons.map(({onClick,red,text,loading},i)=>
              <button key={i} onClick={onClick} className={"textModal__button"+(red?" red":"")} disabled={isLoading}>{
                loading?
                <span className="spinner--small"/>
                :
                text
                }</button>
              )
            }
          </footer>
        }
        </div>


      </Modal>
    </>
  );
};

import './Modal.css'
import { ReactDimmer } from "react-dimmer";

export function Modal({ closeModal,children,zIndex = 19,dimmer=true}) {

  return (
    <>
      <div className="gloval__modal" style={{zIndex:zIndex+1}}>
        {children}
      </div>

      {dimmer &&
        <ReactDimmer
          isOpen={true}
          exitDimmer={closeModal}
          zIndex={zIndex}
          blur={5}
        />
      }
    </>
  )
}
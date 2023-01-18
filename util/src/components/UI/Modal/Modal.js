import React, {useEffect, useRef} from 'react'
import { useNavigate, useMatch, Routes, Route } from "react-router-dom";
import styles from './Modal.module.css'
import ReactDOM from 'react-dom'






const ModalOverlay = (props) => {
  const match = useMatch(props.url);
  const modalRef = useRef()
  const backdropRef = useRef()
  const navigate = useNavigate()
  




  useEffect(() => {
    mountModalHandler()

    if (!match) {
      unmountModalHandler()
    }
  }, [match])





  const mountModalHandler = async () => {
    
    const modalInitialize = () => {
      console.log(props.parentRef)
      modalRef.current.style.width = props.parentRef.current.clientWidth + 'px'
      modalRef.current.style.height = props.parentRef.current.clientHeight + 'px'
      // const scrolledTopLength = window.pageYOffset
      // const scrolledLeftLength = window.pageXOffset
      // modalRef.current.style.top = props.parentRef.current.offsetTop - scrolledTopLength + 'px'
      // modalRef.current.style.left = props.parentRef.current.offsetLeft - scrolledLeftLength + 'px'
      modalRef.current.style.top = props.parentRef.current.getBoundingClientRect().top + 'px'
      modalRef.current.style.left = props.parentRef.current.getBoundingClientRect().left + 'px'

      // const bodyTag = document.querySelector('body')
      // bodyTag.style.overflowY = 'hidden'
    }
    
    const modalExecute = () => {
      backdropRef.current.style.opacity = 255
      if (props.toggleBoolean) {
        modalRef.current.style.transitionProperty = 'left top width height opacity'
        modalRef.current.style.transitionDuration = '0.3s'
      }
      modalRef.current.style.width = '100%'
      modalRef.current.style.height = '100%'
      modalRef.current.style.left = 0 + 'px'
      modalRef.current.style.top = 0 + 'px'
    }

    await modalInitialize()
    await modalExecute()
  }
  




  const unmountModalHandler = async () => {

    const modalExecute = async () => {
      modalRef.current.style.transitionProperty = await 'left top width height opacity'
      modalRef.current.style.transitionDuration = await '0.3s'
      modalRef.current.style.width = await props.parentRef.current.clientWidth + 'px'
      modalRef.current.style.height = await props.parentRef.current.clientHeight + 'px'
      // const scrolledTopLength = await window.pageYOffset
      // const scrolledLeftLength = await window.pageXOffset
      // modalRef.current.style.top = await props.parentRef.current.offsetTop - scrolledTopLength + 'px'
      // modalRef.current.style.left = await props.parentRef.current.offsetLeft - scrolledLeftLength + 'px'
      modalRef.current.style.top = props.parentRef.current.getBoundingClientRect().top + 'px'
      modalRef.current.style.left = props.parentRef.current.getBoundingClientRect().left + 'px'
      backdropRef.current.style.opacity = await 0
    }

    const redirect = setTimeout(() => {
      // const bodyTag = document.querySelector('body')
      // bodyTag.style.overflowY = 'scroll'
      props.toggleFunction(false)
      navigate(props.prevUrl, { replace: true });
    }, 300);
    
    await modalExecute()
    // await redirect()
  }





  const content = React.cloneElement(props.component, {unmountModalHandler: unmountModalHandler});





  return (
    <div>
      <div ref={backdropRef} className={styles.backdrop} />
      <div onClick={(event) => {event.stopPropagation();}} ref={modalRef} id={`modal-${props.name}-${props.id}`} className={`${styles.modal} ${styles.card}`}>
        <div className={styles.content}>
          {content}
        </div>
      </div>
    </div>
  )
}




const Modal = (props) => {
  

  const match = useMatch(`${props.url}`);
  const condition = (match || props.toggleBoolean)
  const modal = ReactDOM.createPortal(<ModalOverlay component={props.component} id={props.id} name={props.name} parentId={props.parentId} parentRef={props.parentRef} toggleFunction={props.toggleFunction} toggleBoolean={props.toggleBoolean} url={props.url} prevUrl={props.prevUrl} />, document.getElementById('overlay-root'))
  const result = condition && modal

  return (
    <React.Fragment>
      {result}
    </React.Fragment>
  )
}





export default Modal
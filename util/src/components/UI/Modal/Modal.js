import React, {useEffect, useRef} from 'react'
import { useNavigate, useMatch, Routes, Route } from "react-router-dom";
import styles from './Modal.module.css'
import ReactDOM from 'react-dom'






const ModalOverlay = (props) => {
  const match = useMatch(props.url);
  const modalRef = useRef()
  const backdropRef = useRef()
  const contentRef = useRef()
  const indicatorRef = useRef()
  const navigate = useNavigate()
  




  useEffect(() => {
    mountModalHandler()

    if (!match) {
      unmountModalHandler()
    }
  }, [match])





  const mountModalHandler = async () => {
    
    const modalInitialize = async () => {
      console.log(props.parentRef)
      contentRef.current.style.transitionProperty = 'left top width height opacity'
      contentRef.current.style.transitionDuration = '0s'
      indicatorRef.current.style.width = await contentRef.current.clientWidth + 'px'
      indicatorRef.current.style.height = await contentRef.current.clientHeight + 'px'
      contentRef.current.style.left = await props.parentRef.current.getBoundingClientRect().left + 'px'
      contentRef.current.style.top = await props.parentRef.current.getBoundingClientRect().top + 'px'
      contentRef.current.style.width = await props.parentRef.current.clientWidth + 'px'
      contentRef.current.style.height = await props.parentRef.current.clientHeight + 'px'

    }
    
    const modalExecute = () => {
      backdropRef.current.style.opacity = 255
      if (props.toggleBoolean) {
        contentRef.current.style.transitionProperty = 'left top width height opacity'
        contentRef.current.style.transitionDuration = '0.3s'
        
      }


      const responsiveWidth = 100 * indicatorRef.current.clientWidth / window.innerWidth
      const responsiveHeight = 100 * indicatorRef.current.clientHeight / window.innerHeight
      contentRef.current.style.width = responsiveWidth + '%'
      contentRef.current.style.height = responsiveHeight + '%'

      // contentRef.current.style.width = indicatorRef.current.clientWidth + 'px'
      // contentRef.current.style.height = indicatorRef.current.clientHeight + 'px'
      contentRef.current.style.left = indicatorRef.current.getBoundingClientRect().left + 'px'
      contentRef.current.style.top = indicatorRef.current.getBoundingClientRect().top + 'px'
      
    }

    await modalInitialize()
    await modalExecute()
    console.log(contentRef)

    const displayCorrection =  setTimeout(async () => {
      contentRef.current.style.position = 'static'
      modalRef.current.style.display = 'flex'
      modalRef.current.style.justifyContent = 'center'
      modalRef.current.style.alignItems = 'center'
      
      
    }, 300);
  }
  




  const unmountModalHandler = async () => {
    
    // modalRef.current.style.justifyContent = await 'left'
    // modalRef.current.style.alignItems = await 'baseline'
    

    const modalExecute = async () => {
      contentRef.current.style.transitionProperty = await 'left top width height opacity'
      contentRef.current.style.transitionDuration = await '0.3s'
      modalRef.current.style.display = await 'block'
      contentRef.current.style.position = await 'absolute'
      contentRef.current.style.left = await indicatorRef.current.getBoundingClientRect().left + 'px'
      contentRef.current.style.top = await indicatorRef.current.getBoundingClientRect().top + 'px'
      
      // const contentLeft = await contentRef.current.getBoundingClientRect().left
      // const contentTop = await contentRef.current.getBoundingClientRect().top

      
      
      

      // modalRef.current.style.transitionProperty = await 'left top width height opacity'
      // modalRef.current.style.transitionDuration = await '0.3s'
      
      
      
      contentRef.current.style.top = await props.parentRef.current.getBoundingClientRect().top + 'px'
      contentRef.current.style.left = await props.parentRef.current.getBoundingClientRect().left + 'px'
      
      contentRef.current.style.width = await props.parentRef.current.clientWidth + 'px'
      contentRef.current.style.height = await props.parentRef.current.clientHeight + 'px'


      backdropRef.current.style.opacity = await 0
      
    }

    

    const redirect = setTimeout(() => {
      props.toggleFunction(false)
      navigate(props.prevUrl, { replace: true });
    }, 300);
    
    await modalExecute()
  }





  const content = React.cloneElement(props.component, {unmountModalHandler: unmountModalHandler});





  return (
    <div>
      <div ref={backdropRef} className={styles.backdrop} >
        <div ref={indicatorRef} className={styles.indicator} />
      </div>
      <div onClick={(event) => {event.stopPropagation();}} ref={modalRef} id={`modal-${props.name}-${props.id}`} className={`${styles.modal} ${styles.card}`}>
        <div ref={contentRef} className={styles.content}>
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
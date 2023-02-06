import React, {useEffect, useRef} from 'react'
import styles from './FixedModal.module.css'
import ReactDOM from 'react-dom'
import Button from '../Button/Button'



// 모달창 자체
const ModalOverlay = (props) => {
  const backdropRef = useRef()
  const modalRef = useRef()
  const cardRef = useRef()

  useEffect(() => {
    if (cardRef?.current?.style) {
      setTimeout(function() {
        modalRef.current.style.width = props.width + 'px'
        modalRef.current.style.height = props.height + 'px'
        backdropRef.current.style.opacity = '100%'
        cardRef.current.style.transform = 'rotateX(-90deg)'
        modalRef.current.style.opacity = '100%'
      }, 1);

      
    }
  }, [])

  const modalHandler = () => {
    setTimeout(function() {
      backdropRef.current.style.opacity = '0%'
      cardRef.current.style.transform = 'rotateX(0deg)'
      modalRef.current.style.opacity = '0%'
    }, 1);
    

    setTimeout(function() {
      props.stateHandler(false)
    }, 300);
  }

  const hideButton = (
    props.addBtn ? <Button className={styles['button']} onClick={modalHandler}>취소</Button> : <Button onClick={modalHandler}>확인</Button>
  )

  const addBtn = props.addBtn?.map((el,idx) => {
      const btn = React.cloneElement(el, {className:el.props.className + ` ${styles['button']}`, onClick: () => {el.props.onClick(); modalHandler()}});
      return (
        btn
      )
  })
  
  const footer = (
    <div className={styles['footer']}>
      {hideButton}
      {addBtn}
    </div>
  )
  
  const content = React.cloneElement(props.content, {...props, modalHandler: modalHandler});

  return (
    <div ref={backdropRef} className={styles.backdrop}>
      <div ref={modalRef} className={`${styles.modal}`}>
        <div ref={cardRef} className={`${styles.card}`}>
          
          <div className={styles['back']}>
            <div className={styles['content']}>
              {content}
            </div>

            {props.noBtn === true ? null : footer}
          </div>
          
        </div>
        
      </div>
    </div>
  )
}


const FixedModal = (props) => {

  const modal = (
    ReactDOM.createPortal(<ModalOverlay {...props} />, document.getElementById('overlay-root'))
  )

  return (
    <React.Fragment>
      {props.modalState && modal}
    </React.Fragment>
  )
}

export default FixedModal
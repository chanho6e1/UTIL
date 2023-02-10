import React, { useEffect, useRef } from "react";
import styles from "./FixedModal.module.css";
import ReactDOM from "react-dom";
import Button from "../Button/Button";

// 모달창 자체
const ModalOverlay = (props) => {
  const backdropRef = useRef();
  const modalRef = useRef();
  const cardRef = useRef();
  const contentRef = useRef();
  const backRef = useRef();

  useEffect(() => {
    if (cardRef?.current?.style) {
      setTimeout(function () {
        modalRef.current.style.width = props.width;
        modalRef.current.style.height = props.height;
        // contentRef.current.style.width = props.width;
        // contentRef.current.style.height = props.height;
        // cardRef.current.style.width = props.width;
        // cardRef.current.style.height = props.height;

        // backRef.current.style.width = props.width
        // backRef.current.style.height = props.height
        backdropRef.current.style.opacity = "100%";
        cardRef.current.style.transform = "rotateX(0deg)";
        modalRef.current.style.opacity = "100%";

        backdropRef.current.style.overflow = props.overflow;
        cardRef.current.style.overflow = props.overflow;
        modalRef.current.style.overflow = props.overflow;
      }, 1);
    }
  }, []);

  const modalHandler = () => {
    setTimeout(function () {
      backdropRef.current.style.opacity = "0%";
      cardRef.current.style.transform = "rotateX(30deg)";
      modalRef.current.style.opacity = "0%";
    }, 1);

    setTimeout(function () {
      props.stateHandler(false);
    }, 300);
  };

  const content = React.cloneElement(props.content, { ...props, modalHandler: modalHandler });

  return (
    <div ref={backdropRef} className={styles.backdrop}>
      <div ref={modalRef} className={`${styles.modal}`}>
        <div ref={cardRef} className={`${styles.card}`}>
          <div ref={contentRef} className={styles["content"]}>
            {content}
          </div>

          {/* <div ref={backRef} className={styles['back']}>

          </div> */}
        </div>
      </div>
    </div>
  );
};

const FixedModal = (props) => {
  const modal = ReactDOM.createPortal(
    <ModalOverlay {...props} />,
    document.getElementById("overlay-root")
  );

  return <React.Fragment>{props.modalState && modal}</React.Fragment>;
};

export default FixedModal;

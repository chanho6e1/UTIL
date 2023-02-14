import React, { useRef, useEffect } from "react";
import styles from "./PopUp.module.css";
import ReactDOM from "react-dom";

const Form = (props) => {
  const indicatorRef = useRef();
  const popUpRef = useRef();

  useEffect(() => {
    if (indicatorRef.current) {
      indicatorRef.current.style.transitionProperty = "width";
      indicatorRef.current.style.transitionDuration = `${
        props.showTime / 1000
      }s`;
    }

    if (popUpRef.current) {
      popUpRef.current.style.width = `${props.width}px`;
      popUpRef.current.style.height = `${props.height}px`;
      popUpRef.current.style.top = `-${props.height}px`;
    }

    setTimeout(function () {
      indicatorRef.current.style.width = "0px";
      popUpRef.current.style.top = "20px";
    }, 100);
    setTimeout(function () {
      popUpRef.current.style.top = `-${props.height}px`;
    }, props.showTime);
    setTimeout(function () {
      props.stateHandler(false);
    }, props.showTime + 290);
  }, []);

  return (
    <div className={styles["backdrop"]}>
      <div ref={popUpRef} className={styles["pop-up"]}>
        <div className={styles["content"]}>{props.content}</div>
        <div ref={indicatorRef} className={styles["indicator"]} />
      </div>
    </div>
  );
};

const PopUp = (props) => {
  const popUp = ReactDOM.createPortal(
    <Form {...props} />,
    document.getElementById("overlay-root")
  );

  return <React.Fragment>{props.popUpState && popUp}</React.Fragment>;
};

export default PopUp;

import React from "react";
import ReactDOM from "react-dom";
import styles from "./StackNotification.module.css";
import Notification from "./Notification";
import { useSelector } from "react-redux";

const NotificationOverlay = (props) => {
  const stack = useSelector((state) => state.notificationSlice.stack);

  const notiProcessor = Object.keys(stack).map((key) => {
    return (
      <Notification
        passToFixed={stack[key].passToFixed}
        key={key}
        id={key}
        width={stack[key].width ? stack[key].width : 320}
        height={stack[key].height ? stack[key].height : 150}
        content={stack[key].content}
        duration={stack[key].duration ? stack[key].duration : 3000}
        state={stack}
      />
    );
  });

  return (
    <div className={styles["backdrop"]}>
      <div className={styles["notification-place"]}>{notiProcessor}</div>
    </div>
  );
};

const StackNotification = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <NotificationOverlay {...props} />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default StackNotification;

import React from "react";
import { useSelector } from "react-redux";
import FixedNotificationItem from "./FixedNotificationItem";
import styles from "./FixedNotification.module.css";

const FixedNotification = (props) => {
  const fixed = useSelector((state) => state.notificationSlice.stack);

  const fixedItems = Object.keys(fixed).map((el, idx) => {
    <div style={{ width: "200px", height: "200px", backgroundColor: "blue" }}>
      dasdasdaddasd
      <FixedNotificationItem content={fixed[el].content} />
    </div>;
  });

  return (
    <div className={styles["fixed-wrapper"]}>
      <button onClick={() => console.log(JSON.stringify(fixed))}>dsa</button>
      {fixedItems}
    </div>
  );
};

export default FixedNotification;

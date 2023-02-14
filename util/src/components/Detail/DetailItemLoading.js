import React from "react";
import styles from "./DetailItemLoading.module.css";

const DetailItemLoading = (props) => {
  return (
    <div className={styles["loading-wrapper"]}>
      <div className={styles["loading-inner-wrapper"]}>
        <div className={styles["row"]}>
          <div className={`${styles["animation"]} ${styles["title"]}`} />

          <div className={styles["column"]}>
            <div className={`${styles["animation"]} ${styles["writer"]}`} />
            <div className={`${styles["animation"]} ${styles["date"]}`} />
          </div>
        </div>
        {/* <div className={styles['line']} /> */}

        <div className={`${styles["animation"]} ${styles["content"]}`} />

        <div className={`${styles["animation"]} ${styles["buttons"]}`} />
        <div className={`${styles["animation"]} ${styles["comment"]}`} />
      </div>
    </div>
  );
};

export default DetailItemLoading;

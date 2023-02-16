import React from "react";
import styles from "./TextInput.module.css";

const TextInput = (props) => {
  return (
    <div>
      <input type="text" className={styles["input"]} />
    </div>
  );
};

export default TextInput;

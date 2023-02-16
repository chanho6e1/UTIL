import React from "react";
import styles from "./TextArea.module.css";

const TextArea = (props) => {
  return (
    <textarea
      className={`${props.className} ${styles["text-area"]}`}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      onKeyPress={props.onKeyPress}
    />
  );
};

export default TextArea;

import React from "react";
import styles from "./TextArea.module.css";
import "./ToastEditor.css";

import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";
import prism from "prismjs";
import "prismjs/themes/prism.css";

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
// className={`${props.className} ${styles['text-area']}`}

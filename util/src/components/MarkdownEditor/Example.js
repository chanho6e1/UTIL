import React, { useEffect, useState, useRef } from "react";
import styles from './Example.module.css'
import ReactDOM from 'react-dom';
import Code from "../MarkdownRenderer/Prism/Code";


import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm'

const Example = (props) => {
  const [markdownContent, setMarkdownContent] = useState()
  const renderDiv = useRef()
  const exec =  () => {
    const markdown = '<strong>fdsafds</strong><br/>djslka<h1>fdfads</h1>\ndadsadsa';

const html = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remark2rehype)
    .use(rehypeStringify)
    .processSync(markdown)
    .toString();

console.log(html);

    renderDiv.current.innerHTML = html
   
  }

  return (

    <div>

      <button onClick={exec}>exec</button>

      <div ref={renderDiv}></div>
      
    </div>
  )
}

export default Example
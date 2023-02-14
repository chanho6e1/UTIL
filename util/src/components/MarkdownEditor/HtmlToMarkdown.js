import React, { useEffect, useState, useRef } from "react";
import { unified } from "unified";
// import remarkParse from 'remark-parse';
// import remark2rehype from 'remark-rehype';
// import remarkGfm from 'remark-gfm'
// import rehypeStringify from 'rehype-stringify';
import remarkStringify from "remark-stringify";
import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";

const HtmlToMarkdown = (props) => {
  const [result, setResult] = useState();

  const process = () => {
    return unified()
      .use(rehypeParse) // Parse HTML to a syntax tree
      .use(rehypeRemark) // Turn HTML syntax tree to markdown syntax tree
      .use(remarkStringify) // Serialize HTML syntax tree
      .process(props.content)
      .then((file) => {
        return String(file);
      })
      .catch((error) => {
        throw error;
      });
  };

  useEffect(() => {
    process().then((res) => {
      setResult(res);
      props.setEditInitialContent(() => res);
    });
  });

  return result;
};

export default HtmlToMarkdown;

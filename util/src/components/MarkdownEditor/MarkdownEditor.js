import React, { useEffect, useState, useRef } from "react";
import styles from './MarkdownEditor.module.css'
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import logo from '../../img/util-logo.png'
import Example2 from "./Example2";
import axios from "axios";

const MarkdownEditor = (props) => {
  
  const [frontData, setFrontData] = useState([''])
  const lineRef = useRef()
  const imageRef = useRef([])
  const imageUrlRef= useRef([])
  const editorWrapperRef = useRef()

  const preventDeletingFirstLine = (event) => {
    if (event.target.textContent === "" && lineRef.current.previousSibling.id !== lineRef.current.id  && event.key === 'Backspace') {
      event.preventDefault()
    }
  }

  const giveRefHandler = () => {
    const selection = window.getSelection();
    if (selection.focusNode.nodeName !== '#text') {
      lineRef.current = selection.focusNode
    }
  }

  const syncInput = () => {
    if (editorWrapperRef.current) {
      setFrontData(() => editorWrapperRef.current.innerText)
    }
  }




  
  const imageProcessor = (url) => {
    const order = imageRef.current? imageRef.current.length + 1 : 0
    const reactImage = (
      <React.Fragment>
        <div class={styles['wrapper-block']} contentEditable='true'>
          <div class={styles['image-wrapper']} contentEditable='false' draggable='false' oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
            <img ref={el => (imageRef.current[order] = el)} src={url} id={`image-${order}`} alt={url} className={styles['image']} draggable='false' oncontextmenu="return false" ondragstart="return false" onselectstart="return false"/>
            <div ref={el => (imageUrlRef.current[order] = el)} id={`image-url-${order}`}>{`![](${url})`}</div>
          </div>
        </div>
      </React.Fragment>
    )
    return {image: reactImage, order: order}
  }




  const renderImage = (image, order) => {
    const line = document.createElement("div")
    line.setAttribute("class", `${styles['line']}`)
    line.setAttribute("id", `image-wrapper-${order}`)
    line.setAttribute("contentEditable", 'true')
    const range = document.createRange();
    range.selectNodeContents(editorWrapperRef.current);
    lineRef.current.after(line)
    const domLine = document.getElementById(`image-wrapper-${order}`)
    const root = createRoot(domLine)
    root.render(image)
  }




  const uploadImage = (event) => {
    const file = event.target.files[0]
    const url = URL.createObjectURL(file)
    const processedImage = imageProcessor(url)
    sendImageData(file, processedImage.order)
    renderImage(processedImage.image, processedImage.order)
  }





  const sendImageData = (data, order) => {
    const frm = new FormData();
    frm.append("image", data);
    for (let value of frm.values()) {
      console.log(value);
    }





    axios({
      method: 'post',
      url: "http://localhost:8080/posts/upload",
      data: frm,
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundarylTMBUUyXqgLqmAdj",
      },
    })
    .then((res) => {
      imageUrlRef.current[order].textContent = `![](${res.data.data})`
    })
    .catch((err) => {
      console.log(err);
      console.log("게시물 작성에 실패했습니다.");
    });
  };
  




  useEffect(() => {
    const pasteProcessor = (event) => {
      event.preventDefault()
      const clipboardData = event.clipboardData;
      const htmlText = clipboardData.getData('text/html');
      const html = document.createElement('div')
      html.innerHTML = htmlText

      let formData = []
      const htmlChildNodes = [].slice.call(html.children)
      console.log(htmlChildNodes)
      let sel, range;
      sel = window.getSelection();
      htmlChildNodes.forEach(element => {
        range = sel.getRangeAt(0);
        range.deleteContents();
        const img = element.getElementsByTagName('img')
        console.log(img)
        if (img.length !== 0) {
          const processedImg = imageProcessor(img[0].src)
          formData.push(processedImg.image)
          renderImage(processedImg.image, processedImg.order)
          
        } else {
          formData.push(element.textContent)
          range.insertNode( document.createTextNode(element.textContent + '\n') );

        }
        console.log(formData)
        
      });
      // const range = document.createRange();
      // range.selectNodeContents(editorWrapperRef.current);
      
    }

    editorWrapperRef.current.addEventListener('paste', pasteProcessor);
    return () => {
      window.removeEventListener('paste', pasteProcessor);
    };
    
  }, [editorWrapperRef.current])



  return (
    <div className={styles.markdown}>

      <input onChange={uploadImage} type="file" multiple name="filename" accept="image/gif, image/jpeg, image/png" enctype="multipart/form-data" />
      <div onInput={(event) => {giveRefHandler(); syncInput();}} onClick={giveRefHandler} onKeyDown={preventDeletingFirstLine} contentEditable="true" ref={editorWrapperRef} id="editor-wrapper" className={styles['editor-wrapper']}>
        
        <div ref={lineRef} contentEditable="true" className={styles[`line`]} id="line" >
          
        </div>

      </div>
      

      <div>{editorWrapperRef.current && <Example2 content={editorWrapperRef.current.innerText} /> }</div>
      
    </div>
    
  )
}

export default MarkdownEditor
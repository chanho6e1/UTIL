import React, { useEffect, useState, useRef } from "react";
import styles from './PostTag.module.css'
import ReactDOM from 'react-dom';
import logo from '../../img/util-logo.png'
import NotiDeliverer from "../UI/StackNotification/NotiDeliverer";
import warning from "../../img/Warning.png"



const PostTag = (props) => {
  
  const [frontData, setFrontData] = useState([''])
  const lineRef = useRef([])
  const cursorSpanRef = useRef()


  const editorWrapperRef = useRef()




  const createLine = (idx) => {
    return (
      <div  className={styles[`line-wrapper`]}>
        <div ref={el => (lineRef.current[idx] = el)}  id={idx} className={styles[`line`]} contentEditable="true" placeholder="태그를 입력하세요." onInput={inputToArray.bind(this, idx)} onKeyDown={(event) => {deleteLine(idx, event); pushLine(idx, event); preventSpace(idx, event); checkValid(idx, event)}} ></div>
      </div>
    )
  }

  const inputToArray = (idx, event) => {
    frontData[idx] = event.target.textContent
    setFrontData(() => [...frontData])
    props.setTags(() => frontData )
    
  }

  // 배열과 인풋 박스 내 글
  const syncInput = () => {
    frontData.forEach((el, idx) => {
      lineRef.current[idx].innerText = frontData[idx]
    })
  }

  const checkValid = (line, event) => {
    if (frontData[line].length >= 10 && event.key !== "Backspace") {
      setAlertText('태그는 10자를 초과하여 작성할 수 없습니다.')
      setAlertNotiState(true)
      event.preventDefault()
    }
  }

  const preventSpace = (line, event) => {
    if (event.keyCode == 32) {
      event.preventDefault()
    }
  }

  const loadCursorLocation = async (line, leftContent="", rightContent="") => {
    const element = document.getElementById(`${line}`)
    if (element.innerText.length === 0) {
      element.focus();
      return;
    }
    const cursorSpan = <span id={`cursor-span`} />
    const cursorPointer = document.getElementById(`${line}`)
    const selection = window.getSelection();
    const newRange = document.createRange();
    newRange.selectNodeContents(cursorPointer);
    newRange.collapse(false);
    selection?.removeAllRanges();
    selection?.addRange(newRange);
  }


    const holdCursorLocation = async (line, leftContent="", rightContent="") => {

      const cursorPointer = document.getElementById(`${line}`)
      const selection = window.getSelection();
      const newRange = document.createRange();
      newRange.selectNodeContents(cursorPointer);
      newRange.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(newRange);

      const nextLine = frontData[line]
      const currentLine = frontData[line + 1]  // 다음 줄 내용 저장
      frontData[line] = currentLine + nextLine
      frontData.splice(line + 1, 1)
      setFrontData(() => [...frontData])
      syncInput()

      lineRef.current[line].innerText = ''
      const range = selection.getRangeAt(0);
      const $leftText = document.createTextNode(currentLine);
      const $rightText = document.createTextNode(nextLine);
      const $span = document.createElement('span');
      $span.id = 'cursor-span'
      
      range.insertNode($leftText);
      range.insertNode($span);
      range.insertNode($rightText);

      const spanCursor = document.getElementById('cursor-span')
      
      newRange.selectNodeContents(spanCursor);
      newRange.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(newRange);
      range.setStartAfter(spanCursor)
  }



  const pushLine = (line, event) => {
    if (frontData.length > 4) {
      if (event.key == 'Enter') {
        setAlertText('태그는 5개 이상 작성할 수 없습니다.')
        setAlertNotiState(true)
        event.preventDefault()
      }
      return
    } else if (frontData[line] === '') {
      if (event.key == 'Enter') {
        setAlertText('생성된 태그에 내용을 입력해 주세요.')
        setAlertNotiState(true)
        event.preventDefault()
      }
      return
    }
    if (event.key == 'Enter') {
      event.preventDefault()

      const asyncTask = async () => {
        await frontData.splice(line + 1, 0, '')
        await setFrontData([...frontData])
        await syncInput()
        await loadCursorLocation(line + 1)
      }
      asyncTask()

    }
  }

  

  const deleteLine = async (line, event) => {
    // selection.anchorOffset으로 커서 위치 감지
    const selection = window.getSelection()


    // 해당 줄의 가장 오른쪽에서 Delete를 눌렀을 때 수행하는 코드
    if (selection.anchorOffset === frontData[line].length && event.key == 'Delete') {
      event.preventDefault()  // 줄이 바뀔 때에는 Delete의 동작을 멈추고 대신 아래 코드를 실행한다.
      holdCursorLocation(line)
      
    }


    // 해당 줄의 가장 왼쪽에서 백스페이스를 눌렀을 때 수행하는 코드
    if (selection.anchorOffset === 0 && event.key == 'Backspace') {
      event.preventDefault()  // 줄이 바뀔 때에는 백스페이스의 동작을 멈추고 대신 아래 코드를 실행한다.
      const currentLine = lineRef.current[line].innerText
      frontData[line - 1] = lineRef.current[line - 1].innerText + currentLine // 윗 줄에 해당 줄의 내용을 추가한다.
      frontData.splice(line, 1) // 해당 줄을 삭제한다.
      setFrontData([...frontData])  // 바뀐 데이터를 반영한다.

      // 바뀐 데이터를 보이는 글에 반영한다.
      syncInput()

      // 커서 위치 지정 및 이동
      loadCursorLocation(line - 1, frontData[line - 1])
    }
  }


  const [alertText, setAlertText] = useState()
  const [alertNotiState, setAlertNotiState] = useState(false)

  const alert = (
    <div style={{display:'flex', justifyContent:'space-evenly', alignItems:'center'}}>
      <img style={{width:'40px', height:'40px', marginRight:'12px'}} src={warning} />
      <div>
        <p style={{lineHeight: '40%'}}>{alertText}</p>
        {/* <p style={{lineHeight: '40%'}}>날짜 범위를 미만 & 초과할 수 없습니다.</p> */}
      </div>
      
    </div>
    
  )





  return (
    <div>
      {alertNotiState && <NotiDeliverer content={alert} stateHandler={setAlertNotiState} duration={5000} width={350} height={100} />}
      <div ref={editorWrapperRef} id="editor-wrapper" className={styles['editor-wrapper']}>
        {frontData.map((el, idx) => createLine(idx))}
      </div>
    </div>
    
  )
}

export default PostTag
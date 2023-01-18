import React, {useRef} from "react";
import styles from './Main.module.css'
import SwipeableDock from "../UI/SwipeableDock/SwipeableDock";
import * as Icons from './Icons'
import logo from '../../img/util-logo.png'


import PostTag from "../MarkdownEditor/PostTag";
import Example from "../MarkdownEditor/Example";
import Example2 from "../MarkdownEditor/Example2";
import MarkdownEditor from "../MarkdownEditor/MarkdownEditor";



const Main = (props) => {
  const parentRef = useRef()

  const postData = {
    content: [ <MarkdownEditor />, <div>test1</div>, <Example />, <div>test1</div>, <div>test1</div>],
    dock: {
      logoContracted:<img className={styles['logo-icon']} src={logo} style={{width: '96px', height: 'auto'}}/>,
      logoExpanded:<div className={styles['logo-text']}>util</div>,
      dockContracted: [Icons.home, Icons.feed, Icons.search, Icons.compass, Icons.plus],
      dockExpanded:[<div>마이 유틸</div>, <div>피드</div>, <div>검색</div>, <div>탐색 탭</div>, <div>피드 작성</div>],
      dockContractedBottom: [Icons.notification, Icons.user],
      dockExpandedBottom: [<div>알림</div>, <div>Anonymous</div>],
    },
    url: ['/index', '/feed', '/search', '/setting', '/etc'],
    bottomUrl: ['/notification', '/user']
  };


  return (
    <div className={styles['dock-wrapper']} ref={parentRef}>
      <SwipeableDock parentRef={parentRef} content={postData} />
    </div>
  )

}

export default Main
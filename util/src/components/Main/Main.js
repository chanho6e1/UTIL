import React, {useRef} from "react";
import styles from './Main.module.css'
import SwipeableDock from "../UI/SwipeableDock/SwipeableDock";
import * as Icons from './Icons'
import logo from '../../img/util-logo.png'
import { useSelector, useDispatch } from 'react-redux'




import Plan from "../Plan/Plan";
import MyUtil from "../MyUtil/MyUtil";


const Main = (props) => {
  const parentRef = useRef()
  const userAuth = useSelector(state => state.userAuthSlice.userAuth)

  const postData = {
    content: [ <MyUtil />, <div>test1</div>, <div>test1</div>, <div>test1</div>, <div>test1</div>],
    dock: {
      logoContracted:<img className={styles['logo-icon']} src={logo} style={{width: '96px', height: 'auto'}}/>,
      logoExpanded:<div className={styles['logo-text']}>util</div>,
      dockContracted: [Icons.home, Icons.feed, Icons.search, Icons.compass, Icons.plus],
      dockExpanded:[<div>마이 유틸</div>, <div>피드</div>, <div>검색</div>, <div>탐색 탭</div>, <div>피드 작성</div>],
      dockContractedBottom: [Icons.notification, <div onClick={() => console.log(userAuth)}>{Icons.user}</div>],

      dockExpandedBottom: [<div>알림</div>, <div onClick={() => console.log('testright')}>Anonymous</div>],
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
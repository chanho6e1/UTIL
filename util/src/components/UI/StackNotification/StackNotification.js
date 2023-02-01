import React, {useState, useEffect} from "react";
import ReactDOM from 'react-dom'
import styles from './StackNotification.module.css'
import Notification from "./Notification";
import { notificationSliceActions } from "../../../redux/notificationSlice";
import { useSelector, useDispatch } from 'react-redux'

const NotificationOverlay = (props) => {

  // const [dummy, setDummy] = useState({1: {content:'test1', duration:1000, width:320, height:150}, 'alarm': {content:'test2', duration:3000}})

  //   const notiProcessor = Object.keys(dummy).map((key) => {

  //     return (
  //       <Notification key={key} id={key} width={dummy[key].width ? dummy[key].width : 320} height={dummy[key].height ? dummy[key].height : 150} content={dummy[key].content} duration={dummy[key].duration ? dummy[key].duration : 3000} stateHandler={setDummy} state={dummy}  />
  //     )

  //   })
  const stack = useSelector(state => state.notificationSlice.stack)


  const notiProcessor = Object.keys(stack).map((key) => {

    return (
      <Notification key={key} id={key} width={stack[key].width ? stack[key].width : 320} height={stack[key].height ? stack[key].height : 150} content={stack[key].content} duration={stack[key].duration ? stack[key].duration : 3000} state={stack}  />
    )

  })



  return (
    <div className={styles['backdrop']}>
      <div className={styles['notification-place']}>
        {notiProcessor}
      </div>
    </div>
  )
}

const StackNotification = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<NotificationOverlay {...props} />, document.getElementById('overlay-root'))}
    </React.Fragment>
  )
}

export default StackNotification
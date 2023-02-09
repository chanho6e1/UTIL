import React, {useEffect} from "react";
import { notificationSliceActions } from "../../../redux/notificationSlice";
import { useSelector, useDispatch } from 'react-redux'
import useDidMountEffect from "../../../hooks/useDidMountEffect";


const NotiDeliverer = (props) => {
  const dispatch = useDispatch()
  const stack = useSelector(state => state.notificationSlice.stack)

  // const randNum = Math.floor(Math.random() * 100)
  useEffect(() => {

    const key = Object.keys(stack)[Object.keys(stack).length - 1] + 1
    // const key = (Object.keys(stack).length * 100) + randNum

    const data = {
      key: key,
      value: {
        content: props.content,
        duration: props.duration,
        width: props.width,
        height: props.height
      }
    }
    dispatch(notificationSliceActions.push(data))
    props.stateHandler(false)
  }, [])

  return
  // return (
  //   <React.Fragment>

  //   </React.Fragment>
  // )
}

export default NotiDeliverer

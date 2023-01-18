import React, {useState, useRef, useEffect} from "react";
import Swipe from "react-easy-swipe";
import styles from "./DraggableDateSelector.module.css"

import { useSelector, useDispatch } from 'react-redux'
import { modifyPlanSliceActions } from '../../redux/planSlice'


const DraggableDateSelector = (props) => {
  const resizePoint = 24
  const dispatch = useDispatch()
  const plans = useSelector(state => state.planSlice.plans)
  const dateSelectorBar = useRef()
  const [positionx, setPositionx] = useState(0)
  const [contentCount, setContentCount] = useState(1)
  const [endSwipe, setEndSwipe] = useState(false)
  

  const calcPeriod = (startDate, endDate) => {
    return Math.abs((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  }


  
  const [initialStartDate, setInitialStartDate] = useState(new Date(props.startDate))
  const [initialEndDate, setInitialEndDate] = useState(new Date(props.endDate))
  const [initialWidth, setInitialWidth] = useState()
  const [startDate, setStartDate] = useState(initialStartDate)
  const [endDate, setEndDate] = useState(initialEndDate)
  const [period, setPeriod] = useState(calcPeriod(startDate, endDate))




  useEffect(() => {
    setPeriod(() => calcPeriod(startDate, endDate))
  }, [startDate, endDate])


  // useEffect(() => {
  //   dateSelectorBar.current.style.transitionDuration = '0.3s'
  //   dateSelectorBar.current.style.width = (positionx - (positionx % resizePoint)) + 'px'
  // }, [period])



  useEffect(() => {
    // 위치 월 기준으로 지정
    dateSelectorBar.current.style.left = props.planGridRef[0].current[9].offsetLeft + 'px'
  }, [])




  const onSwipeMove = (dateKind, position = { x: null }) => {
    
    // alert(props.planGridRef[0].current[9].offsetLeft)
    setPositionx(() => position.x)
  }







  const onSwipeEnd = (dateKind) => {
    const modifiedDatePeriod = parseInt(positionx / resizePoint)
    dispatch(modifyPlanSliceActions.modifyStartDate(JSON.stringify({idx: props.idx, updatedDate: startDate.toString()})))
    dispatch(modifyPlanSliceActions.modifyEndDate(JSON.stringify({idx: props.idx, updatedDate: endDate.toString()})))

    
  }


  



  return (
    <div ref={dateSelectorBar} className={styles['date-selector-bar']}>
      <Swipe onSwipeStart={(event) => {event.stopPropagation();}} onSwipeEnd={(event) => {onSwipeEnd('start' ,event)}} onSwipeMove={(event) => {onSwipeMove('start', event)}}>
        <div id="left" className={styles['resize-handler']}>

        </div>
      </Swipe>
      <div className={styles['center-move-handler']}>
        
      </div>
      <Swipe onSwipeStart={(event) => {event.stopPropagation();}} onSwipeEnd={(event) => {onSwipeEnd('end' ,event)}} onSwipeMove={(event) => {onSwipeMove('end', event)}}>
        <div id="right" className={styles['resize-handler']}>
          
        </div>
      </Swipe>
      
    </div>
  )
}

export default DraggableDateSelector
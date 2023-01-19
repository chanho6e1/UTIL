import React, {useState, useRef, useEffect} from "react";
import Swipe from "react-easy-swipe";
import styles from "./DraggableDateSelector.module.css"

import { useSelector, useDispatch } from 'react-redux'
import { modifyPlanSliceActions } from '../../redux/planSlice'


const DraggableDateSelector = (props) => {
  const resizePoint = 24
  const columnIdx = props.idx
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
  const [startDate, setStartDate] = useState(initialStartDate)
  const [endDate, setEndDate] = useState(initialEndDate)
  const [period, setPeriod] = useState(calcPeriod(startDate, endDate))



  const getMonthDistance = (start, end) => {
    const startYear = start.getFullYear()
    const endYear = end.getFullYear()
    const startMonth = start.getMonth()
    const endMonth = end.getMonth()
    const startDate = start.getDate()
    const endDate = end.getDate()

    if (startYear !== endYear) {
      return ((endYear - startYear) * 12) - startMonth + endMonth + 2;
    } else {
      return ((endYear - startYear) * 12) - startMonth + endMonth + 1;
    }
  }






  useEffect(() => {
    // 시작 위치 지정
    const startYear = initialStartDate.getFullYear()
    const endYear = initialEndDate.getFullYear()
    const startMonth = initialStartDate.getMonth()
    const endMonth = initialEndDate.getMonth()
    const startDate = initialStartDate.getDate()
    const endDate = initialEndDate.getDate()
    const startMonthLastDay = new Date(initialStartDate.getFullYear(), initialStartDate.getMonth(), 0).getDate()
    const startMonthDaySplit = props.planGridRef[columnIdx].current[startMonth].clientWidth / new Date(initialStartDate.getFullYear(), startMonth, 0).getDate()
    const endMonthDaySplit = props.planGridRef[columnIdx].current[endMonth].clientWidth / new Date(initialEndDate.getFullYear(), endMonth, 0).getDate()


    dateSelectorBar.current.style.left = props.planGridRef[columnIdx].current[startMonth].offsetLeft + (startMonthDaySplit * initialStartDate.getDate()) + 'px'

    if (initialStartDate.getMonth() !== initialEndDate.getMonth()) {
      const startMonthWidth = (startMonthLastDay - startDate) * startMonthDaySplit
      const endMonthWidth = endMonthDaySplit * endDate
      const monthDistance = getMonthDistance(initialStartDate, initialEndDate) - 2;
      // const monthDistance = endMonth - startMonth - 1
      dateSelectorBar.current.style.width = startMonthWidth + endMonthWidth + (monthDistance * props.planGridRef[columnIdx].current[endMonth].clientWidth) + 'px'
    }

    if (initialStartDate.getMonth() === initialEndDate.getMonth()) {
      dateSelectorBar.current.style.width = (endDate - startDate) * startMonthDaySplit + 'px'
    }


    
  }, [])




  const onSwipeMove = (position = { x: null }) => {
    
    // alert(props.planGridRef[0].current[9].offsetLeft)
    setPositionx(() => position.x)
    console.log(position.x)
  }







  const onSwipeEnd = () => {
    dispatch(modifyPlanSliceActions.modifyStartDate(JSON.stringify({idx: props.idx, updatedDate: startDate.toString()})))
    dispatch(modifyPlanSliceActions.modifyEndDate(JSON.stringify({idx: props.idx, updatedDate: endDate.toString()})))
  }


  



  return (
    <div ref={dateSelectorBar} className={styles['date-selector-bar']}>
      <Swipe className={styles['swiper']} onSwipeStart={(event) => {event.stopPropagation();}} onSwipeEnd={onSwipeEnd} onSwipeMove={onSwipeMove} allowMouseEvents={true}>
        <div id="left" className={styles['resize-handler']}>

        </div>
      </Swipe>
      <div className={styles['center-move-handler']}>
        
      </div>
      <Swipe className={styles['swiper']} onSwipeStart={(event) => {event.stopPropagation();}} onSwipeEnd={onSwipeEnd} onSwipeMove={onSwipeMove} allowMouseEvents={true}>
        <div id="right" className={styles['resize-handler']}>
          
        </div>
      </Swipe>
      
    </div>
  )
}

export default DraggableDateSelector
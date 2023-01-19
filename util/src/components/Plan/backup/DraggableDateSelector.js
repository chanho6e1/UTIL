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
  const [initialLeft, setInitialLeft] = useState()
  const [initialRight, setInitialRight] = useState()
  const [updatingStartDate, setUpdatingStartDate] = useState(initialStartDate)
  const [updatingEndDate, setUpdatingEndDate] = useState(initialEndDate)
  const [updatingLeft, setUpdatingLeft] = useState(initialLeft)
  const [updatingRight, setUpdatingRight] = useState(initialRight)
  useEffect(() => {
    setInitialLeft(() => dateSelectorBar.current.offsetLeft)
    setInitialRight(() => dateSelectorBar.current.clientWidth)
  }, [dateSelectorBar.current])


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







  const setStartWidth = () => {
    // 시작 위치 지정
    const startYear = initialStartDate.getFullYear()
    const endYear = initialEndDate.getFullYear()
    const startMonth = initialStartDate.getMonth()
    const endMonth = initialEndDate.getMonth()
    const startDate = initialStartDate.getDate()
    const endDate = initialEndDate.getDate()
    const monthDistance = getMonthDistance(initialStartDate, initialEndDate);
    const startMonthLastDay = new Date(initialStartDate.getFullYear(), initialStartDate.getMonth() + 1, 0).getDate()



    const startMonthDaySplit = props.xPointLib[parseInt(`${initialStartDate.getFullYear()}${initialStartDate.getMonth()}`)]
    const endMonthDaySplit = props.xPointLib[parseInt(`${initialEndDate.getFullYear()}${initialEndDate.getMonth()}`)]
    
    
    // if (initialStartDate.getMonth() !== initialEndDate.getMonth()) {
    //   const monthArray = Array(monthDistance).fill().map((el, idx) => {
    //     return new Date(startYear, startMonth + idx + 2, 0)
    //   })
    //   monthArray[0].setDate(startDate)
    //   monthArray[monthArray.length - 1].setDate(endDate)
    //   const daySplit = monthArray.map((el, idx) => {
    //     console.log(idx)
    //     return (el.getDate() * props.xPointLib[parseInt(`${el.getFullYear()}${el.getMonth()}`)])
    //   })
    //   daySplit[0] = ((new Date(monthArray[0].getFullYear(), monthArray[0].getMonth() + 1, 0).getDate() - monthArray[0].getDate()) * props.xPointLib[parseInt(`${monthArray[0].getFullYear()}${monthArray[0].getMonth()}`)])
    //   const barWidth = daySplit.reduce((result, el) => {
    //     return result + el
    //   }, 0)
    //   console.log(daySplit)
    //   dateSelectorBar.current.style.width = barWidth + 'px'
    //   setInitialRight(barWidth)
    // }
    // if (initialStartDate.getMonth() !== initialEndDate.getMonth()) {
    // }
    // if (initialStartDate.getMonth() === initialEndDate.getMonth()) {
    //   dateSelectorBar.current.style.width = (endDate - startDate) * startMonthDaySplit + 'px'
    //   setInitialRight((endDate - startDate) * startMonthDaySplit)
    // }


    const barWidth = props.planGridRef[columnIdx].current[endMonth].offsetLeft - (startMonthDaySplit * startDate) - props.planGridRef[columnIdx].current[startMonth].offsetLeft + (endMonthDaySplit * endDate)
    dateSelectorBar.current.style.width = barWidth + 'px'
    setInitialRight(barWidth)
    
    const barLeft = props.planGridRef[columnIdx].current[startMonth].offsetLeft + (startMonthDaySplit * startDate)
    dateSelectorBar.current.style.left = barLeft + 'px'
    setInitialLeft(barLeft)


    setUpdatingStartDate(initialStartDate)
    setUpdatingEndDate(initialEndDate)
    
  }



  useEffect(() => {
    setStartWidth()
  }, [props.xPointLib])

  useEffect(() => {
    setStartWidth()
  }, [initialStartDate, initialEndDate])





  const [startPeriod, setStartPeriod] = useState(0)
  const [startMoved, setStartMoved] = useState(0)
  const [startMonth, setStartMonth] = useState(initialStartDate.getMonth())
  const [endPeriod, setEndPeriod] = useState(0)
  const [endMoved, setEndMoved] = useState(0)
  const [endMonth, setEndMonth] = useState(initialEndDate.getMonth())


  const onStartSwipeMove = (position = { x: null }) => {
    console.log(initialRight)
    dateSelectorBar.current.style.left = initialLeft + position.x + 'px'
    dateSelectorBar.current.style.width = initialRight + (-position.x) + 'px'
    const xPoint = props.xPointLib[parseInt(`${updatingStartDate.getFullYear()}${updatingStartDate.getMonth()}`)]
    const periodValue = startPeriod - Math.round((-position.x + startMoved) / xPoint)
    const tempDate = new Date(initialStartDate)
    const updatedDate = new Date(tempDate.setDate(tempDate.getDate() + periodValue))
    setUpdatingStartDate(updatedDate)
    if (updatedDate.getMonth() !== startMonth) {
      setStartMoved(position.x)
      setStartPeriod(periodValue)
      setStartMonth(updatedDate.getMonth())
    }
    setPositionx(position.x)
  }



  
  const onEndSwipeMove = (position = { x: null }) => {
    console.log(initialRight)
    dateSelectorBar.current.style.width = initialRight + position.x + 'px'
    const xPoint = props.xPointLib[parseInt(`${updatingEndDate.getFullYear()}${updatingEndDate.getMonth()}`)]
    const periodValue = endPeriod + Math.round((position.x - endMoved) / xPoint)
    const tempDate = new Date(initialEndDate)
    const updatedDate = new Date(tempDate.setDate(tempDate.getDate() + periodValue))
    setUpdatingEndDate(updatedDate)
    if (updatedDate.getMonth() !== endMonth) {
      setEndMoved(position.x)
      setEndPeriod(periodValue)
      setEndMonth(updatedDate.getMonth())
    }
    setPositionx(position.x)
  }




  const onStartSwipeQuit = () => {
    setInitialStartDate(() => updatingStartDate)
    setStartMoved(0)
    setStartPeriod(0)
    setStartMonth(updatingStartDate.getMonth())
    setPositionx(0)

    // dispatch(modifyPlanSliceActions.modifyStartDate(JSON.stringify({idx: props.idx, updatedDate: startDate.toString()})))
    // dispatch(modifyPlanSliceActions.modifyEndDate(JSON.stringify({idx: props.idx, updatedDate: endDate.toString()})))
  }


  const onEndSwipeQuit = () => {
    setInitialEndDate(() => updatingEndDate)
    setEndMoved(0)
    setEndPeriod(0)
    setEndMonth(updatingEndDate.getMonth())
    setPositionx(0)
    
    // dispatch(modifyPlanSliceActions.modifyStartDate(JSON.stringify({idx: props.idx, updatedDate: startDate.toString()})))
    // dispatch(modifyPlanSliceActions.modifyEndDate(JSON.stringify({idx: props.idx, updatedDate: endDate.toString()})))
  }


  



  return (


      <div ref={dateSelectorBar} className={styles['date-selector-bar']} draggable='false'>
        <Swipe className={styles['swiper']} onSwipeStart={(event) => {event.stopPropagation();}} onSwipeEnd={onStartSwipeQuit} onSwipeMove={onStartSwipeMove} allowMouseEvents={true}>
          <div id="left" className={styles['resize-handler']}>
            <div className={styles['start-date-string']}>
              {updatingStartDate.toLocaleString()}
            </div>
          </div>
        </Swipe>
        <div className={styles['center-move-handler']}>
          
        </div>
        <Swipe className={styles['swiper']} onSwipeStart={(event) => {event.stopPropagation();}} onSwipeEnd={onEndSwipeQuit} onSwipeMove={onEndSwipeMove} allowMouseEvents={true}>
          <div id="right" className={styles['resize-handler']}>
            <div className={styles['end-date-string']}>
              {updatingEndDate.toLocaleString()}
            </div>
          </div>
        </Swipe>
      </div>
      

    
  )
}

export default DraggableDateSelector
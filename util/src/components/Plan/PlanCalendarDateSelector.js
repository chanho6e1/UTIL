import React, {useState, useRef, useEffect} from "react";
import Swipe from "react-easy-swipe";
import styles from "./PlanCalendarDateSelector.module.css"
import { useSelector, useDispatch } from 'react-redux'
import { modifyPlanSliceActions } from '../../redux/planSlice'



const PlanCalendarDateSelector = (props) => {
  const dispatch = useDispatch()
  const [positionx, setPositionx] = useState(0)
  const [endSwipe, setEndSwipe] = useState(false)

  const columnIdx = props.idx
  const dateSelectorBar = useRef()
  const [initialStartDate, setInitialStartDate] = useState(new Date(props.startDate))
  const [initialEndDate, setInitialEndDate] = useState(new Date(props.endDate))
  const [initialLeft, setInitialLeft] = useState()
  const [initialRight, setInitialRight] = useState()
  const [updatingStartDate, setUpdatingStartDate] = useState(initialStartDate)
  const [updatingEndDate, setUpdatingEndDate] = useState(initialEndDate)

  useEffect(() => {
    dateSelectorBar.current.style.backgroundColor = "#"+(parseInt(Math.random()*0xffffff)).toString(16)
  }, [])

  const getMonthDistance = (start, end) => {
    const startYear = start.getFullYear()
    const endYear = end.getFullYear()
    const startMonth = start.getMonth()
    const endMonth = end.getMonth()
    const startDate = start.getDate()
    const endDate = end.getDate()
    return ((endYear - startYear) * 12) - startMonth + endMonth;
  }

  const getDayDistance = (start, end) => {
    const diffDate = start.getTime() - end.getTime();
    return Math.abs(diffDate / (1000 * 60 * 60 * 24));
  }



  const setStartWidth = () => {
    if (initialStartDate > initialEndDate) {
      const startDateCorrection = new Date(new Date(initialEndDate).setDate(initialEndDate.getDate() - 1))
      setInitialStartDate(startDateCorrection)
    }
    if (initialEndDate < initialStartDate) {
      const endDateCorrection = new Date(new Date(initialStartDate).setDate(initialStartDate.getDate() + 1))
      setInitialEndDate(endDateCorrection)
    }
    
    const startYear = initialStartDate.getFullYear()
    const endYear = initialEndDate.getFullYear()
    const startMonth = initialStartDate.getMonth()
    const endMonth = initialEndDate.getMonth()
    const startDate = initialStartDate.getDate()
    const endDate = initialEndDate.getDate()
    const startMonthDaySplit = props.xPointLib[parseInt(`${initialStartDate.getFullYear()}${initialStartDate.getMonth()}`)]
    const endMonthDaySplit = props.xPointLib[parseInt(`${initialEndDate.getFullYear()}${initialEndDate.getMonth()}`)]
    const gridStartIdx = getMonthDistance(props.gridStart ,initialStartDate)
    const gridEndIdx = getMonthDistance(props.gridStart, initialEndDate)
    if (props.planGridRef[columnIdx].current.length !== getMonthDistance(props.gridStart, props.gridEnd) + 1) {
      return
    }

    const barWidth = props.planGridRef[columnIdx].current[gridEndIdx].offsetLeft - (startMonthDaySplit * startDate) - props.planGridRef[columnIdx].current[gridStartIdx].offsetLeft + (endMonthDaySplit * endDate)
    const barLeft = props.planGridRef[columnIdx].current[gridStartIdx].offsetLeft + (startMonthDaySplit * startDate)
    
    dateSelectorBar.current.style.transitionDuration = '0.1s'
    dateSelectorBar.current.style.width = barWidth + 'px'
    dateSelectorBar.current.style.left = barLeft + 'px'
    
    setInitialRight(barWidth)
    setInitialLeft(barLeft)
    setUpdatingStartDate(initialStartDate)
    setUpdatingEndDate(initialEndDate)
  }

  useEffect(() => {
    setStartWidth()
  }, [props.xPointLib, initialStartDate, initialEndDate])


  const [startPeriod, setStartPeriod] = useState(0)
  const [startMoved, setStartMoved] = useState(0)
  const [startMonth, setStartMonth] = useState(initialStartDate.getMonth())
  const [endPeriod, setEndPeriod] = useState(0)
  const [endMoved, setEndMoved] = useState(0)
  const [endMonth, setEndMonth] = useState(initialEndDate.getMonth())



  const onStartSwipeMove = (position = { x: null }) => {
    const isValid = new Date(updatingStartDate.getFullYear(), updatingStartDate.getMonth(), updatingStartDate.getDate())
    if (position.x < 0 && (isValid <= props.gridStart || initialStartDate <= props.gridStart)) {
      return
    }
    if (position.x > 0 && (isValid >= initialEndDate || initialStartDate >= initialEndDate)) {
      return
    }
    dateSelectorBar.current.style.transitionDuration = '0s'
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
    const isValid = new Date(updatingEndDate.getFullYear(), updatingEndDate.getMonth(), updatingEndDate.getDate() + 1)
    if (position.x > 0 && (isValid >= props.gridEnd || initialEndDate >= props.gridEnd)) {
      return
    }
    if (position.x < 0 && (isValid <= initialStartDate || initialEndDate <= initialStartDate)) {
      return
    }
    dateSelectorBar.current.style.transitionDuration = '0s'
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



  const onTransferMove = (position = { x: null }) => {
    const isStartValid = new Date(updatingStartDate.getFullYear(), updatingStartDate.getMonth(), updatingStartDate.getDate())
    const isEndValid = new Date(updatingEndDate.getFullYear(), updatingEndDate.getMonth(), updatingEndDate.getDate() + 1)
    if ((position.x < 0 && (isStartValid <= props.gridStart || isStartValid <= props.gridStart)) || (position.x > 0 && (isEndValid >= props.gridEnd || isEndValid >= props.gridEnd))) {
      return
    }
    dateSelectorBar.current.style.transitionDuration = '0s'
    dateSelectorBar.current.style.left = initialLeft + position.x + 'px'
    const xPoint = props.xPointLib[parseInt(`${updatingStartDate.getFullYear()}${updatingStartDate.getMonth()}`)]
    const periodValue = startPeriod - Math.round((-position.x + startMoved) / xPoint)
    const tempDateStart = new Date(initialStartDate)
    const updatedDateStart = new Date(tempDateStart.setDate(tempDateStart.getDate() + periodValue))
    const tempDateEnd = new Date(initialEndDate)
    const updatedDateEnd = new Date(tempDateEnd.setDate(tempDateEnd.getDate() + periodValue))
    setUpdatingStartDate(updatedDateStart)
    setUpdatingEndDate(updatedDateEnd)
    if (updatedDateStart.getMonth() !== startMonth) {
      setStartMoved(position.x)
      setStartPeriod(periodValue)
      setStartMonth(updatedDateStart.getMonth())
    }
    if (updatedDateEnd.getMonth() !== endMonth) {
      setEndMoved(position.x)
      setEndPeriod(periodValue)
      setEndMonth(updatedDateEnd.getMonth())
    }
    setPositionx(position.x)
  }



  const onStartSwipeQuit = () => {
    const isValid = new Date(updatingStartDate.getFullYear(), updatingStartDate.getMonth(), updatingStartDate.getDate())
    if (positionx < 0 && (isValid <= props.gridStart || isValid <= props.gridStart)) {
      props.extendStartRange(1)
      setInitialStartDate(() => props.gridStart)
    } else {
      setInitialStartDate(() => updatingStartDate)
    }
    if (positionx > 0 && (isValid >= initialEndDate || initialStartDate >= initialEndDate)) {
      const startDateCorrection = new Date(new Date(initialEndDate).setDate(initialEndDate.getDate() - 1))
      setInitialStartDate(() => startDateCorrection)
      setStartMonth(startDateCorrection.getMonth())
      
    } else {
      setStartMonth(updatingStartDate.getMonth())
      
    }
    setStartMoved(0)
    setStartPeriod(0)
    setPositionx(0)
    // dispatch(modifyPlanSliceActions.modifyStartDate(JSON.stringify({idx: props.idx, updatedDate: startDate.toString()})))
    // dispatch(modifyPlanSliceActions.modifyEndDate(JSON.stringify({idx: props.idx, updatedDate: endDate.toString()})))
  }


  const onEndSwipeQuit = () => {
    const isValid = new Date(updatingEndDate.getFullYear(), updatingEndDate.getMonth(), updatingEndDate.getDate() + 1)
    if (positionx > 0 && (isValid >= props.gridEnd || isValid >= props.gridEnd)) {
      props.extendEndRange(1)
      setInitialEndDate(() => props.gridEnd)
    } else {
      setInitialEndDate(() => updatingEndDate)
    }
    if (positionx < 0 && (isValid <= initialStartDate || initialEndDate <= initialStartDate)) {
      const endDateCorrection = new Date(new Date(initialStartDate).setDate(initialStartDate.getDate() + 1))
      setInitialEndDate(() => endDateCorrection)
      setEndMonth(endDateCorrection.getMonth())
    } else {
      setEndMonth(updatingEndDate.getMonth())
    }
    setEndMoved(0)
    setEndPeriod(0)
    setPositionx(0)
    // dispatch(modifyPlanSliceActions.modifyStartDate(JSON.stringify({idx: props.idx, updatedDate: startDate.toString()})))
    // dispatch(modifyPlanSliceActions.modifyEndDate(JSON.stringify({idx: props.idx, updatedDate: endDate.toString()})))
  }

  const onTransferSwipeQuit = () => {
    const isStartValid = new Date(updatingStartDate.getFullYear(), updatingStartDate.getMonth(), updatingStartDate.getDate())
    const isEndValid = new Date(updatingEndDate.getFullYear(), updatingEndDate.getMonth(), updatingEndDate.getDate() + 1)
    const dayDistance = getDayDistance(updatingStartDate, updatingEndDate)
    if (positionx < 0 && (isStartValid <= props.gridStart || isStartValid <= props.gridStart)) {
      props.extendStartRange(1)
      const endDateCorrection = new Date(new Date(props.gridStart).setDate(props.gridStart.getDate() + dayDistance))
      setInitialStartDate(() => props.gridStart)
      setInitialEndDate(() => endDateCorrection)
    } else if (positionx > 0 && (isEndValid >= props.gridEnd || isEndValid >= props.gridEnd)) {
      props.extendEndRange(1)
      const startDateCorrection = new Date(new Date(props.gridEnd).setDate(props.gridEnd.getDate() - dayDistance))
      setInitialStartDate(() => startDateCorrection)
      setInitialEndDate(() => props.gridEnd)
    } else {
      setInitialStartDate(() => updatingStartDate)
      setInitialEndDate(() => updatingEndDate)
    }
    setStartMoved(0)
    setEndMoved(0)
    setStartPeriod(0)
    setEndPeriod(0)
    setStartMonth(updatingStartDate.getMonth())
    setEndMonth(updatingEndDate.getMonth())
    setPositionx(0)
    // dispatch(modifyPlanSliceActions.modifyStartDate(JSON.stringify({idx: props.idx, updatedDate: startDate.toString()})))
    // dispatch(modifyPlanSliceActions.modifyEndDate(JSON.stringify({idx: props.idx, updatedDate: endDate.toString()})))
  }


  
  return (
      <div ref={dateSelectorBar} className={styles['date-selector-bar']} draggable='false'>
        <Swipe onSwipeStart={(event) => {event.stopPropagation();}} onSwipeEnd={onStartSwipeQuit} onSwipeMove={onStartSwipeMove} allowMouseEvents={true}>
          <div id="left" className={`${styles['resize-handler']} ${styles['left-resize']}`}>
            <div className={styles['on-mouse-block-left']} />
            <div className={styles['start-date-string']}>
            {updatingStartDate.getFullYear()+"/"+(("00"+(updatingStartDate.getMonth() + 1).toString()).slice(-2))+"/"+(("00"+(updatingStartDate.getDate()).toString()).slice(-2))}
            </div>
          </div>
        </Swipe>
        <Swipe className={styles['center-swiper']} onSwipeStart={(event) => {event.stopPropagation();}} onSwipeEnd={onTransferSwipeQuit} onSwipeMove={onTransferMove} allowMouseEvents={true}>
        <div className={styles['center-move-handler']}>
        </div>
        </Swipe>
        <Swipe onSwipeStart={(event) => {event.stopPropagation();}} onSwipeEnd={onEndSwipeQuit} onSwipeMove={onEndSwipeMove} allowMouseEvents={true}>
          <div id="right" className={`${styles['resize-handler']} ${styles['right-resize']}`}>
            <div className={styles['on-mouse-block-right']} />
            <div className={styles['end-date-string']}>
            {updatingEndDate.getFullYear()+"/"+(("00"+(updatingEndDate.getMonth() + 1).toString()).slice(-2))+"/"+(("00"+(updatingEndDate.getDate()).toString()).slice(-2))}
            </div>
          </div>
        </Swipe>
      </div>
  )
}

export default PlanCalendarDateSelector
import React, {useEffect, useRef, useState} from "react";
import styles from './CalendarBar.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { modifyPlanSliceActions } from '../../redux/planSlice'
import DraggableDateSelector from "./DraggableDateSelector";
import Swipe from "react-easy-swipe";





const CalendarBar = (props) => {
  const planWidthPoint = 10

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

  const getXPointLib = (monthArray, gridWidth) => {
    const lib = {}
    monthArray.map((el, idx) => {
      const year = el.getFullYear()
      const month = el.getMonth()
      const date = el.getDate()
      const xPoint = gridWidth / date
      const key = parseInt(`${year}${month}`)
      lib[key] = Math.ceil(xPoint * 10) / 10 + 0.1
      // lib[key] = xPoint
      console.log(lib)
    })
    setXPointLib(() => lib)
  }


  const plans = useSelector(state => state.planSlice.plans)
  const monthDistance = getMonthDistance(props.startRange, props.endRange);
  const monthRange = Array(monthDistance).fill().map((arr, idx) => {
    return new Date(props.startRange.getFullYear(), props.startRange.getMonth() + idx + 1, 0)
  })
  const planRange = [0, 1, 2, 3]
  const planGridRef = Array(planRange.length).fill(useRef([]), 0, planRange.length)
  const containerRef = useRef()
  const [xPointLib, setXPointLib] = useState({})


  useEffect(() => {
    if (monthRange) {
      getXPointLib(monthRange, planGridRef[0].current[0].clientWidth)
    }
  }, [])




  

  const gridPerPlans = (rowIdx) => {
    const exec = monthRange.map((el, idx) => {
      return (
        <div key={`month-plan-bar-${idx}`}>
          <div ref={el => (planGridRef[rowIdx].current[idx] = el)} id={`month-${props.startRange.getMonth() + idx + 1}`} className={styles['month-plan-bar']}>
            
            
          </div> 
        </div>
      )
    })
    return exec
  }
  
  
  const monthTitleGrid = monthRange.map((el, idx) => {
    return (
      <div key={`month-title-bar-${idx}`}>
        <div className={styles['month-title-bar']}>{props.startRange.getMonth() + idx + 1}월</div>
      </div>
    )
  })


  const totalPlansGrid = planRange.map((el, idx) => {
    const columns = gridPerPlans(idx)
    return (

        <div ref={containerRef} className={styles['month-bar-container']} key={`month-bar-container-${idx}`}>
            {columns}
            <DraggableDateSelector idx={idx} period={plans[idx].period} startDate={plans[idx].startDate} endDate={plans[idx].endDate} planGridRef={planGridRef} xPointLib={xPointLib} />
        </div>

    )
  })



  



  return (
    <div id="date-range" className={styles['date-range-wrapper']}>
      <div className={styles['month-bar-container']}>
        {monthTitleGrid}
      </div>
      {totalPlansGrid}
    </div>
  )
}

export default CalendarBar
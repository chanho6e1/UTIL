import React, {useRef} from "react";
import styles from './CalendarBar.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { modifyPlanSliceActions } from '../../redux/planSlice'
import DraggableDateSelector from "./DraggableDateSelector";

const CalendarBar = (props) => {
  const plans = useSelector(state => state.planSlice.plans)
  const monthRange = Array(props.endRange.getMonth() - props.startRange.getMonth() + 1).fill()
  const planRange = [0, 1, 2, 3]
  const planGridRef = Array(planRange.length).fill(useRef([]), 0, planRange.length)
  
  

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
      <div className={styles['month-bar-container']} key={`month-bar-container-${idx}`}>
          {columns}
          <DraggableDateSelector idx={0} period={plans[0].period} startDate={plans[0].startDate} endDate={plans[0].endDate} planGridRef={planGridRef} />
      </div>
    )
  })



  



  return (
    <div onClick={() => {console.log(planGridRef)}} className={styles['date-range-wrapper']}>
      <div className={styles['month-bar-container']}>
        {monthTitleGrid}
      </div>
      {totalPlansGrid}
    </div>
  )
}

export default CalendarBar
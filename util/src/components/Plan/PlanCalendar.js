import React, {useEffect, useRef, useState} from "react";
import styles from './PlanCalendar.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { modifyPlanSliceActions } from '../../redux/planSlice'
import PlanCalendarDateSelector from "./PlanCalendarDateSelector";
import Swipe from "react-easy-swipe";
import { OverlayScrollbarsComponent, useOverlayScrollbars } from "overlayscrollbars-react";

import PlanTodoListRight from "./PlanTodoListRight";



const PlanCalendar = (props) => {
  const dateRangeWrapperRef = useRef()
  const monthSpaceRef = useRef()
  const monthBarRef = useRef()
  const monthTitleWrapperRef = useRef()
  const scrollRef = useRef();
  const [initialize, instance] = useOverlayScrollbars({ options: { scrollbars: { autoHide: 'scroll' } }, events: { scroll: () => {syncScroll()} }});

  
  useEffect(() => {
    initialize(scrollRef.current);
  }, [initialize]);


  const getMonthDistance = (start, end) => {
    const startYear = start.getFullYear()
    const endYear = end.getFullYear()
    const startMonth = start.getMonth()
    const endMonth = end.getMonth()
    const startDate = start.getDate()
    const endDate = end.getDate()
    return ((endYear - startYear) * 12) - startMonth + endMonth;
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
    })
    setXPointLib(() => lib)
  }


  const plans = props.plans
  const [monthDistance, setMonthDistance] = useState(getMonthDistance(props.startRange, props.endRange) + 1);
  const [monthRange, setMonthRange] = useState(Array(monthDistance).fill().map((arr, idx) => {
    return new Date(props.startRange.getFullYear(), props.startRange.getMonth() + idx + 1, 0)
  }))
  const planGridRef = Array(plans.length).fill(useRef([]), 0, plans.length)
  const containerRef = useRef()
  const [xPointLib, setXPointLib] = useState({})


  useEffect(() => {
    setMonthDistance(getMonthDistance(props.startRange, props.endRange) + 1)
    if (props.columns && dateRangeWrapperRef?.current?.style?.height) {
      dateRangeWrapperRef.current.style.height = (props.columns + 1) * (planGridRef[0].current[0].clientHeight + 2) + 'px'
      
    }
    
  }, [props.startRange, props.endRange])


  useEffect(() => {
    setMonthRange(Array(monthDistance).fill().map((arr, idx) => {
      return new Date(props.startRange.getFullYear(), props.startRange.getMonth() + idx + 1, 0)
    }))

  }, [monthDistance])


  useEffect(() => {
    if (monthRange && planGridRef[0]?.current[0]?.clientWidth) {
      getXPointLib(monthRange, planGridRef[0].current[0].clientWidth)
    }
  }, [monthRange, planGridRef[0]?.current[0]?.clientWidth])



  // useEffect(() => {
  //   // if (containerRef?.current?.scrollWidth) {
  //   //   monthSpaceRef.current.style.width = containerRef.current.scrollWidth + 'px'
  //   //   monthTitleWrapperRef.current.style.width = containerRef.current.scrollWidth + 'px'
  //   // }
  //   monthSpaceRef.current.style.width = containerRef?.current?.scrollWidth + 'px'
  //   monthTitleWrapperRef.current.style.width = containerRef?.current?.scrollWidth + 'px'
  //   // props.plansTitleWrapperRef.current.style.height = props.plansTitleInnerRef.current.clientHeight + 'px'
  // }, [monthRange, props.todoFormVisibility, ])

  



  const monthGridDummy = monthRange.map((el, idx) => {
    return (
      <div key={`month-plan-bar-${idx}`}>
        <div id={`month-${props.startRange.getMonth() + idx + 1}`} className={`${styles['month-plan-bar']} ${plans.length % 2 ? styles['container-odd'] : styles['container-even']}`}>
          
          
        </div> 
      </div>
    )
  })

  
  // 해당 열의 월간 그리드
  const gridPerPlans = (rowIdx) => {
    const exec = monthRange.map((el, idx) => {
      return (
        <div key={`month-plan-bar-${idx}`}>
          <div ref={el => (planGridRef[rowIdx].current[idx] = el)} id={`month-${props.startRange.getMonth() + idx + 1}`} className={`${styles['month-plan-bar']} ${rowIdx % 2 ? styles['container-odd'] : styles['container-even']}`}>
          </div> 
        </div>
      )
    })
    return exec
  }
  
  
  // 월 타이틀 표시
  const monthTitleGrid = monthRange.map((el, idx) => {
    const tempDate = props.startRange
    const tempMonth = new Date(tempDate.getFullYear(), tempDate.getMonth() + idx, 1)
    return (
      <div key={`month-title-bar-${idx}`}>
        <div className={styles['month-title-bar']}>{tempMonth.getFullYear()}년 {tempMonth.getMonth() + 1}월</div>
      </div>
    )
  })


  // 목표의 개수에 따른 열 반복
  const totalPlansGrid = plans.map((el, idx) => {
    const columns = gridPerPlans(idx)
    return (
      <React.Fragment key={`month-bar-container-${el.goalId}`}>
        <div ref={containerRef} className={styles['month-bar-container']} >
          {columns}
          <PlanCalendarDateSelector idx={idx} el={el} todos={props.todos} startDate={el.startDate} endDate={el.endDate} planGridRef={planGridRef} xPointLib={xPointLib} monthRange={monthRange} gridStart={props.startRange} gridEnd={props.endRange} extendStartRange={props.extendStartRange} extendEndRange={props.extendEndRange} />
          
        </div>
        {props.todoFormVisibility[idx] && <PlanTodoListRight applyTodoData={props.applyTodoData} getInputTodoData={props.getInputTodoData} plan={plans[idx]} goalId={plans[idx].goalId} todos={props.todos} scrollRef={scrollRef} containerRef={containerRef} newTodoIdx={props.newTodoIdx} />}
      </React.Fragment>
    )
  })


  const newPlanDummy = (
    <div className={styles['new-plan-dummy']}>
      {monthGridDummy}
    </div>
  )


  const syncScroll = () => {
    monthTitleWrapperRef.current.style.left = -scrollRef.current.children[1].scrollLeft + 'px'
    props.plansTitleWrapperRef.current.style.top = -scrollRef.current.children[1].scrollTop + 'px'
    if (scrollRef.current.children[1].scrollTop !== 0) {
      monthTitleWrapperRef.current.style.boxShadow = '0px 2px 10px 0px rgb(77, 71, 71, 0.2)'
    } else {
      monthTitleWrapperRef.current.style.boxShadow = 'none'
    }
    if (scrollRef.current.children[1].scrollLeft !== 0) {
      props.plansTitleInnerRef.current.style.boxShadow = '2px 0px 10px 0px rgb(77, 71, 71, 0.2)'
    } else {
      props.plansTitleInnerRef.current.style.boxShadow = 'none'
    }
  }


  return (
      <div id="date-range" ref={dateRangeWrapperRef} onClick={() => console.log(planGridRef)} className={styles['date-range-wrapper']}>
        <div ref={monthTitleWrapperRef}  className={styles['month-title-container']} style={{width: `${containerRef?.current?.scrollWidth}px`}}>
          {monthTitleGrid}
        </div>

        <div ref={scrollRef} className={styles['scroll-wrapper']} >
          <div ref={monthBarRef} className={styles['scroll-div']} >
            {totalPlansGrid}
            {props.columns? null : newPlanDummy}
            <div ref={monthSpaceRef} className={styles['month-space']} style={{width: `${containerRef?.current?.scrollWidth}px`}} />
          </div>
        </div>
      </div>
  )
}

export default PlanCalendar
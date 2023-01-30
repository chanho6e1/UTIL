import React from "react";
import styles from './PlanCalendarItem.module.css'
import PlanCalendarDateSelector from "./PlanCalendarDateSelector";
import PlanTodoListRight from "./PlanTodoListRight";

const PlanCalendarItem = (props) => {

  return (
    <React.Fragment key={`month-bar-container-${props.idx}`}>
        <div ref={props.containerRef} className={styles['month-bar-container']} >
          {props.columns}
          <PlanCalendarDateSelector idx={props.idx} planId={props.el.goalId} startDate={props.el.startDate} endDate={props.el.endDate} planGridRef={props.planGridRef} xPointLib={props.xPointLib} monthRange={props.monthRange} gridStart={props.startRange} gridEnd={props.endRange} extendStartRange={props.extendStartRange} extendEndRange={props.extendEndRange} />
          
        </div>
        {props.todoFormVisibility[props.idx] && <PlanTodoListRight goalId={props.el.goalId} todos={props.todos} scrollRef={props.scrollRef} containerRef={props.containerRef} newTodoIdx={props.newTodoIdx} />}
      </React.Fragment>
  )
}

export default PlanCalendarItem
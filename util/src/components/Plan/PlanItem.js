import React from "react";
import arrow from '../../img/arrow.png'
import styles from './PlanItem.module.css'
import PlanTodoListLeft from "./PlanTodoListLeft";


const PlanItem = (props) => {
  
  return (
    <React.Fragment>
      <div  id={`${props.plans[props.idx].goalId}`} className={`${styles['plan-title-bar']} ${props.idx % 2 ? styles['title-odd'] : styles['title-even']}`}>
          <div onClick={props.todoFormToggleHandler.bind(this, props.idx)} className={styles['plan-title-bar-icon-wrapper']}>
              <img className={styles['arrow-icon']} src={arrow} style={{transform: props.todoFormVisibility[props.idx] ? 'rotate(90deg)' : 'none', marginLeft:'13px', width: '12px', height: 'auto'}}/>
          </div>
          <div className={styles['plan-title-bar-button']}> 
              {props.plans[props.idx].title}
              <svg className={styles['delete-icon']} xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"  viewBox="0 0 16 16" style={{color:"rgb(100, 100, 100)"}}>
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
          </div>
      </div>
      {props.todoFormVisibility[props.idx] && <PlanTodoListLeft goalId={props.plans[props.idx].goalId} todos={props.todos} getNewTodoIdx={props.getNewTodoIdx} newTodoIdx={props.newTodoIdx} />}
  </React.Fragment>
  )
}

export default PlanItem
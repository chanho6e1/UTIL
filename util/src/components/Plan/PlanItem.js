import React, {useState} from "react";
import arrow from '../../img/arrow.png'
import styles from './PlanItem.module.css'
import PlanTodoListLeft from "./PlanTodoListLeft";
import { delPlan } from "../../api/Plan/delPlan";
import { modifyPlanSliceActions } from '../../redux/planSlice'
import { useSelector, useDispatch } from 'react-redux'
import { HashRouter, BrowserRouter, Routes, Route, Link, NavLink, Navigate, useNavigate, useMatch, useLocation } from "react-router-dom";

const PlanItem = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isEditMode, setIsEditMode] = useState(false)
  const [titleValue, setTitleValue] = useState(props.plans[props.idx].title)

  const enterEditMode = () => {
      setIsEditMode(true)
  }

  const cancelEditMode = () => {
      setIsEditMode(false)
  }

  const inputChangeHandler = (event) => {
      setTitleValue(event.target.value)
  }

  const deletePlan = () => {
    delPlan(props.plans[props.idx].goalId)
    .then((res) => {
      dispatch(modifyPlanSliceActions.deletePlan(JSON.stringify(props.idx)))
      console.log(props.plans)
    })
    .catch((err) => {
      navigate('/login');
    })
    
    
  }

  const titleEditInput = (
    <input type="text" onBlur={cancelEditMode} onChange={inputChangeHandler} value={titleValue} placeholder="일정을 입력해 주세요." autoFocus className={styles['edit-todo-input']} />
  )

  const titleReadMode = (
    <div onClick={enterEditMode} className={styles['plan-title-bar-button']}> 
        <div className={styles['plan-title']}>
          {props.plans[props.idx].title}
        </div>
        


        <svg onClick={(event) => {event.stopPropagation(); deletePlan()}} className={styles['delete-icon']} xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"  viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>

        
    </div>
  )

  return (
    <React.Fragment>
      <div  id={`${props.plans[props.idx].goalId}`} className={`${styles['plan-title-bar']} ${props.idx % 2 ? styles['title-odd'] : styles['title-even']}`}>
          <div onClick={props.todoFormToggleHandler.bind(this, props.idx)} className={styles['plan-title-bar-icon-wrapper']}>
              <img className={styles['arrow-icon']} src={arrow} style={{transform: props.todoFormVisibility[props.idx] ? 'rotate(90deg)' : 'none', marginLeft:'13px', width: '12px', height: 'auto'}}/>
          </div>

          {isEditMode ? titleEditInput : titleReadMode }
      </div>
      {props.todoFormVisibility[props.idx] && <PlanTodoListLeft goalId={props.plans[props.idx].goalId} todos={props.todos} getNewTodoIdx={props.getNewTodoIdx} newTodoIdx={props.newTodoIdx} />}
  </React.Fragment>
  )
}

export default PlanItem
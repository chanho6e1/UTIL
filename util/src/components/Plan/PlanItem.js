import React, {useState} from "react";
import arrow from '../../img/arrow.png'
import styles from './PlanItem.module.css'
import PlanTodoListLeft from "./PlanTodoListLeft";
import { delPlanAPI } from "../../api/Plan/delPlanAPI";
import { modifyPlanSliceActions } from '../../redux/planSlice'
import { useSelector, useDispatch } from 'react-redux'
import { HashRouter, BrowserRouter, Routes, Route, Link, NavLink, Navigate, useNavigate, useMatch, useLocation } from "react-router-dom";
import { editPlanAPI } from "../../api/Plan/editPlanAPI";
import FixedModal from "../UI/FixedModal/FixedModal";
import Button from "../UI/Button/Button";
import warning from "../../img/Warning.png"

const PlanItem = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isEditMode, setIsEditMode] = useState(false)
  const [titleValue, setTitleValue] = useState(props.plans[props.idx].title)

  const enterEditMode = () => {
      setIsEditMode(true)
  }

  const cancelEditMode = () => {
    const processing = {
      title: titleValue,
      startDate: props.plans[props.idx].startDate,
      endDate: props.plans[props.idx].endDate
    }
    editPlanAPI(props.plans[props.idx].goalId, processing)
    .then((res) => {
        dispatch(modifyPlanSliceActions.responsePlans(JSON.stringify(res)))
    })
    .then((res) => {
      setIsEditMode(false)
    })
      
  }

  const inputChangeHandler = (event) => {
      setTitleValue(event.target.value)
  }


  const deletePlan = () => {
    delPlanAPI(props.plans[props.idx].goalId)
    .then((res) => {
      dispatch(modifyPlanSliceActions.responsePlans(JSON.stringify(res)))
    })

  }
  


  const [askDeleteState, setAskDeleteState] = useState(false)

  const addBtn = [<Button className={styles['delete-button']} onClick={deletePlan}>삭제</Button>,]
  
  const askDeleteForm = (
    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
      <img style={{width:'128px', height:'auto', marginBottom: '12px'}} src={warning} />
      <div>
        <p style={{lineHeight: '40%'}}>삭제 시 복구할 수 없습니다.</p>
        <p style={{lineHeight: '40%'}}>정말로 삭제 하시겠습니까?</p>
      </div>
    </div>
  )

  const askDelete = () => {
    setAskDeleteState(true)
  }


  

  const titleEditInput = (
    <input type="text" onBlur={cancelEditMode} onChange={inputChangeHandler} value={titleValue} placeholder="일정을 입력해 주세요." autoFocus className={styles['edit-todo-input']} />
  )

  const titleReadMode = (
    <div onClick={enterEditMode} className={styles['plan-title-bar-button']}> 
        <div className={styles['plan-title']}>
          {props.plans[props.idx].title}
        </div>
        


        <svg onClick={(event) => {event.stopPropagation(); askDelete()}} className={styles['delete-icon']} xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"  viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>

        
    </div>
  )

  return (
    <React.Fragment>
      <FixedModal modalState={askDeleteState} stateHandler={setAskDeleteState} content={askDeleteForm} addBtn={addBtn} width={300} height={310} />
      <div  id={`${props.plans[props.idx].goalId}`} className={`${styles['plan-title-bar']} ${props.idx % 2 ? styles['title-odd'] : styles['title-even']}`}>
          <div onClick={props.todoFormToggleHandler.bind(this, props.idx, props.el.goalId)} className={styles['plan-title-bar-icon-wrapper']}>
              <img className={styles['arrow-icon']} src={arrow} style={{transform: props.todoFormVisibility[props.idx] ? 'rotate(90deg)' : 'none', marginLeft:'13px', width: '12px', height: 'auto'}}/>
          </div>

          {isEditMode ? titleEditInput : titleReadMode }
      </div>
      {props.todoFormVisibility[props.idx] && <PlanTodoListLeft applyTodoData={props.applyTodoData} getInputTodoData={props.getInputTodoData} goalId={props.plans[props.idx].goalId} todos={props.todos} getNewTodoIdx={props.getNewTodoIdx} newTodoIdx={props.newTodoIdx} />}
  </React.Fragment>
  )
}

export default PlanItem
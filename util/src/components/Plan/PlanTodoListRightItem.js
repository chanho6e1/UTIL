import React, {useState} from "react";
import styles from './PlanTodoListRightItem.module.css'
import { modifyPlanSliceActions } from '../../redux/planSlice'
import { useSelector, useDispatch } from 'react-redux'
import { editTodoAPI } from "../../api/Plan/editTodoAPI";
import { chkTodoAPI } from "../../api/Plan/chkTodoAPI";

const PlanTodoListRightItem = (props) => {

    const dispatch = useDispatch()
    const [isDateEditMode, setIsDateEditMode] = useState(false)
    const [dateValue, setDateValue] = useState(props.toStringByFormatting(props.time))
    const [isDescriptionEditMode, setIsDescriptionEditMode] = useState(false)
    const [descriptionValue, setDescriptionValue] = useState(props.el.description)


    const enterDateEditMode = () => {
        setIsDateEditMode(true)
    }

    const cancelDateEditMode = () => {
        const processing = {
            title: props.el.title,
            description: props.el.description,
            state: props.el.state,
            dueDate: dateValue,
        }
        editTodoAPI(props.el.todoId, props.goalId, processing)
        .then((res) => {
            const proccessing = {
                goalId: props.goalId,
                data: res
            }
            dispatch(modifyPlanSliceActions.responseTodos(JSON.stringify(proccessing)))
        })
        .then((res) => {
            setIsDateEditMode(false)
        })
        
    }

    const dateInputChangeHandler = (event) => {
        setDateValue(event.target.value)
    }

    const enterDescriptionEditMode = () => {
        setIsDescriptionEditMode(true)
    }

    const cancelDescriptionEditMode = () => {
        const processing = {
            title: props.el.title,
            description: descriptionValue,
            state: props.el.state,
            dueDate: props.el.dueDate,
        }
        editTodoAPI(props.el.todoId, props.goalId, processing)
        .then((res) => {
            const proccessing = {
                goalId: props.goalId,
                data: res
            }
            dispatch(modifyPlanSliceActions.responseTodos(JSON.stringify(proccessing)))
            
        })
        .then((res) => {
            setIsDescriptionEditMode(false)
            
            
        })
        
    }

    const descriptionInputChangeHandler = (event) => {
        setDescriptionValue(event.target.value)
    }


    const toggleIsDone = () => {
        chkTodoAPI(props.el.todoId, props.goalId)
        .then((res) => {
            const proccessing = {
                goalId: props.goalId,
                data: res
            }
            dispatch(modifyPlanSliceActions.responseTodos(JSON.stringify(proccessing)))
        })
    }


    const isDoneTrue = (
        <div onClick={toggleIsDone} className={styles['is-done-true-wrapper']}>
            완료됨
        </div>
    )

    const isDoneFalse = (
        <div onClick={toggleIsDone} className={styles['is-done-false-wrapper']}>
            진행중
        </div>
    )

    const dateReadMode = (
        <div onClick={enterDateEditMode} className={styles['todo-duedate-wrapper']}>
            {`${props.time.getFullYear()}년 ${props.time.getMonth() + 1}월 ${props.time.getDate()}일`}, 
        </div>
    )

    const descriptionReadMode = (
        <div onClick={enterDescriptionEditMode} className={styles['todo-description-wrapper']}>
            {props.el.description}
        </div>
    )

    const dateEditInput = (
        <input type="date" onBlur={cancelDateEditMode} onChange={dateInputChangeHandler} value={dateValue} autoFocus className={styles['edit-date-input']} />
    )

    const descriptionEditInput = (
        <input type="text" onBlur={cancelDescriptionEditMode} onChange={descriptionInputChangeHandler} value={descriptionValue} placeholder="메모를 입력해 주세요." autoFocus className={styles['edit-description-input']} />
    )

    return (
        <div className={styles['todo-space-wrapper']} style={{width: `${props.containerRef.current.scrollWidth}px`}}>
            <div className={styles['todo-space']} >
                {props.el.state ? isDoneTrue : isDoneFalse}
                {isDateEditMode ? dateEditInput : dateReadMode}
                {isDescriptionEditMode ? descriptionEditInput : descriptionReadMode}
                
                
            </div>
            {/*  */}
        </div>
    )
}

export default PlanTodoListRightItem
import React, {useState} from "react";
import styles from './PlanTodoListRightItem.module.css'

const PlanTodoListRightItem = (props) => {

    const [isDateEditMode, setIsDateEditMode] = useState(false)
    const [dateValue, setDateValue] = useState(props.time)
    const [isDescriptionEditMode, setIsDescriptionEditMode] = useState(false)
    const [descriptionValue, setDescriptionValue] = useState(props.el.description)


    const enterDateEditMode = () => {
        setIsDateEditMode(true)
    }

    const cancelDateEditMode = () => {
        setIsDateEditMode(false)
    }

    const dateInputChangeHandler = (event) => {
        setDateValue(event.target.value)
    }

    const enterDescriptionEditMode = () => {
        setIsDescriptionEditMode(true)
    }

    const cancelDescriptionEditMode = () => {
        setIsDescriptionEditMode(false)
    }

    const descriptionInputChangeHandler = (event) => {
        setDescriptionValue(event.target.value)
    }


    const isDoneTrue = (
        <div className={styles['is-done-true-wrapper']}>
            완료됨
        </div>
    )

    const isDoneFalse = (
        <div className={styles['is-done-false-wrapper']}>
            진행중
        </div>
    )

    const dateReadMode = (
        <div className={styles['todo-duedate-wrapper']}>
            {`${props.time.getFullYear()}년 ${props.time.getMonth() + 1}월 ${props.time.getDate()}일`}, 
        </div>
    )

    const descriptionReadMode = (
        <div className={styles['todo-description-wrapper']}>
            {props.el.description}
        </div>
    )

    return (
        <div className={styles['todo-space-wrapper']} style={{width: `${props.scrollRef.current.children[1].scrollWidth}px`}}>
            <div className={styles['todo-space']} >
                {props.el.isDone ? isDoneTrue : isDoneFalse}
                
                
                
            </div>
            {/*  */}
        </div>
    )
}

export default PlanTodoListRightItem
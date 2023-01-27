import React, {useState} from "react";
import styles from './PlanTodoListRightItem.module.css'

const PlanTodoListRightItem = (props) => {
    function leftPad(value) {
        if (value >= 10) {
            return value;
        }
    
        return `0${value}`;
    }

    function toStringByFormatting(source, delimiter = '-') {
        const year = source.getFullYear();
        const month = leftPad(source.getMonth() + 1);
        const day = leftPad(source.getDate());
    
        return [year, month, day].join(delimiter);
    }
    
    const [isDateEditMode, setIsDateEditMode] = useState(false)
    const [dateValue, setDateValue] = useState(toStringByFormatting(props.time))
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
        <div className={styles['todo-space-wrapper']} style={{width: `${props.scrollRef.current.children[1].scrollWidth}px`}}>
            <div className={styles['todo-space']} >
                {props.el.isDone ? isDoneTrue : isDoneFalse}
                {isDateEditMode ? dateEditInput : dateReadMode}
                {isDescriptionEditMode ? descriptionEditInput : descriptionReadMode}
                
                
            </div>
            {/*  */}
        </div>
    )
}

export default PlanTodoListRightItem
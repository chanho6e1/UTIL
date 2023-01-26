import React, {useEffect, useRef, useState} from "react";
import styles from './PlanTodoListRight.module.css'

const PlanTodoListRight = (props) => {
    const todoSpaceRef = useRef([])
    const todosRightRef = useRef()





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

    const todoContents = props.todos[props.goalId]?.map((el, idx) => {
        const time = new Date(el.dueDate)
        return (
            <div ref={el => (todoSpaceRef.current[idx] = el)} className={styles['todo-space-wrapper']} style={{width: `${props.scrollRef.current.children[1].scrollWidth}px`}}>
                <div className={styles['todo-space']} >
                    {el.isDone ? isDoneTrue : isDoneFalse}
                    <div className={styles['todo-duedate-wrapper']}>
                        {`${time.getFullYear()}년 ${time.getMonth() + 1}월 ${time.getDate()}일`}, 
                    </div>
                    <div className={styles['todo-description-wrapper']}>
                        {el.description}
                    </div>
                    
                </div>
                {/*  */}
            </div>
        )
    })


    const [newDate, setNewDate] = useState(new Date())

    const newTodoEl = (
        <React.Fragment>
            <div className={styles['new-todo-date']}>{`${newDate.getFullYear()}년 ${newDate.getMonth() + 1}월 ${newDate.getDate()}일`}</div>
            <input type="text" placeholder="메모를 입력해 주세요." className={styles['new-todo-input']} />
        </React.Fragment>
    )

    const newTodo = (
        <div className={styles['new-todo-wrapper']} style={{width: `${props.scrollRef.current.children[1].scrollWidth}px`}}>
            <div className={styles['todo-space']} >
                {(props.newTodoIdx === props.goalId) ? newTodoEl : null}
            </div>
        </div>
    )

    return (
        <div ref={todosRightRef} className={styles['todos-right']} style={{width: `${props.scrollRef.current.children[1].scrollWidth}px`}}>
            
            {newTodo}
            {props.todos[props.goalId] && todoContents}
        </div>
    )
}

export default PlanTodoListRight
import React, {useEffect, useRef, useState} from "react";
import styles from './PlanTodoListRight.module.css'
import PlanTodoListRightItem from "./PlanTodoListRightItem";

const PlanTodoListRight = (props) => {
    const todoSpaceRef = useRef([])
    const todosRightRef = useRef()







    const todoContents = props.todos[props.goalId]?.map((el, idx) => {
        const time = new Date(el.dueDate)
        return (
            <PlanTodoListRightItem el={el} scrollRef={props.scrollRef} time={time} />
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
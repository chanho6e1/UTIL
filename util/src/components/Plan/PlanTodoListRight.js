import React, {useEffect, useRef, useState} from "react";
import styles from './PlanTodoListRight.module.css'
import PlanTodoListRightItem from "./PlanTodoListRightItem";


const PlanTodoListRight = (props) => {



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



    const todoSpaceRef = useRef([])
    const todosRightRef = useRef()

    useEffect(() => {
        console.log(props.todos)
    }, [props.todos])



    const todoContents = props.todos[props.goalId]?.map((el, idx) => {
        return (
            <PlanTodoListRightItem key={`todos-${props.goalId}-${idx}-${el.dueDate}`} plan={props.plan} applyTodoData={props.applyTodoData} getInputTodoData={props.getInputTodoData} toStringByFormatting={toStringByFormatting} el={el} scrollRef={props.scrollRef} containerRef={props.containerRef} time={new Date(el.dueDate)} goalId={props.goalId} />
        )
    })

    const today = toStringByFormatting(new Date())
    const [newTodoDateValue, setNewTodoDateValue] = useState(today)
    const newTodoDateInputHandler = (event) => {
        setNewTodoDateValue(event.target.value)
    }

    const [newTodoDescValue, setNewTodoDescValue] = useState('')
    const newTodoDescInputHandler = (event) => {
        setNewTodoDescValue(event.target.value)
    }

    useEffect(() => {
        props.getInputTodoData(null, newTodoDateValue, newTodoDescValue, props.goalId)
    }, [newTodoDateValue, newTodoDescValue])

    const onEnterNewPlanHandler = (event) => {
        if (event.key === 'Enter') {
            props.applyTodoData()
        }
    }

    useEffect(() => {
        setNewTodoDateValue(today)
        setNewTodoDescValue('')
    }, [(props.newTodoIdx === props.goalId)])

    const newTodoEl = (
        <React.Fragment>
            <input type="date" value={newTodoDateValue} onKeyPress={onEnterNewPlanHandler} onChange={newTodoDateInputHandler} className={styles['new-todo-date-input']} />
            {/* <div className={styles['new-todo-date']}>{`${newDate.getFullYear()}년 ${newDate.getMonth() + 1}월 ${newDate.getDate()}일`}</div> */}
            <input type="text" value={newTodoDescValue} onKeyPress={onEnterNewPlanHandler} onChange={newTodoDescInputHandler} placeholder="메모를 입력해 주세요." className={styles['new-todo-input']} />
        </React.Fragment>
    )

    const newTodo = (
        <div className={styles['new-todo-wrapper']} style={{width: `${props.containerRef?.current?.scrollWidth}px`}}>
            <div className={styles['todo-space']} >
                {(props.newTodoIdx === props.goalId) ? newTodoEl : null}
            </div>
        </div>
    )

    

    return (
        <div ref={todosRightRef} className={styles['todos-right']} style={{width: `${props.containerRef?.current?.scrollWidth}px`}}>
            {newTodo}
            {props.todos[props.goalId] && todoContents}
        </div>
    )
}

export default PlanTodoListRight
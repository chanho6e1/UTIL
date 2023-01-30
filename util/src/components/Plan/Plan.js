import React, {useState, useEffect, useRef, useCallback} from "react";
import styles from './Plan.module.css'
import { HashRouter, BrowserRouter, Routes, Route, Link, NavLink, Navigate, useNavigate, useMatch, useLocation } from "react-router-dom";
import PlanCalendar from "./PlanCalendar";
import { useSelector, useDispatch } from 'react-redux'
import { modifyPlanSliceActions } from '../../redux/planSlice'
import Card from "../UI/Card/Card";
import Modal from "../UI/Modal/Modal";
import { recvPlans } from "../../api/Plan/recvPlans";
import useDidMountEffect from "../../hooks/useDidMountEffect";

import PlanTodoListLeft from "./PlanTodoListLeft";
import PlanItem from "./PlanItem";

const Plan = (props) => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        recvPlans
        .then((res) => {
            dispatch(modifyPlanSliceActions.responsePlans(JSON.stringify(res)))
        })
    }, [])


    const plans = useSelector(state => state.planSlice.plans).slice(0, props.columns)
    const todos = useSelector(state => state.planSlice.todos)
    const prototypeDate = new Date()
    const [startRange, setStartRange] = useState(new Date(prototypeDate.getFullYear(),0,1))
    const [endRange, setEndRange] = useState(new Date(prototypeDate.setFullYear(prototypeDate.getFullYear(),12,0)))
    const planSpaceRef = useRef()
    const plansTitleWrapperRef = useRef()
    const plansTitleInnerRef = useRef()
    const [todoFormVisibility, setTodoFormVisibility] = useState(Array(plans.length).fill(false))

    const todoFormToggleHandler = (idx) => {
        const copyArr = [...todoFormVisibility]
        copyArr[idx] = !copyArr[idx]
        setTodoFormVisibility(() => copyArr)
        console.log(todoFormVisibility)
    }





    const extendStartRange = (amount) => {
        const extendedDate = new Date(startRange.getFullYear(), startRange.getMonth() - amount, 1)
        setStartRange(() => extendedDate)
    }

    const extendEndRange = (amount) => {
        const extendedDate = new Date(endRange.getFullYear(), endRange.getMonth() + amount + 1, 0)
        setEndRange(() => extendedDate)
    }


    const [newTodoIdx, setNewTodoIdx] = useState()
    const getNewTodoIdx = (received) => {
        setNewTodoIdx(received)
    }

    const planTitleGrid = plans.map((el, idx) => {
        return (
            // <React.Fragment>
            //     <div  id={`${plans[idx].goalId}`} className={`${styles['plan-title-bar']} ${idx % 2 ? styles['title-odd'] : styles['title-even']}`} key={`month-title-bar-${idx}`}>
            //         <div onClick={todoFormToggleHandler.bind(this, idx)} className={styles['plan-title-bar-icon-wrapper']}>
            //             <img className={styles['arrow-icon']} src={arrow} style={{transform: todoFormVisibility[idx] ? 'rotate(90deg)' : 'none', marginLeft:'13px', width: '12px', height: 'auto'}}/>
            //         </div>
            //         <div className={styles['plan-title-bar-button']}> 
            //             {plans[idx].title}
            //             <svg className={styles['delete-icon']} xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"  viewBox="0 0 16 16" style={{color:"rgb(100, 100, 100)"}}>
            //                 <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            //                 <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            //             </svg>
            //         </div>
            //     </div>
            //     {todoFormVisibility[idx] && <PlanTodoListLeft goalId={plans[idx].goalId} todos={todos} getNewTodoIdx={getNewTodoIdx} newTodoIdx={newTodoIdx} />}
            // </React.Fragment>
            <PlanItem plans={plans} idx={idx} key={`month-title-bar-${idx}`} todoFormToggleHandler={todoFormToggleHandler} todoFormVisibility={todoFormVisibility} todos={todos} getNewTodoIdx={getNewTodoIdx} newTodoIdx={newTodoIdx}/>
        )
    })

    


    const [newPlan, setNewPlan] = useState(false)

    const newPlanClickShow = () => {
        setNewPlan(true)
    }

    const newPlanClickHide = () => {
        setNewPlan(false)
    }

    const plusImg = (
        <svg xmlns="http://www.w3.org/2000/svg" style={{color:'rgb(100,100,100)', marginLeft:'-5px', marginRight:'7px'}} width="24" height="24" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>
    )

    const newPlanDummy = (
        <div onClick={newPlanClickShow} className={`${styles['plan-title-bar']} ${plans.length % 2 ? styles['title-odd'] : styles['title-even']}`}>
            {newPlan ? <input type="text" onBlur={newPlanClickHide} placeholder="목표를 입력해 주세요." autoFocus className={styles['new-plan-input']} /> : <div className={styles['new-plan']}>{plusImg} 목표 작성</div> }
        </div>
    )
    
    const planCalender = <PlanCalendar columns={props.columns} startRange={startRange} endRange={endRange} extendStartRange={extendStartRange} extendEndRange={extendEndRange} plansTitleWrapperRef={plansTitleWrapperRef} plansTitleInnerRef={plansTitleInnerRef} plans={plans} todoFormVisibility={todoFormVisibility} todos={todos} newTodoIdx={newTodoIdx} />
    
    return (
        <div className={styles['plans-wrapper']}>
            <div className={styles['plans-title-wrapper']} > 
                <div className={styles['plan-title-bar-space']} />
                <div className={styles['plans-titles']} ref={plansTitleWrapperRef}>
                    <div className={styles['plans-titles-inner']} ref={plansTitleInnerRef}>
                        {planTitleGrid}
                        {props.columns? null : newPlanDummy}
                    </div>    
                </div>
                <div ref={planSpaceRef} className={styles['plan-space']} />
            </div>
            {plans && planCalender}
        </div>
    )
}

export default Plan
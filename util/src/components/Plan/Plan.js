import React, {useState, useEffect, useRef, useCallback} from "react";
import styles from './Plan.module.css'
import { HashRouter, BrowserRouter, Routes, Route, Link, NavLink, Navigate, useNavigate, useMatch, useLocation } from "react-router-dom";
import Calendar from "./Calendar";
import { useSelector, useDispatch } from 'react-redux'
import { modifyPlanSliceActions } from '../../redux/planSlice'
import Card from "../UI/Card/Card";
import Modal from "../UI/Modal/Modal";
import AddNewPlan from "./AddNewPlan";
import arrow from '../../img/arrow.png'

const Plan = (props) => {
    const plans = useSelector(state => state.planSlice.plans).slice(0, props.columns)
    const prototypeDate = new Date()
    const [startRange, setStartRange] = useState(new Date(prototypeDate.getFullYear(),0,1))
    const [endRange, setEndRange] = useState(new Date(prototypeDate.setFullYear(prototypeDate.getFullYear(),12,0)))
    const planSpaceRef = useRef()
    const plansTitleWrapperRef = useRef()
    const plansTitleInnerRef = useRef()


    const extendStartRange = (amount) => {
        const extendedDate = new Date(startRange.getFullYear(), startRange.getMonth() - amount, 1)
        setStartRange(() => extendedDate)
    }

    const extendEndRange = (amount) => {
        const extendedDate = new Date(endRange.getFullYear(), endRange.getMonth() + amount + 1, 0)
        setEndRange(() => extendedDate)
    }

    const planTitleGrid = plans.map((el, idx) => {
        return (
            <div className={`${styles['plan-title-bar']} ${idx % 2 ? styles['title-odd'] : styles['title-even']}`} key={`month-title-bar-${idx}`}>
                <img className={styles['arrow-icon']} src={arrow} style={{width: '12px', height: 'auto'}}/>
                {plans[idx].title}
            </div>
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
            <Calendar columns={props.columns} startRange={startRange} endRange={endRange} extendStartRange={extendStartRange} extendEndRange={extendEndRange} plansTitleWrapperRef={plansTitleWrapperRef} plansTitleInnerRef={plansTitleInnerRef} plans={plans} />
        </div>
    )
}

export default Plan
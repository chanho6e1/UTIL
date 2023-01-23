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
    const plans = useSelector(state => state.planSlice.plans).slice(0, props.showRange)
    const prototypeDate = new Date()
    const [startRange, setStartRange] = useState(new Date(prototypeDate.getFullYear(),0,1))
    const [endRange, setEndRange] = useState(new Date(prototypeDate.setFullYear(prototypeDate.getFullYear(),12,0)))






    const extendStartRange = (amount) => {
        const extendedDate = new Date(startRange.getFullYear(), startRange.getMonth() - amount, 1)
        setStartRange(() => extendedDate)
    }

    const extendEndRange = (amount) => {
        const extendedDate = new Date(endRange.getFullYear(), endRange.getMonth() + amount + 1, 0)
        setEndRange(() => extendedDate)
    }

    const planTitleGrid = plans.map((el, idx) => {
        if (idx % 2 === 0) {
            return (
                <div className={`${styles['plan-title-bar']} ${styles['title-even']}`} key={`month-title-bar-${idx}`}>
                    <img className={styles['arrow-icon']} src={arrow} style={{width: '12px', height: 'auto'}}/>
                    {plans[idx].title}
                </div>
            )
        } else {
            return (
                <div className={`${styles['plan-title-bar']} ${styles['title-odd']}`} key={`month-title-bar-${idx}`}>
                    <img className={styles['arrow-icon']} src={arrow} style={{width: '12px', height: 'auto'}}/>
                    {plans[idx].title}
                </div>
            )
        }
        
    })




    

    
    

    return (
        
        <div>
            {/* <div className={styles['plans-navbar']}>
                <div className={styles['navbar-element']}>목표 로드맵</div>
                <div className={styles['navbar-element']} style={{marginTop: '8px'}}>


                </div>
                
            </div> */}
            <div className={styles['plans-wrapper']}>
                <div>
                    
                    <div className={styles['plan-title-bar-space']} />
                    {planTitleGrid}
                    <div className={styles['scroll-bar-space']} />
                </div>
                {/* <div> */}
                <Calendar startRange={startRange} endRange={endRange} extendStartRange={extendStartRange} extendEndRange={extendEndRange} plans={plans} />
                
                {/* </div> */}
            </div>
        </div>

        
    )
}

export default Plan
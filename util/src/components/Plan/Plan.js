import React, {useState, useEffect} from "react";
import styles from './Plan.module.css'

import Calendar from "./Calendar";
import { useSelector, useDispatch } from 'react-redux'
import { modifyPlanSliceActions } from '../../redux/planSlice'
import Card from "../UI/Card/Card";
import arrow from '../../img/arrow.png'

const Plan = (props) => {
    const plans = useSelector(state => state.planSlice.plans)
    const prototypeDate = new Date()
    const [startRange, setStartRange] = useState(new Date(2023,0,1))
    const [endRange, setEndRange] = useState(new Date(prototypeDate.setFullYear(prototypeDate.getFullYear(),6,0)))

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
        
        <div className={styles['plan-page']}>
            <Card className={styles['plans-wrapper']}>
                <div>
                    <div className={styles['plan-title-bar-space']} />
                    {planTitleGrid}
                    <div className={styles['scroll-bar-space']} />
                </div>
                <div>
                <Calendar startRange={startRange} endRange={endRange} extendStartRange={extendStartRange} extendEndRange={extendEndRange} />
                
                </div>
            </Card>
        </div>

        
    )
}

export default Plan
import React, {useState, useEffect} from "react";
import styles from './Plan.module.css'
import DraggableDateSelector from "./DraggableDateSelector";
import CalendarBar from "./CalendarBar";
import { useSelector, useDispatch } from 'react-redux'
import { modifyPlanSliceActions } from '../../redux/planSlice'


const Plan = (props) => {
    
    const plans = useSelector(state => state.planSlice.plans)
    const prototypeDate = new Date()
    const [startRange, setStartRange] = useState(new Date(2023,0,1))
    const [endRange, setEndRange] = useState(new Date(prototypeDate.setFullYear(prototypeDate.getFullYear(),5,0)))

    const extendStartRange = (amount) => {
        const extendedDate = new Date(startRange.getFullYear(), startRange.getMonth() - amount, 1)
        setStartRange(() => extendedDate)
        console.log(extendedDate)
    }

    const extendEndRange = (amount) => {
        const extendedDate = new Date(endRange.getFullYear(), endRange.getMonth() + amount + 1, 0)
        setEndRange(() => extendedDate)
    }



    const planTitleGrid = plans.map((el, idx) => {

        return (

            <div className={styles['plan-title-bar']} key={`month-title-bar-${idx}`}>
            {plans[idx].title}
            </div>

        )
    })


    return (
        <div className={styles['plans-wrapper']}>
            <div>
                <div className={styles['plan-title-bar']} />
                {planTitleGrid}
            </div>
            
        
      
            <CalendarBar startRange={startRange} endRange={endRange} extendStartRange={extendStartRange} extendEndRange={extendEndRange} />
        </div>
    )
}

export default Plan
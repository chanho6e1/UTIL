import React, {useState, useEffect} from "react";

import DraggableDateSelector from "./DraggableDateSelector";


import { useSelector, useDispatch } from 'react-redux'
import { modifyPlanSliceActions } from '../../redux/planSlice'


const Plan = (props) => {
    
    const plans = useSelector(state => state.planSlice.plans)

    
    useEffect(() => {
        console.log(plans)
    }, [])

    
    // const [today, setToday] = useState(new Date('2023-1-15'))
    // const [show, setShow] = useState(today.toLocaleString())
    // useEffect(() => {
    //     today.setDate(today.getDate() + 50)
    //     setToday(() => today)
    //     setShow(() => today.toLocaleString())
    // }, [])
    
    // today.date += 40
    // let year = today.getFullYear(); // 년도
    // let month = today.getMonth() + 1;  // 월
    // let date = today.getDate();  // 날짜 
    
    return (
        <div>
            <DraggableDateSelector period={plans[0].period} startDate={plans[0].startDate} endDate={plans[0].endDate} />
            {plans.name}
        </div>
    )
}

export default Plan
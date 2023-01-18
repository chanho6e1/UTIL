import React, {useState, useEffect} from "react";

import DraggableDateSelector from "./DraggableDateSelector";
import CalendarBar from "./CalendarBar";

import { useSelector, useDispatch } from 'react-redux'
import { modifyPlanSliceActions } from '../../redux/planSlice'


const Plan = (props) => {
    
    const plans = useSelector(state => state.planSlice.plans)
    // const day1 = new Date('2023-1-15')
    // const day2 = new Date('2023-1-20')
    // const day3 = Math.abs((day1.getTime() - day2.getTime()) / (1000 * 60 * 60 * 24))
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

    const prototypeDate = new Date()
    const startRange = new Date(prototypeDate.setFullYear(prototypeDate.getFullYear(),0,1))
    const endRange = new Date(prototypeDate.setFullYear(prototypeDate.getFullYear(),0,0))


    return (
        <div>
            <CalendarBar startRange={startRange} endRange={endRange} />
            
            {/* <div onMouseEnter={() => console.log('touched')} style={{width:'64px', height:'64px', backgroundColor:'black'}}></div> */}
            
            
            

        </div>
    )
}

export default Plan
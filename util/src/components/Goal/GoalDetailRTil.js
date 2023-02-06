import classes from "../Goal/GoalDetail.module.css";
import GoalDetailRTilItem from "./GoalDetailRTilItem";
import { Fragment, useState, useEffect, useRef, useCallback } from "react";


const GoalDetailRTil = (props) => {
  const [tilsArr, settilsArr] = useState([])
  useEffect(() => {
    if (props.tils) {
      settilsArr(Object.values(props.tils))
    }
  }, [props.tils])
  
  console.log(tilsArr)
  return (
    <div className={classes["goal-detail-r-tils"]}>
      <div className={classes["goal-detail-r-tils-title"]}>
        <p>TIL</p>
      </div>
      <ol className={classes["goal-detail-r-tils-item"]}>
        {tilsArr.map((til) => (
          <GoalDetailRTilItem key={`tilId${til.todoId}`} til={til}/>
        ))}
      </ol>
    </div>
  );
};

export default GoalDetailRTil;

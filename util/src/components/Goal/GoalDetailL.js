import classes from "../Goal/GoalDetail.module.css";
import GoalDetailLReview from "./GoalDetailLReview";
import React, {useState, useEffect, useRef, useCallback} from "react";
import PlanCardItem from "../Plan/PlanCard/PlanCardItem"
import { useSelector, useDispatch } from 'react-redux'



const GoalDetailL = (props) => {

  
  return (
    <div className={classes["goal-detail-l"]} >
      <div/>
      <div className={classes["goal-detail-l-in"]}>
        <div>
          <span className={classes["goal-detail-title"]}>{props.plan?.title}</span>
          {/* <img className={classes["goal-detail-state"]} src={run} alt="goal-state" /> */}
        </div>
        <div className={classes["goal-detail-date"]}>
          <p>{props.plan?.startDate} ~ {props.plan?.endDate}</p>
        </div>
        {/* {props.plan !== null && <PlanCardItem plan={props.plan} />} */}
        {/* <GoalDetailLTodo todos={props.todos[props.goal?.goalId]}/> */}
        <GoalDetailLReview reviews={props.reviews[props.plan?.goalId]}/>
      </div>
      <div/>
    </div>
  );
};

export default GoalDetailL;

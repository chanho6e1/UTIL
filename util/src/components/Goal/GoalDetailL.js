import classes from "../Goal/GoalDetail.module.css";
import GoalDetailLReview from "./GoalDetailLReview";
import GoalDetailLTodo from "./GoalDetailLTodo";
import run from "../../img/run.png"
import React, {useState, useEffect, useRef, useCallback} from "react";


const GoalDetailL = (props) => {
  return (
    <div className={classes["goal-detail-l"]} >
      <div/>
      <div className={classes["goal-detail-l-in"]}>
        <div>
          <span className={classes["goal-detail-title"]}>{props.goal?.title}</span>
          <img className={classes["goal-detail-state"]} src={run} alt="goal-state" />
        </div>
        <div className={classes["goal-detail-date"]}>
          <p>{props.goal?.startDate} ~ {props.goal?.endDate}</p>
        </div>
        <GoalDetailLTodo todos={props.todos[props.goal?.goalId]}/>
        <GoalDetailLReview reviews={props.reviews[props.goal?.goalId]}/>
      </div>
      <div/>
    </div>
  );
};

export default GoalDetailL;

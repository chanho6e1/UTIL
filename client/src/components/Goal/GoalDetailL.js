import classes from "../Goal/GoalDetail.module.css";
import GoalDetailLReview from "./GoalDetailLReview";
import React from "react";

const GoalDetailL = (props) => {
  return (
    <div className={classes["goal-detail-l"]}>
      <div />
      <div className={classes["goal-detail-l-in"]}>
        <div>
          <span className={classes["goal-detail-title"]}>
            {props.plan?.title}
          </span>
        </div>
        <div className={classes["goal-detail-title-date"]}>
          {props.plan?.startDate} ~ {props.plan?.endDate}
        </div>
        <GoalDetailLReview
          reviews={props.reviews[props.plan?.goalId]}
          completeToggle={props.completeToggle}
          completeButton={props.completeButton}
        />
      </div>
      <div />
    </div>
  );
};

export default GoalDetailL;

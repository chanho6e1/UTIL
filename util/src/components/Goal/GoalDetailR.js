import classes from "../Goal/GoalDetail.module.css";
import GoalDetailRTil from "./GoalDetailRTil";

const GoalDetailR = (props) => {
  return (
    <div className={classes["goal-detail-r"]}>
      <div/>
      <GoalDetailRTil tils={props.tils[props.plan?.goalId]}/>
      <div/>
    </div>
  );
};

export default GoalDetailR;
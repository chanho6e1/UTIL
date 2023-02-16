import classes from "../Goal/GoalDetail.module.css";
import GoalDetailRTil from "./GoalDetailRTil";
import PlanCardItem from "../Plan/PlanCard/PlanCardItem";

const GoalDetailR = (props) => {
  return (
    <div className={classes["goal-detail-r"]}>
      <div />
      {props.plan !== null && <PlanCardItem plan={props.plan} />}
      <GoalDetailRTil
        tils={props.tils[props.plan?.goalId]?.content}
        prevPage={props.prevPage}
        nextPage={props.nextPage}
        tilPage={props.tilPage}
      />
      <div />
    </div>
  );
};

export default GoalDetailR;

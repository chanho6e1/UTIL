import classes from "./PlanList.module.css";
import Card from "../Card/Card";
import PlanState from "./PlanState";
import { useNavigate } from "react-router-dom";

const PlanList = (props) => {
  const navigate = useNavigate();

  return (
    // <Card>
    <Card
      onClick={() => navigate(`/index/${props.nickname}/goal/${props.plan.goalId}`)}
      className={classes["plan"]}
    >
      <div className={classes['plan-string-wrapper']}>
        <div className={classes["plan-title"]}>{props.plan.title}</div>
        
      </div>
      <div className={classes["plan-date-state-wrapper"]}>
      <div className={classes["plan-date-pc"]}>
          {props.plan.startDate} ~ {props.plan.endDate}
      </div>
      <div className={classes["plan-date-mobile"]}>
          {props.plan.startDate} ~<br/>{props.plan.endDate}
      </div>
      <div className={classes["plan-state"]}>
        
        <PlanState
          state={props.plan.state}
          startDate={props.plan.startDate}
          endDate={props.plan.endDate}
        />
      </div>
      </div>
      
    </Card>
    // </Card>
  );
};

export default PlanList;

import classes from "./PlanList.module.css"
import Card from "../Card/Card"
import PlanState from "./PlanState"
import { useNavigate } from "react-router-dom"


const PlanList = (props) => {
  const navigate = useNavigate()
  
  return (
    <Card>
      <div onClick={() => navigate(`/index/goal/${props.plan.goalId}`)} className={classes['plan']}>
        <div>
          <div className={classes['plan-title']}>{props.plan.title}</div>
          <div className={classes['plan-date']}>{props.plan.startDate} ~ {props.plan.endDate}</div>
        </div>
        <div className={classes['plan-state']}>
          <PlanState state={props.plan.state} startDate={props.plan.startDate} endDate={props.plan.endDate} />
        </div>
      </div>
    </Card>
  )
}

export default PlanList
import classes from "./PlanList.module.css";

const PlanState = (props) => {
  const planComplete = (
    <div className={classes["planComplete-wrapper"]}>완료됨</div>
  );

  const planUnComplete = (
    <div className={classes["planUnComplete-wrapper"]}>미완료</div>
  );

  const planRunning = (
    <div className={classes["planRunning-wrapper"]}>진행중</div>
  );

  const plancomming = (
    <div className={classes["plancomming-wrapper"]}>예정됨</div>
  );

  const nowTime = () => {
    let now = new Date();
    let nowM =
      now.getMonth() + 1 > 9 ? now.getMonth() + 1 : "0" + (now.getMonth() + 1);
    let nowD = now.getDate() > 9 ? now.getDate() : "0" + now.getDate();
    return `${now.getFullYear()}-${nowM}-${nowD}`;
  };

  const isRunning = nowTime() < props.startDate ? plancomming : planRunning;

  const nowState = nowTime() > props.endDate ? planUnComplete : isRunning;

  const isComplete = props.state ? planComplete : nowState;

  return isComplete;
};

export default PlanState;

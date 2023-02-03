import classes from "../Goal/GoalDetail.module.css";
import GoalDetailRTilItem from "./GoalDetailRTilItem";

const GoalDetailRTil = (props) => {
  return (
    <div className={classes["goal-detail-r-tils"]}>
      <div className={classes["goal-detail-r-tils-title"]}>
        <p>TIL</p>
      </div>
      <ol className={classes["goal-detail-r-tils-item"]}>
        {props.tils?.map((til) => (
          <GoalDetailRTilItem key={`tilId${til.todoId}`} til={til}/>
        ))}
      </ol>
    </div>
  );
};

export default GoalDetailRTil;

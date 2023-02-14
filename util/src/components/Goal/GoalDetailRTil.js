import classes from "../Goal/GoalDetail.module.css";
import GoalDetailRTilItem from "./GoalDetailRTilItem";
import { Fragment, useState, useEffect, useRef, useCallback } from "react";
import Card from "../UI/Card/Card";

const GoalDetailRTil = (props) => {
  const [tilsArr, settilsArr] = useState([]);

  useEffect(() => {
    if (props.tils) {
      settilsArr(Object.values(props.tils));
    }
  }, [props.tils]);

  return (
    <Card className={classes["goal-detail-r-tils"]}>
      <div className={classes["goal-detail-r-tils-title"]}>TIL</div>
      <div className={classes["goal-detail-r-tils-item"]}>
        {tilsArr.map((til) => (
          <GoalDetailRTilItem key={`tilId${til.todoId}`} til={til} />
        ))}
      </div>
      <div className={classes["goal-detail-r-tils-page"]}>
        <span
          className={classes["goal-detail-r-tils-page-button"]}
          onClick={props.prevPage}
        >
          prev
        </span>
        <span className={classes["goal-detail-r-tils-page-num"]}>
          {props.tilPage}
        </span>
        <span
          className={classes["goal-detail-r-tils-page-button"]}
          onClick={props.nextPage}
        >
          next
        </span>
      </div>
    </Card>
  );
};

export default GoalDetailRTil;

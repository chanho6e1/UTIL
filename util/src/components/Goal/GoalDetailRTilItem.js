import classes from "../Goal/GoalDetail.module.css";
import { Link } from "react-router-dom";
import React from "react";

const GoalDetailRTilItem = (props) => {
  return (
    <Link
      className={classes["goal-detail-r-tils-item-link"]}
      to={`/index/post/${props.til.postId}`}
    >
      <div className={classes["goal-detail-r-tils-item-title"]}>
        {props.til.title}
      </div>
    </Link>
  );
};

export default GoalDetailRTilItem;

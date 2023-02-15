import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "../Goal/GoalDetail.module.css";
import { Viewer } from "@toast-ui/react-editor";

const GoalDetailLReviewItem = (props) => {
  const navigate = useNavigate();

  const reviewEditHandler = () => {
    navigate(`/edit/review/${props.review.reviewId}`);
  };

  return (
    <li className={classes["goal-detail-reviews-item"]}>
      <div className={classes["goal-detail-reviews-item-title"]}>
        <div className={classes["goal-detail-reviews-item-date"]}>
          {props.review.createdDate}
        </div>
        <div
          className={classes["goal-detail-reviews-item-link"]}
          onClick={reviewEditHandler}
        >
          수정
        </div>
      </div>
      <div className={classes["goal-detail-reviews-item-content"]}>
        <Viewer
          key={props.review.content}
          initialValue={props.review.content}
        />
      </div>
    </li>
  );
};

export default GoalDetailLReviewItem;

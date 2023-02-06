import classes from "../Goal/GoalDetail.module.css";

const GoalDetailLReviewItem = (props) => {
  return (
    <li className={classes["goal-detail-reviews-item"]}>
      <div className={classes["goal-detail-reviews-item-date"]}>{props.review.createdDate}</div>
      <div className={classes["goal-detail-reviews-item-content"]}>{props.review.content}</div>
    </li>
  );
};

export default GoalDetailLReviewItem;

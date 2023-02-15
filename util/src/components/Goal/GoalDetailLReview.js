import classes from "../Goal/GoalDetail.module.css";
import GoalDetailLReviewItem from "./GoalDetailLReviewItem";

const GoalDetailLReview = (props) => {
  return (
    <div className={classes["goal-detail-reviews"]}>
      <div className={classes["goal-detail-reviews-title"]}>회고록</div>
      <div className={classes["goal-detail-reviews-line"]} />
      <ul>
        {props.reviews?.map((review) => (
          <GoalDetailLReviewItem
            key={`reviewId${review.reviewId}`}
            review={review}
          />
          // <li className={classes["goal-detail-reviews-item"]}>
          //   <div className={classes["goal-detail-reviews-item-date"]}>{review.createdDate}</div>
          //   <div className={classes["goal-detail-reviews-item-content"]}>{review.content}</div>
          // </li>
        ))}
      </ul>
    </div> 
  );
};

export default GoalDetailLReview;

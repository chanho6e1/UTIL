import classes from "./DetailItem.module.css";
import bookmarkIcon from "../../assets/bookmarkIcon.svg";
import flatColorLikeIcon from "../../assets/flatColorLikeIcon.svg";
import defaultUserPicture from "../../assets/defaultUserPicture.svg";
import DetailCommentItem from "./DetailCommentItem";

const DetailComment = (props) => {
  return (
    <div className={classes["Detail-comments"]}>
      {props.comments.map((comment) => (
        <DetailCommentItem key={comment.commentId} comment={comment} />
      ))}
    </div>
  );
};

export default DetailComment;

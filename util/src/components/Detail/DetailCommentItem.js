import classes from "./DetailItem.module.css";
import bookmarkIcon from "../../assets/bookmarkIcon.svg";
import flatColorLikeIcon from "../../assets/flatColorLikeIcon.svg";
import defaultUserPicture from "../../assets/defaultUserPicture.svg";
import depth from "../../img/depth.png";
import { Fragment } from "react";

const DetailCommentItem = (props) => {
  return (
    <Fragment>
      <div
        className={
          props.comment.depth === 1 ? classes["Detail-comments-depth"] : null
        }
      >
        {props.comment.depth === 1 ? (
          <img className={classes["depth"]} src={depth} alt="depth" />
        ) : null}
        <div className={classes["Detail-comments-contents"]}>
          <div className={classes["Comment-user"]}>
            <img
              className={classes["Comment-user-picture"]}
              src={
                props.comment.writerInfo.profileImg === null
                  ? defaultUserPicture
                  : props.comment.writerInfo.profileImg
              }
              alt="user"
            />
            <div>
              <div className={classes.commentUser}>
                {props.comment.writerInfo.nickname}
              </div>
              <div className={classes.commentUpdated}>
                {props.comment.createdDate}
              </div>
            </div>
          </div>
          {props.comment.depth === 1 ? (
            <div className={classes.commentParentWriter}>
              {props.comment.parentWriterNickName}님께 답글
            </div>
          ) : null}
          <div className={classes.commentContent}>{props.comment.content}</div>
        </div>
      </div>
      {props.comment.children.map((comment) => (
        // console.log(comment)
        <DetailCommentItem key={comment.commentId} comment={comment} />
      ))}
    </Fragment>
  );
};

export default DetailCommentItem;

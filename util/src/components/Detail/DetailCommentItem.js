import classes from "./DetailItem.module.css";
import bookmarkIcon from "../../assets/bookmarkIcon.svg";
import flatColorLikeIcon from "../../assets/flatColorLikeIcon.svg";
import defaultUserPicture from "../../assets/defaultUserPicture.svg";
import depth from "../../img/depth.png";
import { Fragment, useState, useEffect, useRef, useCallback } from "react";

const DetailCommentItem = (props) => {
  const [depthComment, setdepthComment] = useState(false)

  useEffect(() => {
    if (props.depthCommentIdx !== props.comment.commentId) {
      setdepthComment(false)
    }
  }, [props.depthCommentIdx])

  const openCommentHandler = () => {
    setdepthComment(true)
    props.newdepthCommentIdx(props.comment.commentId)
    console.log(props.depthCommentIdx)
  }
  
  

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
              className={classes["user-picture"]}
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
          <input type="button" onClick={openCommentHandler} value="+"/>
        </div>
        {depthComment && 
          <div className={classes["Detail-comments-input"]}>
            <input type="text" value={props.newCommentContent} onChange={props.newCommentContentInputHandler} placeholder="댓글을 작성해 주세요" onKeyPress={props.onEnterNewCommentHandler}/>
            <input type="checkbox" checked={props.newCommentIsPrivate} onChange={props.newCommentIsPrivateInputHandler} />
            <input type="button" value="댓글 작성"/>
          </div>
        }
      </div>
      {props.comment.children.map((comment) => (
        <DetailCommentItem key={comment.commentId} comment={comment} newCommentContent={props.newCommentContent} newCommentContentInputHandler={props.newCommentContentInputHandler} setnewCommentContent={props.setnewCommentContent} onEnterNewCommentHandler={props.onEnterNewCommentHandler} newCommentIsPrivate={props.newCommentIsPrivate} newCommentIsPrivateInputHandler={props.newCommentIsPrivateInputHandler} setnewCommentIsPrivate={props.setnewCommentIsPrivate} newCommentParentId={props.newCommentParentId} newCommentParentIdInputHandler={props.newCommentParentIdInputHandler} setnewCommentParentId={props.setnewCommentParentId} newComment={props.newComment} depthCommentIdx={props.depthCommentIdx} setdepthCommentIdx={props.setdepthCommentIdx} newdepthCommentIdx={props.newdepthCommentIdx} />
      ))}
    </Fragment>
  );
};

export default DetailCommentItem;

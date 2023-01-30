import classes from "./DetailItem.module.css";
import bookmarkIcon from "../../assets/bookmarkIcon.svg";
import bookmarkfillIcon from "../../assets/bookmarkfillIcon.svg";
import flatColorLikeIcon from "../../assets/flatColorLikeIcon.svg";
import flatColorLikefillIcon from "../../assets/flatColorLikefillIcon.svg";
import defaultUserPicture from "../../assets/defaultUserPicture.svg";
import DetailComment from "../Detail/DetailComment.js";

const DetailItem = (props) => {
  const likeState = false
  const bookmarkState = true

  function toggle(state) {
    if (state) {
      state = false
    }
    else {
      state = true
    }
  }
  
  return (
    <div className={classes.DetailItem}>
      <div className={classes["Detail-text-contents"]}>
        <div className={classes.title}>{props.title}</div>
        <div>
          <div className={classes["Detail-user"]}>
            <img
              className={classes["user-picture"]}
              src={
                props.userpicture === ""
                  ? defaultUserPicture
                  : props.userpicture
              }
              alt="user"
            />
            <span className={classes.username}>{props.username}</span>
            <span className={classes.updated}>{props.updated}</span>
          </div>
          <div className={classes["tag-div"]}>
            <span className={classes.tag}>{props.tag}</span>
            <div className={classes["icons-div"]}>
              {bookmarkState === true
                ? <img src={bookmarkfillIcon} alt="bookmarkfillIcon" onClick={toggle(bookmarkState)}/>
                : <img src={bookmarkIcon} alt="bookmarkIcon" onClick={toggle(bookmarkState)}/>
              }
              <span>
                <img src={flatColorLikeIcon} alt="flatColorLikeIcon" onClick={toggle(likeState)}/>
                <span className={classes["like-count"]}>12</span>
              </span>
            </div>
          </div>
        </div>
        <p className={classes.contents}>{props.contents}</p>
      </div>
      <div  className={classes["Detail-comments"]}>
        <div className={classes["Detail-comments-input"]}>
          <input type="text" placeholder="댓글을 작성해 주세요" />
          <button>댓글 작성</button>
        </div>
        <DetailComment comments={props.comments}/>
      </div>
    </div>
  );
};

export default DetailItem;

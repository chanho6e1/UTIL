import classes from "./DetailItem.module.css";
import bookmarkIcon from "../../assets/bookmarkIcon.svg";
import bookmarkfillIcon from "../../assets/bookmarkfillIcon.svg";
import flatColorLikeIcon from "../../assets/flatColorLikeIcon.svg";
import flatColorLikefillIcon from "../../assets/flatColorLikefillIcon.svg";
import defaultUserPicture from "../../assets/defaultUserPicture.svg";
import DetailComment from "../Detail/DetailComment.js";
import { useSelector, useDispatch } from 'react-redux'
import { HashRouter, BrowserRouter, Routes, Route, Link, NavLink, Navigate, useNavigate, useMatch, useLocation, useParams } from "react-router-dom";
import React, {useState, useEffect, useRef, useCallback} from "react";
import { modifyPlanSliceActions } from '../../redux/planSlice'
import { tilAPI } from "../../api/Detail/tilAPI";
import { tilCommentAPI } from "../../api/Detail/tilCommentAPI";
import { tilCommentNewAPI } from "../../api/Detail/tilCommentNewAPI";


const DetailItem = (props) => {
  const idx = useParams().id
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    tilAPI(idx)
    .catch((err) => {
        navigate('/login');
    })
    .then((res) => {
        dispatch(modifyPlanSliceActions.responsePosts(JSON.stringify(res)))
    })
  }, [])

  useEffect(() => {
    tilCommentAPI(idx)
    .then((res) => {
      const proccessing = {
        postId: idx,
        data: res
    }
    dispatch(modifyPlanSliceActions.responseComments(JSON.stringify(proccessing)))
    })
  }, [])

  const [newCommentContent, setnewCommentContent] = useState('')
  const newCommentContentInputHandler = (event) => {
    setnewCommentContent(event.target.value)
  }

  const [newCommentIsPrivate, setnewCommentIsPrivate] = useState(false)
  const newCommentIsPrivateInputHandler = (event) => {
    setnewCommentIsPrivate(event.target.checked)
  }

  const [newCommentParentId, setnewCommentParentId] = useState(null)
  const newCommentParentIdInputHandler = (event) => {
    setnewCommentParentId(event.target.value)
  }
  
  const newComment = () => {
    const inputCommentData = {
      content: newCommentContent,
      isPrivate: newCommentIsPrivate,
      parentId: newCommentParentId,
      postId: idx,
    }
    if (inputCommentData.content === '') {
        return
    }

    tilCommentNewAPI(idx, inputCommentData)
    .then((res) => {
        const proccessing = {
            postId: idx,
            data: res
        }
        dispatch(modifyPlanSliceActions.responseComments(JSON.stringify(proccessing)))
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const onEnterNewCommentHandler = (event) => {
    if (event.key === 'Enter') {
      newComment()
      setnewCommentContent('')
      setnewCommentIsPrivate(false)
      setnewCommentParentId(null)
    }
  }

  
  const posts = useSelector(state => state.planSlice.posts)
  const comments = useSelector(state => state.planSlice.comments)

  const [depthCommentIdx, setdepthCommentIdx] = useState(null)
  const newdepthCommentIdx = (commentId) => {
    if (commentId !== depthCommentIdx) {
      setdepthCommentIdx(commentId)
    }
  }
  
  return (
    <div className={classes.DetailItem}>
      <div className={classes["Detail-text-contents"]}>
        <div className={classes.title}>{posts?.title}</div>
        <div>
          <div className={classes["Detail-user"]}>
            <img
              className={classes["user-picture"]}
              // src={defaultUserPicture}
              src={
                posts?.writerInfo.profileImg === ""
                  ? defaultUserPicture
                  : posts?.writerInfo.profileImg
              }
              alt="user"
            />
            <span className={classes.username}>{posts?.writerInfo.nickname}</span>
            <span className={classes.updated}>{posts?.createdDate}</span>
          </div>
          <div className={classes["tag-div"]}>
            {/* <span className={classes.tag}>{props.tag}</span> */}
            <div className={classes["icons-div"]}>
              {posts?.bookmarkStatus === true
                ? <img src={bookmarkfillIcon} alt="bookmarkfillIcon"/>
                : <img src={bookmarkIcon} alt="bookmarkIcon"/>
              }
              <span>
                <img src={flatColorLikeIcon} alt="flatColorLikeIcon"/>
                <span className={classes["like-count"]}>{posts?.likeStatusSize}</span>
              </span>
            </div>
          </div>
        </div>
        <p className={classes.contents}>{posts?.content}</p>
      </div>
      <div  className={classes["Detail-comments"]}>
        {/* <div>
          {comments[posts?.postId]?.map((comment) => (
            <DetailComment key={`commentId${comment.commentId}`} comment={comment} newCommentContent={newCommentContent} newCommentContentInputHandler={newCommentContentInputHandler} setnewCommentContent={setnewCommentContent} onEnterNewCommentHandler={onEnterNewCommentHandler} newCommentIsPrivate={newCommentIsPrivate} newCommentIsPrivateInputHandler={newCommentIsPrivateInputHandler} setnewCommentIsPrivate={setnewCommentIsPrivate} newCommentParentId={newCommentParentId} newCommentParentIdInputHandler={newCommentParentIdInputHandler} setnewCommentParentId={setnewCommentParentId} newComment={newComment} depthCommentIdx={depthCommentIdx} setdepthCommentIdx={setdepthCommentIdx} newdepthCommentIdx={newdepthCommentIdx}/>
          ))}
        </div> */}
        <DetailComment comments={comments[posts?.postId]} newCommentContent={newCommentContent} newCommentContentInputHandler={newCommentContentInputHandler} setnewCommentContent={setnewCommentContent} onEnterNewCommentHandler={onEnterNewCommentHandler} newCommentIsPrivate={newCommentIsPrivate} newCommentIsPrivateInputHandler={newCommentIsPrivateInputHandler} setnewCommentIsPrivate={setnewCommentIsPrivate} newCommentParentId={newCommentParentId} newCommentParentIdInputHandler={newCommentParentIdInputHandler} setnewCommentParentId={setnewCommentParentId} newComment={newComment} depthCommentIdx={depthCommentIdx} setdepthCommentIdx={setdepthCommentIdx} newdepthCommentIdx={newdepthCommentIdx}/>
        <div className={classes["Detail-comments-input"]}>
          <input type="text" value={newCommentContent} onChange={newCommentContentInputHandler} placeholder="댓글을 작성해 주세요" onKeyPress={onEnterNewCommentHandler}/>
          <input type="checkbox" checked={newCommentIsPrivate} onChange={newCommentIsPrivateInputHandler} />
          <input type="button" value="댓글 작성"/>
        </div>
      </div>
    </div>
  );
};

export default DetailItem;

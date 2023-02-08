import classes from "./DetailItem.module.css";
import { IconButton } from "@mui/material";
import bookmarkIcon from "../../assets/bookmarkIcon.svg";
import bookmarkfillIcon from "../../assets/bookmarkfillIcon.svg";
import flatColorLikeIcon from "../../assets/flatColorLikeIcon.svg";
import flatColorLikefillIcon from "../../assets/flatColorLikefillIcon.svg";
import defaultUserPicture from "../../assets/defaultUserPicture.svg";
import DetailComment from "../Detail/DetailComment.js";
import { useSelector, useDispatch } from 'react-redux'
import { HashRouter, BrowserRouter, Routes, Route, Link, NavLink, Navigate, useNavigate, useMatch, useLocation, useParams } from "react-router-dom";
import React, {useState, useEffect, useRef, useCallback} from "react";
import { modifyPostDetailSliceActions } from '../../redux/postDetailSlice'
import { tilAPI } from "../../api/Detail/tilAPI";
import { tilCommentAPI } from "../../api/Detail/tilCommentAPI";
import { tilCommentNewAPI } from "../../api/Detail/tilCommentNewAPI";
import { tilUserAPI } from "../../api/Detail/tilUserAPI";
import bookmarkIconFlat from "../../img/BookmarkIconFlat.svg";
import bookmarkIconFill from "../../img/BookmarkIconFill.svg";
import likeIconFlat from "../../img/LikeIconFlat.svg";
import likeIconFill from "../../img/LikeIconFill.svg";
import PhotoCameraIcon from "../../img/photoCameraIcon_gray.png";
import { putLikeToggle } from "../../api/Post/putLikeToggle";
import { putBookmarkToggle } from "../../api/Post/putBookmarkToggle";
import TextArea from "../UI/TextArea/TextArea";
import DetailItemLoading from "./DetailItemLoading";

import { Viewer } from '@toast-ui/react-editor';


const DetailItemShow = (props) => {
  const location = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const post = props.post
  const [userInfo, setuserInfo] = useState(null)
  
  useEffect(() => {
    tilUserAPI()
    .then((res) => {
      setuserInfo(res)
    })
  }, [])

  useEffect(() => {
    tilCommentAPI(post.postId)
    .then((res) => {
      const proccessing = {
        postId: post.postId,
        data: res
    }
    dispatch(modifyPostDetailSliceActions.getComments(JSON.stringify(proccessing)))
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

  const [newDepthCommentContent, setnewDepthCommentContent] = useState('')
  const newDepthCommentContentInputHandler = (event) => {
    setnewDepthCommentContent(event.target.value)
  }

  const [newDepthCommentIsPrivate, setnewDepthCommentIsPrivate] = useState(false)
  const newDepthCommentIsPrivateInputHandler = (event) => {
    setnewDepthCommentIsPrivate(event.target.checked)
  }

  const [newDepthCommentParentId, setnewDepthCommentParentId] = useState(null)
  const newDepthCommentParentIdInputHandler = (event) => {
    setnewDepthCommentParentId(event.target.value)
  }
  
  const newComment = () => {
    const inputCommentData = {
      content: newCommentContent,
      isPrivate: newCommentIsPrivate,
      parentId: null,
      postId: post.postId,
    }
    if (inputCommentData.content === '') {
        return
    }

    tilCommentNewAPI(post.postId, inputCommentData)
    .then((res) => {
        const proccessing = {
            postId: post.postId,
            data: res
        }
        dispatch(modifyPostDetailSliceActions.getComments(JSON.stringify(proccessing)))
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const newDepthComment = () => {
    const inputDepthCommentData = {
      content: newDepthCommentContent,
      isPrivate: newDepthCommentIsPrivate,
      parentId: newDepthCommentParentId,
      postId: post.postId,
    }
    if (inputDepthCommentData.content === '') {
        return
    }

    tilCommentNewAPI(post.postId, inputDepthCommentData)
    .then((res) => {
        const proccessing = {
            postId: post.postId,
            data: res
        }
        dispatch(modifyPostDetailSliceActions.getComments(JSON.stringify(proccessing)))
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
    }
  }

  const onEnterNewDepthCommentHandler = () => {
    newDepthComment()
    setnewDepthCommentContent('')
    setnewDepthCommentIsPrivate(false)
    setnewDepthCommentParentId(null)
  }
  
  const comments = useSelector(state => state.postDetailSlice.comments)
  const [depthCommentIdx, setdepthCommentIdx] = useState(null)
  const newdepthCommentIdx = (commentId) => {
    if (commentId !== depthCommentIdx) {
      setdepthCommentIdx(commentId)
    }
  }

  const [isBookmark, setIsBookmark] = useState(post?.bookmarkStatus);
  const [isLike, setIsLike] = useState(post?.likeStatus);
  const [likeStatusSize, setLikeStatusSize] = useState(post?.likeStatusSize);

  const displayLikeStatusSize = (likeStatusSize) => {
    if (likeStatusSize > 1000) {
      return (likeStatusSize / 1000).toFixed(2) + "k";
    } else {
      return likeStatusSize;
    }
  };

  const imgErrorHandler = (event) => {
    event.target.src = PhotoCameraIcon;
  };

  const bookmarkClickHandler = () => {
    putBookmarkToggle(post.postId).then((res) => {
      if (res === 200) {
        setIsBookmark((prevState) => !prevState);
      }
    });
  };

  const likeClickHandler = () => {
    putLikeToggle(post.postId)
    .then((res) => {
      if (res === 200) {
        if (isLike) {
          setLikeStatusSize((prevState) => prevState - 1);
        } else {
          setLikeStatusSize((prevState) => prevState + 1);
        }
        setIsLike((prevState) => !prevState);
      }
    })
    .catch((err) => {
      console.log('DetailItem : putLikeToggle => ', err)
    })
  };

  const createdDate = new Date(post.createdDate)
  const dateString = `${createdDate.getFullYear()}년 ${createdDate.getMonth()}월 ${createdDate.getDate()}일`

  return (
    <div className={classes.Detail}>

      <div className={classes.DetailItem}>
        <div className={classes["Detail-text-contents"]}>
          <div className={classes.title}>{post.title}</div>
          
          <div className={classes["Detail-info"]}>
            
              <img
                className={classes["user-picture"]}
                // src={defaultUserPicture}
                src={
                  post.writerInfo.profileImg === ""
                    ? defaultUserPicture
                    : post.writerInfo.profileImg
                }
                alt="user"
              />
            <div className={classes["Detail-user"]}>
              <span className={classes.username}>{post.writerInfo.nickname} ·</span>
              <span className={classes['created-date']}>{dateString}</span>
            </div>
            
            
          </div>
          <div className={classes.contents}>
            <Viewer initialValue={post.content} />
            {/* {post.content} */}
          </div>
        </div>





        <div className={classes["tag-div"]}>
          {/* <span className={classes.tag}>{props.tag}</span> */}
          <div className={classes[`icons-div`]}>
            <IconButton
              onClick={bookmarkClickHandler}
              style={{
                paddingTop: 0,
                paddingRight: 0,
                paddingBottom: 0,
                paddingLeft: 0,
                marginRight: 10,
              }}
            >
              <img src={isBookmark ? bookmarkIconFill : bookmarkIconFlat} />
            </IconButton>
            <div className={classes['icons-like']}>
              <IconButton
                onClick={likeClickHandler}
                style={{
                  paddingTop: 0,
                  paddingRight: 0,
                  paddingBottom: 0,
                  paddingLeft: 0,
                }}
              >
                <img src={isLike ? likeIconFill : likeIconFlat} />
              </IconButton>
              <div className={classes[`like-count`]}>{displayLikeStatusSize(likeStatusSize)}</div>
            </div>
            
          </div>
        </div>





        <div  className={classes["Detail-comments"]}>
       
          <div>
            {comments[post.postId]?.map((comment) => (
              <DetailComment key={`commentId${comment.commentId}`} comment={comment} postWriterInfo={post.writerInfo} userInfo={userInfo} newDepthCommentContent={newDepthCommentContent} newDepthCommentContentInputHandler={newDepthCommentContentInputHandler} setnewDepthCommentContent={setnewDepthCommentContent} onEnterNewDepthCommentHandler={onEnterNewDepthCommentHandler} newDepthCommentIsPrivate={newDepthCommentIsPrivate} newDepthCommentIsPrivateInputHandler={newDepthCommentIsPrivateInputHandler} setnewDepthCommentIsPrivate={setnewDepthCommentIsPrivate} newDepthCommentParentId={newDepthCommentParentId} newDepthCommentParentIdInputHandler={newDepthCommentParentIdInputHandler} setnewDepthCommentParentId={setnewDepthCommentParentId} newDepthComment={newDepthComment} depthCommentIdx={depthCommentIdx} setdepthCommentIdx={setdepthCommentIdx} newdepthCommentIdx={newdepthCommentIdx} postId={post.postId} praentDelete={comment.isDelete}/>
            ))}
          </div>
          {/* <DetailComment comments={comments[posts?.postId]} newDepthCommentContent={newDepthCommentContent} newDepthCommentContentInputHandler={newDepthCommentContentInputHandler} setnewDepthCommentContent={setnewDepthCommentContent} onEnterNewDepthCommentHandler={onEnterNewDepthCommentHandler} newDepthCommentIsPrivate={newDepthCommentIsPrivate} newDepthCommentIsPrivateInputHandler={newDepthCommentIsPrivateInputHandler} setnewDepthCommentIsPrivate={setnewDepthCommentIsPrivate} newDepthCommentParentId={newDepthCommentParentId} newDepthCommentParentIdInputHandler={newDepthCommentParentIdInputHandler} setnewDepthCommentParentId={setnewDepthCommentParentId} newDepthComment={newDepthComment} depthCommentIdx={depthCommentIdx} setdepthCommentIdx={setdepthCommentIdx} newdepthCommentIdx={newdepthCommentIdx}/> */}
          <div className={classes["Detail-comments-input"]}>
            <div className={classes["Detail-comments-private"]}>비공개 : 
              <input type="checkbox" checked={newCommentIsPrivate} onChange={newCommentIsPrivateInputHandler} />
            </div>
            <TextArea className={classes['Detail-comments-contents-box']} value={newCommentContent} onChange={newCommentContentInputHandler} placeholder="댓글을 작성해 주세요" onKeyPress={onEnterNewCommentHandler}/>
            {/* <textarea className={classes['Detail-comments-contents-box']} value={newCommentContent} onChange={newCommentContentInputHandler} placeholder="댓글을 작성해 주세요" onKeyPress={onEnterNewCommentHandler}/> */}
          </div>
        </div>
      </div>

    </div>
  );
};


const DetailItem = (props) => {
  const params = useParams().id
  const idx = params ? params : props.id

  const [detail, setDetail] = useState(null)
  useEffect(() => {
    tilAPI(idx)
    .catch((err) => {
        // navigate('/login');
    })
    .then((res) => {
      setDetail(res)
    })
  })

  return (
    <div className={classes['detail-wrapper']}>
      {detail !== null ? <DetailItemShow post={detail} /> : <DetailItemLoading /> }
    </div>
  )
}

export default DetailItem;

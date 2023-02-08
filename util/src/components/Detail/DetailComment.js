import classes from "./DetailItem.module.css";
import bookmarkIcon from "../../assets/bookmarkIcon.svg";
import flatColorLikeIcon from "../../assets/flatColorLikeIcon.svg";
import defaultUserPicture from "../../assets/defaultUserPicture.svg";
import depth from "../../img/depth.png";
import { tilCommentDelAPI } from "../../api/Detail/tilCommentDelAPI";
import { tilCommentEditAPI } from "../../api/Detail/tilCommentEditAPI";
import { Fragment, useState, useEffect, useRef, useCallback } from "react";
import { modifyPostDetailSliceActions } from '../../redux/postDetailSlice'
import { useSelector, useDispatch } from 'react-redux'
import TextArea from "../UI/TextArea/TextArea";


const DetailComment = (props) => {
  const dispatch = useDispatch()
  const [depthComment, setdepthComment] = useState(false)
  const [editCommentOpen, seteditCommentOpen] = useState(false)

  useEffect(() => {
    if (props.depthCommentIdx !== props.comment.commentId) {
      setdepthComment(false)
      seteditCommentOpen(false)
    }
  }, [props.depthCommentIdx])

  const closeAllHandler = () => {
    seteditCommentOpen(false)
    setdepthComment(false)
    seteditCommentContent(props.comment.content)
    seteditCommentIsPrivate(props.comment.isPrivate)
    props.setnewDepthCommentContent("")
    props.setnewDepthCommentIsPrivate(false)
    props.setnewDepthCommentParentId(false)
  }

  const openCommentHandler = () => {
    closeAllHandler()
    setdepthComment(true)
    props.setnewDepthCommentParentId(props.comment.commentId)
    props.newdepthCommentIdx(props.comment.commentId)
  }

  const openEditCommentHandler = () => {
    closeAllHandler()
    seteditCommentOpen(true)
    props.setnewDepthCommentParentId(props.comment.commentId)
    props.newdepthCommentIdx(props.comment.commentId)
  }

  const onEnterNewDepthCommentHandlerAndClose = (event) => {
    if (event.key === 'Enter') {
      props.onEnterNewDepthCommentHandler()
      setdepthComment(false)
    }
  }
  
  const delComment = () => {
    tilCommentDelAPI(props.comment.commentId ,props.postId)
    .then((res) => {
        const proccessing = {
            postId: props.postId,
            data: res
        }
        dispatch(modifyPostDetailSliceActions.getComments(JSON.stringify(proccessing)))
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const [editCommentContent, seteditCommentContent] = useState(props.comment.content)
  const editCommentContentInputHandler = (event) => {
    seteditCommentContent(event.target.value)
  }

  const [editCommentIsPrivate, seteditCommentIsPrivate] = useState(props.comment.isPrivate)
  const editCommentIsPrivateInputHandler = (event) => {
    seteditCommentIsPrivate(event.target.checked)
  }

  const editComment = () => {
    const inputEditCommentData = {
      content: editCommentContent,
      isPrivate: editCommentIsPrivate,
      postId: props.postId,
    }
    tilCommentEditAPI(props.comment.commentId, props.postId, inputEditCommentData)
    .then((res) => {
        const proccessing = {
            postId: props.postId,
            data: res
        }
        dispatch(modifyPostDetailSliceActions.getComments(JSON.stringify(proccessing)))
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const onEnterEditCommentHandler = (event) => {
    if (event.key === 'Enter') {
      editComment()
      seteditCommentOpen(false)
    }
  }
  
  useEffect(() => {
    if (props.comment.children.length === 0 && props.comment.isDelete) {
      delComment()
    }
  }, [props.comment.children])

  const parentDelete = props.comment.isDelete

  const depthImg = (props.comment.depth === 1 ? (
      <img className={classes["depth"]} src={depth} alt="depth" />
    ) : null)
  
  const userImg = (props.comment.writerInfo.profileImg === null
    ? defaultUserPicture
    : props.comment.writerInfo.profileImg)
  
  const parentDeleteDepthMessage = (props.parentDelete
    ?
    <div className={classes.commentParentWriter}>원문이 삭제된 답글입니다.</div>
    :
    <div className={classes.commentParentWriter}>
      {props.comment.parentWriterNickName}님께 답글
    </div>
  )

  const depthMessage = (props.comment.depth === 1 ? (
    parentDeleteDepthMessage
  ) : null)
    
  const depthNewComment = (depthComment 
    ?
    <Fragment>
      <div className={classes["Detail-comments-input"]}>
        <div className={classes["Detail-comments-private"]}>비공개 : 
            <input type="checkbox" checked={props.newDepthCommentIsPrivate} onChange={props.newDepthCommentIsPrivateInputHandler} />
            <span className={classes['link-text']} onClick={closeAllHandler}>취소</span>
        </div>
        <TextArea className={classes['Detail-comments-contents-box']} value={props.newDepthCommentContent} onChange={props.newDepthCommentContentInputHandler} placeholder="답글을 작성해 주세요" onKeyPress={onEnterNewDepthCommentHandlerAndClose}/>
        {/* <textarea className={classes['Detail-comments-contents-box']} value={props.newDepthCommentContent} onChange={props.newDepthCommentContentInputHandler} placeholder="답글을 작성해 주세요" onKeyPress={onEnterNewDepthCommentHandlerAndClose}/> */}
      </div>
      <hr />
    </Fragment>
    :
    null
  )

  const commentItem = (
    <Fragment>
      <div className={classes["Detail-comments-box"]}>
        {depthImg}
        <div className={classes["Detail-comments-contents"]}>
          <div className={classes["Comment-user"]}>
            <img className={classes["user-picture"]} src={userImg} alt="user" />
            <div>
              <div className={classes.commentUser}>
                {props.comment.writerInfo.nickname}
              </div>
              <div className={classes.commentUpdated}>
                {props.comment.createdDate}
              </div>
            </div>
          </div>
          {depthMessage}
          <div className={classes.commentContent}>{props.comment.content}</div>
          <div className={classes["Detail-comments-plus"]}>
            {props.userInfo.userId === props.comment.writerInfo.userId &&
              <Fragment>
                <span className={classes['link-text']} onClick={openEditCommentHandler}>수정</span>
                <span className={classes['link-text']} onClick={delComment}>삭제</span>
              </Fragment>
            }
            <span className={classes['link-text']} onClick={openCommentHandler}>답글 쓰기</span>
            {/* <input type="button" onClick={openEditCommentHandler} value="수정"/>
            <input type="button" onClick={delComment} value="삭제"/>
            <input type="button" onClick={openCommentHandler} value="+"/> */}
          </div>
        </div>
      </div>
      <hr />
      {depthNewComment}   
      {props.comment.children.map((comment) => (
        <DetailComment key={`commentId${comment.commentId}`} comment={comment} postWriterInfo={props.postWriterInfo} userInfo={props.userInfo} newDepthCommentContent={props.newDepthCommentContent} newDepthCommentContentInputHandler={props.newDepthCommentContentInputHandler} setnewDepthCommentContent={props.setnewDepthCommentContent} onEnterNewDepthCommentHandler={props.onEnterNewDepthCommentHandler} newDepthCommentIsPrivate={props.newDepthCommentIsPrivate} newDepthCommentIsPrivateInputHandler={props.newDepthCommentIsPrivateInputHandler} setnewDepthCommentIsPrivate={props.setnewDepthCommentIsPrivate} newDepthCommentParentId={props.newDepthCommentParentId} newDepthCommentParentIdInputHandler={props.newDepthCommentParentIdInputHandler} setnewDepthCommentParentId={props.setnewDepthCommentParentId} newDepthComment={props.newDepthComment} depthCommentIdx={props.depthCommentIdx} setdepthCommentIdx={props.setdepthCommentIdx} newdepthCommentIdx={props.newdepthCommentIdx} postId={props.postId} parentDelete={parentDelete}/>
      ))}
    </Fragment>
  )
  
  const deletedComment = (
    <Fragment>
      <div className={classes["Detail-comments-box"]}>
        {depthImg}
        <div className={classes["Detail-comments-contents"]}>
          <div className={classes.commentContent}>{props.comment.content}</div>
        </div>
      </div>
      <hr />
      {props.comment.children.map((comment) => (
        <DetailComment key={`commentId${comment.commentId}`} comment={comment} postWriterInfo={props.postWriterInfo} userInfo={props.userInfo} newDepthCommentContent={props.newDepthCommentContent} newDepthCommentContentInputHandler={props.newDepthCommentContentInputHandler} setnewDepthCommentContent={props.setnewDepthCommentContent} onEnterNewDepthCommentHandler={props.onEnterNewDepthCommentHandler} newDepthCommentIsPrivate={props.newDepthCommentIsPrivate} newDepthCommentIsPrivateInputHandler={props.newDepthCommentIsPrivateInputHandler} setnewDepthCommentIsPrivate={props.setnewDepthCommentIsPrivate} newDepthCommentParentId={props.newDepthCommentParentId} newDepthCommentParentIdInputHandler={props.newDepthCommentParentIdInputHandler} setnewDepthCommentParentId={props.setnewDepthCommentParentId} newDepthComment={props.newDepthComment} depthCommentIdx={props.depthCommentIdx} setdepthCommentIdx={props.setdepthCommentIdx} newdepthCommentIdx={props.newdepthCommentIdx} postId={props.postId} parentDelete={parentDelete}/>
      ))}
    </Fragment>
  )

  const editCommentBox = (editCommentOpen
    ?
    <Fragment>
      <div className={classes["Detail-comments-box"]}>
        {depthImg}
        <div className={classes["Detail-comments-contents"]}>
          <div className={classes["Comment-user"]}>
            <img className={classes["user-picture"]} src={userImg} alt="user" />
            <div>
              <div className={classes.commentUser}>
                {props.comment.writerInfo.nickname}
              </div>
              <div className={classes.commentUpdated}>
                {props.comment.createdDate}
              </div>
            </div>
          </div>
          {depthMessage}
          <div className={props.comment.depth === 1 ? classes["Detail-comments-depth"] : null}>
            <div className={classes["Detail-comments-input"]}>
              <div className={classes["Detail-comments-private"]}>비공개 : 
                <input type="checkbox" checked={editCommentIsPrivate} onChange={editCommentIsPrivateInputHandler} />
                <span className={classes['link-text']} onClick={closeAllHandler}>취소</span>
              </div>
              <TextArea className={classes['Detail-comments-contents-box']} value={editCommentContent} onChange={editCommentContentInputHandler} onKeyPress={onEnterEditCommentHandler}/>
              {/* <textarea className={classes['Detail-comments-contents-box']} value={editCommentContent} onChange={editCommentContentInputHandler} onKeyPress={onEnterEditCommentHandler}/> */}
            </div>
          </div>
        </div>
      </div>
      <hr />
      {props.comment.children.map((comment) => (
        <DetailComment key={`commentId${comment.commentId}`} comment={comment} postWriterInfo={props.postWriterInfo} userInfo={props.userInfo} newDepthCommentContent={props.newDepthCommentContent} newDepthCommentContentInputHandler={props.newDepthCommentContentInputHandler} setnewDepthCommentContent={props.setnewDepthCommentContent} onEnterNewDepthCommentHandler={props.onEnterNewDepthCommentHandler} newDepthCommentIsPrivate={props.newDepthCommentIsPrivate} newDepthCommentIsPrivateInputHandler={props.newDepthCommentIsPrivateInputHandler} setnewDepthCommentIsPrivate={props.setnewDepthCommentIsPrivate} newDepthCommentParentId={props.newDepthCommentParentId} newDepthCommentParentIdInputHandler={props.newDepthCommentParentIdInputHandler} setnewDepthCommentParentId={props.setnewDepthCommentParentId} newDepthComment={props.newDepthComment} depthCommentIdx={props.depthCommentIdx} setdepthCommentIdx={props.setdepthCommentIdx} newdepthCommentIdx={props.newdepthCommentIdx} postId={props.postId} parentDelete={parentDelete}/>
      ))}
    </Fragment>
    :
    commentItem
  )
  
  const privateComment = (props.userInfo.userId === props.comment.writerInfo.userId || props.postWriterInfo.userId === props.userInfo.userId
    ?
    editCommentBox
    :
    <Fragment>
      <div className={classes["Detail-comments-box"]}>
        {depthImg}
        <div className={classes["Detail-comments-contents"]}>
          <div className={classes.commentContent}>비공개 댓글입니다.</div>
        </div>
      </div>
      <hr />
      {props.comment.children.map((comment) => (
        <DetailComment key={`commentId${comment.commentId}`} comment={comment} postWriterInfo={props.postWriterInfo} userInfo={props.userInfo} newDepthCommentContent={props.newDepthCommentContent} newDepthCommentContentInputHandler={props.newDepthCommentContentInputHandler} setnewDepthCommentContent={props.setnewDepthCommentContent} onEnterNewDepthCommentHandler={props.onEnterNewDepthCommentHandler} newDepthCommentIsPrivate={props.newDepthCommentIsPrivate} newDepthCommentIsPrivateInputHandler={props.newDepthCommentIsPrivateInputHandler} setnewDepthCommentIsPrivate={props.setnewDepthCommentIsPrivate} newDepthCommentParentId={props.newDepthCommentParentId} newDepthCommentParentIdInputHandler={props.newDepthCommentParentIdInputHandler} setnewDepthCommentParentId={props.setnewDepthCommentParentId} newDepthComment={props.newDepthComment} depthCommentIdx={props.depthCommentIdx} setdepthCommentIdx={props.setdepthCommentIdx} newdepthCommentIdx={props.newdepthCommentIdx} postId={props.postId} parentDelete={parentDelete}/>
      ))}
    </Fragment>
  )
  
  const checkPrivate = (props.comment.isPrivate
    ?
    privateComment
    :
    editCommentBox
  )

  const checkChildren = (props.comment.children
    ?
    deletedComment  
    :
    null
  )

  const checkDelete = (props.comment.isDelete
    ?
    checkChildren
    :
    checkPrivate
  )
  
  console.log("댓글 ID", props.comment.writerInfo.userId)
  console.log("유저 ID", props.userInfo.userId)
  console.log("포스트 ID",props.postWriterInfo.userId)

  return (
    checkDelete
  );
};

export default DetailComment;

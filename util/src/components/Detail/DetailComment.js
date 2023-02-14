import classes from "./DetailItem.module.css";
import bookmarkIcon from "../../assets/bookmarkIcon.svg";
import flatColorLikeIcon from "../../assets/flatColorLikeIcon.svg";
import defaultUserPicture from "../../assets/defaultUserPicture.svg";
import depth from "../../img/depth.png";
import { tilCommentDelAPI } from "../../api/Detail/tilCommentDelAPI";
import { tilCommentEditAPI } from "../../api/Detail/tilCommentEditAPI";
import { Fragment, useState, useEffect, useRef, useCallback } from "react";
import { modifyPostDetailSliceActions } from "../../redux/postDetailSlice";
import { useSelector, useDispatch } from "react-redux";
import TextArea from "../UI/TextArea/TextArea";
import Button from "../UI/Button/Button";
import warning from "../../img/Warning.png";
import FixedModal from "../UI/FixedModal/FixedModal";
import { Viewer } from "@toast-ui/react-editor";

const DetailComment = (props) => {
  const dispatch = useDispatch();
  const [depthComment, setdepthComment] = useState(false);
  const [editCommentOpen, seteditCommentOpen] = useState(false);

  useEffect(() => {
    if (props.depthCommentIdx !== props.comment.commentId) {
      setdepthComment(false);
      seteditCommentOpen(false);
    }
  }, [props.depthCommentIdx]);

  const closeAllHandler = () => {
    seteditCommentOpen(false);
    setdepthComment(false);
    seteditCommentContent(props.comment.content);
    seteditCommentIsPrivate(props.comment.isPrivate);
    props.setnewDepthCommentContent("");
    props.setnewDepthCommentIsPrivate(false);
    props.setnewDepthCommentParentId(false);
  };

  const openCommentHandler = () => {
    closeAllHandler();
    setdepthComment(true);
    props.setnewDepthCommentParentId(props.comment.commentId);
    props.newdepthCommentIdx(props.comment.commentId);
  };

  const openEditCommentHandler = () => {
    closeAllHandler();
    seteditCommentOpen(true);
    props.setnewDepthCommentParentId(props.comment.commentId);
    props.newdepthCommentIdx(props.comment.commentId);
  };

  const onEnterNewDepthCommentHandlerAndClose = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      props.onEnterNewDepthCommentHandler();
      setdepthComment(false);
    }
  };

  const onClickNewDepthCommentHandlerAndClose = (event) => {
    props.onEnterNewDepthCommentHandler();
    setdepthComment(false);
  };

  const delComment = () => {
    tilCommentDelAPI(props.comment.commentId, props.postId)
      .then((res) => {
        const proccessing = {
          postId: props.postId,
          data: res,
        };
        dispatch(
          modifyPostDetailSliceActions.getComments(JSON.stringify(proccessing))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [editCommentContent, seteditCommentContent] = useState(
    props.comment.content
  );
  const editCommentContentInputHandler = (event) => {
    seteditCommentContent(event.target.value);
  };

  const [editCommentIsPrivate, seteditCommentIsPrivate] = useState(
    props.comment.isPrivate
  );
  const editCommentIsPrivateInputHandler = (event) => {
    seteditCommentIsPrivate(event.target.checked);
  };

  const editComment = () => {
    const inputEditCommentData = {
      content: editCommentContent,
      isPrivate: editCommentIsPrivate,
      postId: props.postId,
    };
    tilCommentEditAPI(
      props.comment.commentId,
      props.postId,
      inputEditCommentData
    )
      .then((res) => {
        const proccessing = {
          postId: props.postId,
          data: res,
        };
        dispatch(
          modifyPostDetailSliceActions.getComments(JSON.stringify(proccessing))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onEnterEditCommentHandler = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      editComment();
      seteditCommentOpen(false);
    }
  };

  const onClickEditCommentHandler = (event) => {
    editComment();
    seteditCommentOpen(false);
  };

  const [askDeleteCommentState, setAskDeleteCommentState] = useState(false);

  const AskDeleteCommentForm = (props) => {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          style={{ width: "140px", height: "auto", marginBottom: "12px" }}
          src={warning}
        />
        <div>
          <p style={{ lineHeight: "40%" }}>삭제 시 복구할 수 없습니다.</p>
          <p style={{ lineHeight: "40%" }}>정말로 삭제 하시겠습니까?</p>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "12px",
          }}
        >
          <Button className={classes["button"]} onClick={props.modalHandler}>
            취소
          </Button>
          <Button
            className={`${classes["button"]} ${classes["delete-button"]}`}
            onClick={() => {
              delComment();
              props.modalHandler();
            }}
          >
            삭제
          </Button>
        </div>
      </div>
    );
  };

  const askDeleteComment = () => {
    setAskDeleteCommentState(true);
  };

  useEffect(() => {
    if (props.comment.children.length === 0 && props.comment.isDelete) {
      delComment();
    }
  }, [props.comment.children]);

  const parentDelete = props.comment.isDelete;

  const depthImg =
    props.comment.depth === 1 ? (
      <div className={classes["depth-margin"]} />
    ) : null;

  const userImg =
    props.comment.writerInfo.profileImg === null
      ? defaultUserPicture
      : props.comment.writerInfo.profileImg;

  const parentDeleteDepthMessage = props.parentDelete ? (
    <div className={classes.commentParentWriter}>원문이 삭제된 답글입니다.</div>
  ) : (
    <div className={classes.commentParentWriter}>
      {props.comment.parentWriterNickName}님께 답글
    </div>
  );

  const depthMessage =
    props.comment.depth === 1 ? parentDeleteDepthMessage : null;

  const depthNewComment = depthComment ? (
    <Fragment>
      <div className={classes["Detail-comments-input"]}>
        <div className={classes["Detail-comments-private"]}>
          비공개
          <input
            type="checkbox"
            checked={props.newDepthCommentIsPrivate}
            onChange={props.newDepthCommentIsPrivateInputHandler}
          />
        </div>
        <div className={classes["Detail-comments-contents-warpper"]}>
          <TextArea
            className={classes["Detail-comments-contents-box"]}
            value={props.newDepthCommentContent}
            onChange={props.newDepthCommentContentInputHandler}
            placeholder="답글을 작성해 주세요"
          />
          <div className={classes["comments-buttons-wrapper"]}>
            {/* <Button className={classes["solid-button"]} onClick={closeAllHandler}>취소</Button>
            <Button className={classes["solid-button"]} onClick={onClickNewDepthCommentHandlerAndClose}>등록</Button> */}
            <span className={classes["link-text"]} onClick={closeAllHandler}>
              취소
            </span>
            <span
              className={classes["link-text"]}
              onClick={onClickNewDepthCommentHandlerAndClose}
            >
              등록
            </span>
          </div>
        </div>

        {/* <textarea className={classes['Detail-comments-contents-box']} value={props.newDepthCommentContent} onChange={props.newDepthCommentContentInputHandler} placeholder="답글을 작성해 주세요" onKeyPress={onEnterNewDepthCommentHandlerAndClose}/> */}
      </div>
    </Fragment>
  ) : null;

  const createdDate = new Date(props.comment.createdDate);
  const createdDateString = `${createdDate.getFullYear()}년 ${
    createdDate.getMonth() + 1
  }월 ${createdDate.getDate()}일`;

  const commentItem = (
    <Fragment>
      <FixedModal
        modalState={askDeleteCommentState}
        stateHandler={setAskDeleteCommentState}
        content={<AskDeleteCommentForm />}
        width={"300px"}
        height={"310px"}
      />

      <div className={classes["Detail-comments-box"]}>
        {depthImg}
        <div className={classes["Detail-comments-contents"]}>
          <div className={classes["Comment-user"]}>
            <img className={classes["user-picture"]} src={userImg} alt="user" />
            <div className={classes["Comment-user-text"]}>
              <div className={classes.commentUser}>
                {props.comment.writerInfo.nickname}
              </div>
              <div className={classes.commentUpdated}>{createdDateString}</div>
            </div>
          </div>
          {depthMessage}
          <div className={classes.commentContent}>
            <Viewer initialValue={props.comment.content} />
          </div>
          <div className={classes["Detail-comments-plus"]}>
            {props.userInfo.userId === props.comment.writerInfo.userId && (
              <Fragment>
                <span
                  className={classes["link-text"]}
                  onClick={openEditCommentHandler}
                >
                  수정
                </span>
                <span
                  className={classes["link-text"]}
                  onClick={(event) => {
                    event.stopPropagation();
                    askDeleteComment();
                  }}
                >
                  삭제
                </span>
              </Fragment>
            )}
            <span className={classes["link-text"]} onClick={openCommentHandler}>
              답글 쓰기
            </span>
            {/* <input type="button" onClick={openEditCommentHandler} value="수정"/>
            <input type="button" onClick={delComment} value="삭제"/>
            <input type="button" onClick={openCommentHandler} value="+"/> */}
          </div>
        </div>
      </div>

      {depthNewComment}
      {props.comment.children.map((comment) => (
        <DetailComment
          key={`commentId${comment.commentId}`}
          comment={comment}
          postWriterInfo={props.postWriterInfo}
          userInfo={props.userInfo}
          newDepthCommentContent={props.newDepthCommentContent}
          newDepthCommentContentInputHandler={
            props.newDepthCommentContentInputHandler
          }
          setnewDepthCommentContent={props.setnewDepthCommentContent}
          onEnterNewDepthCommentHandler={props.onEnterNewDepthCommentHandler}
          newDepthCommentIsPrivate={props.newDepthCommentIsPrivate}
          newDepthCommentIsPrivateInputHandler={
            props.newDepthCommentIsPrivateInputHandler
          }
          setnewDepthCommentIsPrivate={props.setnewDepthCommentIsPrivate}
          newDepthCommentParentId={props.newDepthCommentParentId}
          newDepthCommentParentIdInputHandler={
            props.newDepthCommentParentIdInputHandler
          }
          setnewDepthCommentParentId={props.setnewDepthCommentParentId}
          newDepthComment={props.newDepthComment}
          depthCommentIdx={props.depthCommentIdx}
          setdepthCommentIdx={props.setdepthCommentIdx}
          newdepthCommentIdx={props.newdepthCommentIdx}
          postId={props.postId}
          parentDelete={parentDelete}
        />
      ))}
    </Fragment>
  );

  const deletedComment = (
    <Fragment>
      <div className={classes["Detail-comments-box"]}>
        {depthImg}
        <div className={classes["Detail-comments-contents"]}>
          <div className={classes.commentContent}>
            <Viewer initialValue={props.comment.content} />
          </div>
        </div>
      </div>

      {props.comment.children.map((comment) => (
        <DetailComment
          key={`commentId${comment.commentId}`}
          comment={comment}
          postWriterInfo={props.postWriterInfo}
          userInfo={props.userInfo}
          newDepthCommentContent={props.newDepthCommentContent}
          newDepthCommentContentInputHandler={
            props.newDepthCommentContentInputHandler
          }
          setnewDepthCommentContent={props.setnewDepthCommentContent}
          onEnterNewDepthCommentHandler={props.onEnterNewDepthCommentHandler}
          newDepthCommentIsPrivate={props.newDepthCommentIsPrivate}
          newDepthCommentIsPrivateInputHandler={
            props.newDepthCommentIsPrivateInputHandler
          }
          setnewDepthCommentIsPrivate={props.setnewDepthCommentIsPrivate}
          newDepthCommentParentId={props.newDepthCommentParentId}
          newDepthCommentParentIdInputHandler={
            props.newDepthCommentParentIdInputHandler
          }
          setnewDepthCommentParentId={props.setnewDepthCommentParentId}
          newDepthComment={props.newDepthComment}
          depthCommentIdx={props.depthCommentIdx}
          setdepthCommentIdx={props.setdepthCommentIdx}
          newdepthCommentIdx={props.newdepthCommentIdx}
          postId={props.postId}
          parentDelete={parentDelete}
        />
      ))}
    </Fragment>
  );

  const editCommentBox = editCommentOpen ? (
    <Fragment>
      <div className={classes["Detail-comments-box"]}>
        {depthImg}
        <div className={classes["Detail-comments-contents"]}>
          <div className={classes["Comment-user"]}>
            <img className={classes["user-picture"]} src={userImg} alt="user" />
            <div className={classes["Comment-user-text"]}>
              <div className={classes.commentUser}>
                {props.comment.writerInfo.nickname}
              </div>
              <div className={classes.commentUpdated}>
                {props.comment.createdDate}
              </div>
            </div>
          </div>
          {depthMessage}
          <div
            className={
              props.comment.depth === 1
                ? classes["Detail-comments-depth"]
                : null
            }
          >
            <div className={classes["Detail-comments-input"]}>
              <div className={classes["Detail-comments-private"]}>
                비공개
                <input
                  type="checkbox"
                  checked={editCommentIsPrivate}
                  onChange={editCommentIsPrivateInputHandler}
                />
              </div>
              <div className={classes["Detail-comments-contents-warpper"]}>
                <TextArea
                  className={classes["Detail-comments-contents-box"]}
                  value={editCommentContent}
                  onChange={editCommentContentInputHandler}
                />
                <div className={classes["comments-buttons-wrapper"]}>
                  {/* <Button className={classes["solid-button"]} onClick={closeAllHandler}>취소</Button>
                  <Button className={classes["solid-button"]} onClick={onClickEditCommentHandler}>등록</Button> */}
                  <span
                    className={classes["link-text"]}
                    onClick={closeAllHandler}
                  >
                    취소
                  </span>
                  <span
                    className={classes["link-text"]}
                    onClick={onClickEditCommentHandler}
                  >
                    등록
                  </span>
                </div>
              </div>
              {/* <textarea className={classes['Detail-comments-contents-box']} value={editCommentContent} onChange={editCommentContentInputHandler} onKeyPress={onEnterEditCommentHandler}/> */}
            </div>
          </div>
        </div>
      </div>
      {/* <hr /> */}
      {props.comment.children.map((comment) => (
        <DetailComment
          key={`commentId${comment.commentId}`}
          comment={comment}
          postWriterInfo={props.postWriterInfo}
          userInfo={props.userInfo}
          newDepthCommentContent={props.newDepthCommentContent}
          newDepthCommentContentInputHandler={
            props.newDepthCommentContentInputHandler
          }
          setnewDepthCommentContent={props.setnewDepthCommentContent}
          onEnterNewDepthCommentHandler={props.onEnterNewDepthCommentHandler}
          newDepthCommentIsPrivate={props.newDepthCommentIsPrivate}
          newDepthCommentIsPrivateInputHandler={
            props.newDepthCommentIsPrivateInputHandler
          }
          setnewDepthCommentIsPrivate={props.setnewDepthCommentIsPrivate}
          newDepthCommentParentId={props.newDepthCommentParentId}
          newDepthCommentParentIdInputHandler={
            props.newDepthCommentParentIdInputHandler
          }
          setnewDepthCommentParentId={props.setnewDepthCommentParentId}
          newDepthComment={props.newDepthComment}
          depthCommentIdx={props.depthCommentIdx}
          setdepthCommentIdx={props.setdepthCommentIdx}
          newdepthCommentIdx={props.newdepthCommentIdx}
          postId={props.postId}
          parentDelete={parentDelete}
        />
      ))}
    </Fragment>
  ) : (
    commentItem
  );

  const privateComment =
    props.userInfo.userId === props.comment.writerInfo.userId ||
    props.postWriterInfo.userId === props.userInfo.userId ? (
      editCommentBox
    ) : (
      <Fragment>
        <div className={classes["Detail-comments-box"]}>
          {depthImg}
          <div className={classes["Detail-comments-contents"]}>
            <div className={classes.commentContent}>비공개 댓글입니다.</div>
          </div>
        </div>
        {/* <hr /> */}
        {props.comment.children.map((comment) => (
          <DetailComment
            key={`commentId${comment.commentId}`}
            comment={comment}
            postWriterInfo={props.postWriterInfo}
            userInfo={props.userInfo}
            newDepthCommentContent={props.newDepthCommentContent}
            newDepthCommentContentInputHandler={
              props.newDepthCommentContentInputHandler
            }
            setnewDepthCommentContent={props.setnewDepthCommentContent}
            onEnterNewDepthCommentHandler={props.onEnterNewDepthCommentHandler}
            newDepthCommentIsPrivate={props.newDepthCommentIsPrivate}
            newDepthCommentIsPrivateInputHandler={
              props.newDepthCommentIsPrivateInputHandler
            }
            setnewDepthCommentIsPrivate={props.setnewDepthCommentIsPrivate}
            newDepthCommentParentId={props.newDepthCommentParentId}
            newDepthCommentParentIdInputHandler={
              props.newDepthCommentParentIdInputHandler
            }
            setnewDepthCommentParentId={props.setnewDepthCommentParentId}
            newDepthComment={props.newDepthComment}
            depthCommentIdx={props.depthCommentIdx}
            setdepthCommentIdx={props.setdepthCommentIdx}
            newdepthCommentIdx={props.newdepthCommentIdx}
            postId={props.postId}
            parentDelete={parentDelete}
          />
        ))}
      </Fragment>
    );

  const checkPrivate = props.comment.isPrivate
    ? privateComment
    : editCommentBox;

  const checkChildren = props.comment.children ? deletedComment : null;

  const checkDelete = props.comment.isDelete ? checkChildren : checkPrivate;

  return checkDelete;
};

export default DetailComment;

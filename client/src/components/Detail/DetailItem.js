import classes from "./DetailItem.module.css";
import { IconButton } from "@mui/material";
import defaultUserPicture from "../../assets/defaultUserPicture.svg";
import DetailComment from "../Detail/DetailComment.js";
import { useSelector, useDispatch } from "react-redux";
import {
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import { modifyPostDetailSliceActions } from "../../redux/postDetailSlice";
import { tilAPI } from "../../api/Detail/tilAPI";
import { tilDeleteAPI } from "../../api/Detail/tilDeleteAPI";
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
import { getPostTag } from "../../api/Post/getPostTag";
import TextArea from "../UI/TextArea/TextArea";
import DetailItemLoading from "./DetailItemLoading";
import TagDataList from "../UI/Tag/TagDataList";
import Swipe from "react-easy-swipe";
import Button from "../UI/Button/Button";
import warning from "../../img/Warning.png";
import FixedModal from "../UI/FixedModal/FixedModal";
import { Viewer } from "@toast-ui/react-editor";





import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";
import prism from "prismjs";
import "prismjs/themes/prism.css";

const DetailItemShow = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const post = props.post;
  const [userInfo, setuserInfo] = useState(null);
  const [tagList, setTagList] = useState(null);

  useEffect(() => {
    tilUserAPI().then((res) => {
      setuserInfo(res);
    });
  }, []);

  useEffect(() => {
    getPostTag(post.postId).then((res) => {
      setTagList(() => res);
    });
  }, []);

  useEffect(() => {
    tilCommentAPI(post.postId).then((res) => {
      const proccessing = {
        postId: post.postId,
        data: res,
      };
      dispatch(
        modifyPostDetailSliceActions.getComments(JSON.stringify(proccessing))
      );
    });
  }, []);

  const [newCommentContent, setnewCommentContent] = useState("");
  const newCommentContentInputHandler = (event) => {
    setnewCommentContent(event.target.value);
  };

  const [newCommentIsPrivate, setnewCommentIsPrivate] = useState(false);
  const newCommentIsPrivateInputHandler = (event) => {
    setnewCommentIsPrivate(event.target.checked);
  };

  const [newDepthCommentContent, setnewDepthCommentContent] = useState("");
  const newDepthCommentContentInputHandler = (event) => {
    setnewDepthCommentContent(event.target.value);
  };

  const [newDepthCommentIsPrivate, setnewDepthCommentIsPrivate] =
    useState(false);
  const newDepthCommentIsPrivateInputHandler = (event) => {
    setnewDepthCommentIsPrivate(event.target.checked);
  };

  const [newDepthCommentParentId, setnewDepthCommentParentId] = useState(null);
  const newDepthCommentParentIdInputHandler = (event) => {
    setnewDepthCommentParentId(event.target.value);
  };

  const newComment = () => {
    const inputCommentData = {
      content: newCommentContent,
      isPrivate: newCommentIsPrivate,
      parentId: null,
      postId: post.postId,
    };
    if (inputCommentData.content === "") {
      return;
    }

    tilCommentNewAPI(post.postId, inputCommentData)
      .then((res) => {
        const proccessing = {
          postId: post.postId,
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

  const newDepthComment = () => {
    const inputDepthCommentData = {
      content: newDepthCommentContent,
      isPrivate: newDepthCommentIsPrivate,
      parentId: newDepthCommentParentId,
      postId: post.postId,
    };
    if (inputDepthCommentData.content === "") {
      return;
    }

    tilCommentNewAPI(post.postId, inputDepthCommentData)
      .then((res) => {
        const proccessing = {
          postId: post.postId,
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

  const onEnterNewCommentHandler = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      newComment();
      setnewCommentContent("");
      setnewCommentIsPrivate(false);
    }
  };

  const onClickNewCommentHandler = (event) => {
    newComment();
    setnewCommentContent("");
    setnewCommentIsPrivate(false);
  };

  const onEnterNewDepthCommentHandler = () => {
    newDepthComment();
    setnewDepthCommentContent("");
    setnewDepthCommentIsPrivate(false);
    setnewDepthCommentParentId(null);
  };

  const comments = useSelector((state) => state.postDetailSlice.comments);
  const [depthCommentIdx, setdepthCommentIdx] = useState(null);
  const newdepthCommentIdx = (commentId) => {
    if (commentId !== depthCommentIdx) {
      setdepthCommentIdx(commentId);
    }
  };

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

  const tagOnClickHandler = (event) => {
    // 태그 클릭시 검색 페이지로 이동
    const tagName = event.currentTarget.getAttribute("value");
    navigate(`/search?tag=${tagName}`);
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
        console.log("DetailItem : putLikeToggle => ", err);
      });
  };

  const createdDate = new Date(post.createdDate);
  const dateString = `${createdDate.getFullYear()}년 ${
    createdDate.getMonth() + 1
  }월 ${createdDate.getDate()}일`;

  const postEditHandler = () => {
    navigate(`/edit/post/${post.postId}`);
  };

  const postDeleteHandler = () => {
    tilDeleteAPI(post.postId)
      .then((res) => {
        navigate(`/`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const commentsRender =
    userInfo &&
    comments[post.postId]?.map((comment) => (
      <DetailComment
        key={`commentId${comment.commentId}-${comment.content}`}
        comment={comment}
        postWriterInfo={post.writerInfo}
        userInfo={userInfo}
        newDepthCommentContent={newDepthCommentContent}
        newDepthCommentContentInputHandler={newDepthCommentContentInputHandler}
        setnewDepthCommentContent={setnewDepthCommentContent}
        onEnterNewDepthCommentHandler={onEnterNewDepthCommentHandler}
        newDepthCommentIsPrivate={newDepthCommentIsPrivate}
        newDepthCommentIsPrivateInputHandler={
          newDepthCommentIsPrivateInputHandler
        }
        setnewDepthCommentIsPrivate={setnewDepthCommentIsPrivate}
        newDepthCommentParentId={newDepthCommentParentId}
        newDepthCommentParentIdInputHandler={
          newDepthCommentParentIdInputHandler
        }
        setnewDepthCommentParentId={setnewDepthCommentParentId}
        newDepthComment={newDepthComment}
        depthCommentIdx={depthCommentIdx}
        setdepthCommentIdx={setdepthCommentIdx}
        newdepthCommentIdx={newdepthCommentIdx}
        postId={post.postId}
        praentDelete={comment.isDelete}
      />
    ));

  const noComment = (
    <div className={classes["no-comment"]}>댓글을 작성해 주세요!</div>
  );

  const [askDeletePostState, setAskDeletePostState] = useState(false);

  const AskDeletePostForm = (props) => {
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
          <p>삭제 시 복구할 수 없습니다. <br/>정말로 삭제 하시겠습니까?</p>
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
              postDeleteHandler();
              props.modalHandler();
            }}
          >
            삭제
          </Button>
        </div>
      </div>
    );
  };

  const askDeletePost = () => {
    setAskDeletePostState(true);
  };

  return (
    <div className={classes.Detail}>
      <FixedModal
        modalState={askDeletePostState}
        stateHandler={setAskDeletePostState}
        content={<AskDeletePostForm />}
        width={"300px"}
        height={"310px"}
      />

      {/* <div className={classes.header}>

      </div> */}
      <div className={classes.DetailItem}>
        <div className={classes["Detail-text-contents"]}>
          <div className={classes.title}>{post.title}</div>

          <div className={classes["Detail-info"]}>
            <div className={classes["Detail-info-inner"]}>
              <img
                className={classes["detail-user-picture"]}
                // src={defaultUserPicture}
                src={
                  post.writerInfo.profileImg === ""
                    ? defaultUserPicture
                    : post.writerInfo.profileImg
                }
                alt="user"
              />
              <div className={classes["Detail-user"]}>
                <span className={classes.username} onClick={() => {navigate(`/index/${post.writerInfo.nickname}`)}}>
                  {post.writerInfo.nickname} ·
                </span>
                <span className={classes["created-date"]}>{dateString}</span>
              </div>
            </div>

            {post?.writerInfo.userId === userInfo?.userId && (
              <div>
                <span
                  onClick={postEditHandler}
                  className={classes["link-text"]}
                >
                  수정
                </span>
                <span
                  onClick={(event) => {
                    event.stopPropagation();
                    askDeletePost();
                  }}
                  className={classes["link-text"]}
                >
                  삭제
                </span>
              </div>
            )}
          </div>

          <div className={classes.contents}>
            <Viewer initialValue={post.content} plugins={[[codeSyntaxHighlight, { highlighter: prism }]]} />
            {/* {post.content} */}
          </div>
        </div>

        <div className={classes["tag-div"]}>
          {/* <span className={classes.tag}>{props.tag}</span> */}
          <div className={classes[`icons-div`]}>
            <div className={classes[`icons-inner-wrapper`]}>
              <div className={classes["icons-bookmark"]}>
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
              </div>
              <div className={classes["icons-like"]}>
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
                <div className={classes[`like-count`]}>
                  {displayLikeStatusSize(likeStatusSize)}
                </div>
              </div>
            </div>

            <div className={classes["icons-tag"]}>
              <Swipe
                onSwipeStart={(event) => {
                  event.stopPropagation();
                }}
              >
                <TagDataList tagList={tagList} onClick={tagOnClickHandler} />
              </Swipe>
            </div>
          </div>
        </div>

        <div className={classes["Detail-comments"]}>
          {comments[post.postId]?.length !== 0 ? (
            <div className={classes["comment-title"]}>댓글 목록</div>
          ) : null}

          <div className={classes["comments-inner-wrapper"]}>
            {comments[post.postId]?.length !== 0 ? commentsRender : noComment}
          </div>

          {/* <DetailComment comments={comments[posts?.postId]} newDepthCommentContent={newDepthCommentContent} newDepthCommentContentInputHandler={newDepthCommentContentInputHandler} setnewDepthCommentContent={setnewDepthCommentContent} onEnterNewDepthCommentHandler={onEnterNewDepthCommentHandler} newDepthCommentIsPrivate={newDepthCommentIsPrivate} newDepthCommentIsPrivateInputHandler={newDepthCommentIsPrivateInputHandler} setnewDepthCommentIsPrivate={setnewDepthCommentIsPrivate} newDepthCommentParentId={newDepthCommentParentId} newDepthCommentParentIdInputHandler={newDepthCommentParentIdInputHandler} setnewDepthCommentParentId={setnewDepthCommentParentId} newDepthComment={newDepthComment} depthCommentIdx={depthCommentIdx} setdepthCommentIdx={setdepthCommentIdx} newdepthCommentIdx={newdepthCommentIdx}/> */}
          <div className={classes["Detail-comments-input"]}>
            <div className={classes["Detail-comments-private"]}>
              비공개
              <input
                type="checkbox"
                checked={newCommentIsPrivate}
                onChange={newCommentIsPrivateInputHandler}
              />
            </div>
            <div className={classes["Detail-comments-contents-warpper"]}>
              <TextArea
                className={classes["Detail-comments-contents-box"]}
                value={newCommentContent}
                onChange={newCommentContentInputHandler}
                placeholder="댓글을 작성해 주세요"
              />
              <div className={classes["comments-buttons-wrapper"]}>
                <span
                  className={classes["link-text"]}
                  onClick={onClickNewCommentHandler}
                >
                  등록
                </span>
                {/* <Button className={classes["solid-button"]} onClick={onClickNewCommentHandler}>등록</Button> */}
              </div>
              {/* <textarea className={classes['Detail-comments-contents-box']} value={newCommentContent} onChange={newCommentContentInputHandler} placeholder="댓글을 작성해 주세요" onKeyPress={onEnterNewCommentHandler}/> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = (props) => {
  const params = useParams().id;
  const idx = params ? params : props.id;

  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);
  useEffect(() => {
    tilAPI(idx)
      .catch((err) => {
        // navigate('/login');
      })
      .then((res) => {
        setDetail(res);
      });

    setTimeout(() => {
      setLoading(() => false);
    }, 500);
  }, []);

  return (

    <div className={classes["detail-wrapper"]}>
      {detail !== null && loading === false ? (
        <DetailItemShow post={detail} />
      ) : (
        <DetailItemLoading />
      )}
    </div>

    
  );
};

export default DetailItem;

import React, { useRef, useState, useEffect } from "react";
import PostTag from "./PostTag";
import Button from "../UI/Button/Button";
import FixedModal from "../UI/FixedModal/FixedModal";
import BlogPostForm from "./BlogPostForm";
import NotiDeliverer from "../UI/StackNotification/NotiDeliverer";
import warning from "../../img/Warning.png";
import { uploadPost } from "../../api/Post/uploadPost";
import { uploadReview } from "../../api/Post/uploadReview";
import {
  useNavigate,
  useMatch,
  useLocation,
  Routes,
  Route,
  useSearchParams,
  useParams,
} from "react-router-dom";
import { recvPlanAPI } from "../../api/Plan/recvPlanAPI";
import { chkPlanAPI } from "../../api/Plan/chkPlanAPI";
import useDidMountEffect from "../../hooks/useDidMountEffect";
import { detailReviewAPI } from "../../api/Goal/detailReviewAPI";

// Toast 에디터
import { Editor } from "@toast-ui/react-editor";
import "./ToastEditor.css";
import styles from "./ToastEditor.module.css";
import { uploadPhoto } from "../../api/Post/uploadPhoto";
import complete from "../../img/Complete.png";

import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";

import "@toast-ui/editor/dist/i18n/ko-kr";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";

import prism from "prismjs";
import "prismjs/themes/prism.css";
import { tilAPI } from "../../api/Detail/tilAPI";
import { getPostTag } from "../../api/Post/getPostTag";
import { editDetailReviewAPI } from "../../api/Goal/editDetailReviewAPI";
import { editPostAPI } from "../../api/Post/editPostAPI";
import { recvIsAllTodosDoneAPI } from "../../api/Plan/recvIsAllTodosDoneAPI";

const ToastEditorForm = (props) => {
  const editorRef = useRef();
  const editorWrapperRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  const today = new Date();
  const dateString = `${today.getFullYear()}년 ${
    today.getMonth() + 1
  }월 ${today.getDate()}일 회고록`;
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState(
    props.forReview
      ? props.editContent
        ? props.editContent.createdDate
        : dateString
      : props.editContent
      ? props.editContent.title
      : ""
  );
  const [content, setContent] = useState(null);
  const [modalState, setModalState] = useState(false);
  const [scope, setScope] = useState();
  const [bindedGoal, setBindedGoal] = useState(
    searchParams.get("goal_id") ? searchParams.get("goal_id") : null
  );
  const [queryString, setQueryString] = useState({
    goal: null,
    takeStep: null,
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const goalId = searchParams.get("goal_id");
    const takeStep = searchParams.get("step");

    if (goalId) {
      recvPlanAPI(goalId).then((res) => {
        setQueryString((prev) => {
          return { ...prev, goal: res, takeStep };
        });
      });
    }
  }, []);

  const navigateToReviewPost = () => {
    navigate(`/create/review?goal_id=${queryString.goal.goalId}`, {
      replace: true,
    });
  };

  const postSubmitHandler = (selectedScope, selectedGoalId) => {
    uploadPost(
      {
        title: title,
        content: editorRef.current.getInstance().getHTML(),
        postFileList: images,
        isPrivate: selectedScope,
        goalId: selectedGoalId,
      },
      { skill: tags }
    )
      .then((res) => {
        if (selectedGoalId) {
          recvIsAllTodosDoneAPI(selectedGoalId).then((res) => {
            if (res === true) {
              setDoneNotiContent(message3);
              setTimeout(function () {
                navigate("/index", { replace: true });
              }, 1000);
            } else {
              setDoneNotiContent(message2);
              setTimeout(function () {
                navigate("/index", { replace: true });
              }, 1000);
            }
          });
        } else {
          navigate("/index", { replace: true });
        }
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const reviewSubmitHandler = (selectedGoalId) => {
    uploadReview(selectedGoalId, {
      title: title,
      content: editorRef.current.getInstance().getHTML(),
    })
      .then((res) => {
        if (selectedGoalId) {
          recvIsAllTodosDoneAPI(selectedGoalId).then((res) => {
            if (res === true) {
              chkPlanAPI(queryString.goal.goalId, true)
                .then((res) => {
                  setDoneNotiContent(message1);
                  // setDoneNotiState(true)
                })
                .then((res) => {
                  setTimeout(function () {
                    navigate("/index", { replace: true });
                  }, 1000);
                });
            } else {
              navigate("/index", { replace: true });
            }
          });
        } else {
          navigate("/index", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const reviewEditHandler = () => {
    editDetailReviewAPI(props.editIdx, {
      title: title,
      content: editorRef.current.getInstance().getHTML(),
    })
      .then((res) => {
        navigate("/index", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postEditHandler = () => {
    editPostAPI(
      {
        title: title,
        content: editorRef.current.getInstance().getHTML(),
        postFileList: images,
        isPrivate: props.editContent.isPrivate,
        goalId: props.editContent.goalId,
      },
      { skill: tags },
      props.editIdx
    ).then((res) => {
      navigate("/index", { replace: true });
    });
  };

  const titleInputHandler = (event) => {
    setTitle(() => event.target.value);
  };

  const clickSubmitHandler = () => {
    const isValid = editorRef.current.getInstance().getMarkdown();
    if (title.trim() === "") {
      setAlertText("글 제목을 작성해야 합니다.");
      setAlertNotiState(true);
    } else if (isValid === "") {
      setAlertText("글 내용을 작성해야 합니다.");
      setAlertNotiState(true);
    } else {
      setContent(editorRef.current.getInstance().getHTML());

      if (props.edit === true) {
        if (props.forReview === true) {
          reviewEditHandler();
        } else {
          postEditHandler();
        }
      } else {
        setModalState(true);
      }
    }
  };

  const [alertText, setAlertText] = useState();
  const [alertNotiState, setAlertNotiState] = useState(false);
  const [doneNotiContent, setDoneNotiContent] = useState(null);
  const [doneNotiState, setDoneNotiState] = useState(false);

  useEffect(() => {
    if (doneNotiContent !== null) {
      setDoneNotiState(true);
    }
  }, [doneNotiContent]);

  const alert = (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <img
        style={{ width: "40px", height: "40px", marginRight: "12px" }}
        src={warning}
      />
      <div>
        <p style={{ lineHeight: "40%" }}>{alertText}</p>
      </div>
    </div>
  );

  const message1 = (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <img
        style={{ width: "40px", height: "40px", marginRight: "12px" }}
        src={complete}
      />
      <div>
        <p style={{ lineHeight: "40%" }}>축하드립니다!</p>
        <p style={{ lineHeight: "40%" }}>목표를 완료하였습니다!</p>
      </div>
    </div>
  );

  const message2 = (
    <div
      style={{
        height: "100px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <div>글 작성을 완료하였습니다.</div>
      <div>회고록을 작성 하시겠습니까?</div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          marginTop: "16px",
        }}
      >
        <Button
          className={styles["noti-button"]}
          onClick={() => {
            navigateToReviewPost();
          }}
        >
          회고록 작성
        </Button>
      </div>
    </div>
  );

  const message3 = (
    <div
      style={{
        height: "100px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <div>글 작성을 완료하였습니다.</div>
      <div>목표를 완료하거나 회고록을 작성하세요.</div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          marginTop: "16px",
        }}
      >
        <Button
          className={styles["noti-button"]}
          onClick={() => {
            navigateToReviewPost();
          }}
        >
          회고록 작성
        </Button>
        <Button className={styles["noti-button"]}>목표 완료</Button>
      </div>
    </div>
  );

  const titleInput = (
    <input
      onChange={titleInputHandler}
      value={title}
      type="text"
      className={styles["title-input"]}
      placeholder="제목을 입력하세요."
    />
  );

  const dateRender = <div className={styles["date-title"]}>{dateString}</div>;

  return (
    <div ref={editorWrapperRef} className={styles["editor-wrapper"]}>
      {doneNotiState && (
        <NotiDeliverer
          content={doneNotiContent}
          stateHandler={setDoneNotiState}
          duration={5000}
          width={350}
        />
      )}
      {alertNotiState && (
        <NotiDeliverer
          content={alert}
          stateHandler={setAlertNotiState}
          duration={5000}
          width={350}
          height={100}
        />
      )}
      <FixedModal
        edit={props.edit}
        queryString={queryString}
        modalState={modalState}
        stateHandler={setModalState}
        content={
          <BlogPostForm
            postSubmitHandler={postSubmitHandler}
            reviewSubmitHandler={reviewSubmitHandler}
            forReview={props.forReview}
            edit={props.edit}
            queryString={queryString}
          />
        }
        noBtn={true}
        width={"10px"}
        height={"170px"}
      />
      <div className={styles["additional-info-wrapper"]}>
        <div className={styles["header"]}>
          {props.forReview ? dateRender : titleInput}
          <div className={styles["header-buttons-wrapper"]}>
            <Button
              onClick={clickSubmitHandler}
              className={`${styles["button"]}`}
            >
              글 작성
            </Button>
          </div>
        </div>

        {props.forReview === true ? null : (
          <PostTag setTags={setTags} editTags={props.editTags} />
        )}
      </div>
      <Editor
        ref={editorRef}
        language="ko-KR"
        initialValue={props.editContent.content || " "} // content는 글 수정시 사용
        placeholder="내용을 입력해주세요."
        previewStyle={`${
          editorWrapperRef?.current?.clientWidth > 470 ? "vertical" : "tab"
        }`} // 미리보기 스타일 지정
        height="100%" // 에디터 창 높이
        initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
        plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: prism }]]}
        toolbarItems={[
          // 툴바 옵션 설정
          ["heading", "bold", "italic", "strike"],
          ["hr", "quote"],
          ["ul", "ol", "task", "indent", "outdent"],
          props.forReview ? ["table", "link"] : ["table", "image", "link"],
          ["code", "codeblock"],
        ]}
        hooks={{
          addImageBlobHook: (blob, callback) => {
            uploadPhoto(blob).then((res) => {
              callback(res, "image");
              setImages((prev) => [...prev, res]);
            });
          },
        }}
      ></Editor>
    </div>
  );
};

const ToastEditor = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [editContent, setEditContent] = useState(null);
  const [editTags, setEditTags] = useState(null);
  const params = useParams();
  const editIdx = params.id;

  useEffect(() => {
    if (editIdx) {
      if (props.forReview === true) {
        detailReviewAPI(editIdx)
          .then((review) => {
            setEditContent(() => review);
          })
          .catch((err) => {
            console.log("ToastEditor : detailReviewAPI => ", err);
          });
      } else {
        tilAPI(editIdx).then((post) => {
          getPostTag(editIdx).then((tags) => {
            setEditContent(() => post);
            setEditTags(() => tags);
          });
        });
      }
    } else {
      setEditContent(() => "");
    }
  }, []);

  return (
    <React.Fragment>
      {editContent !== null && (
        <ToastEditorForm
          editContent={editContent}
          editTags={editTags}
          forReview={props.forReview}
          edit={props.edit}
          editIdx={editIdx}
        />
      )}
    </React.Fragment>
  );
};

export default ToastEditor;

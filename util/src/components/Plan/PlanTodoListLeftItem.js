import React, { useState } from "react";
import styles from "./PlanTodoListLeftItem.module.css";
import { editTodoAPI } from "../../api/Plan/editTodoAPI";
import { modifyPlanSliceActions } from "../../redux/planSlice";
import { useDispatch } from "react-redux";
import { delTodoAPI } from "../../api/Plan/delTodoAPI";
import FixedModal from "../UI/FixedModal/FixedModal";
import Button from "../UI/Button/Button";
import warning from "../../img/Warning.png";
import NotiDeliverer from "../UI/StackNotification/NotiDeliverer";

const PlanTodoListLeftItem = (props) => {
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const [titleValue, setTitleValue] = useState(props.todo.title);

  const enterEditMode = () => {
    setIsEditMode(true);
  };

  const cancelEditMode = () => {
    const processing = {
      title: titleValue,
      description: props.todo.description,
      state: props.todo.state,
      dueDate: props.todo.dueDate,
    };
    editTodoAPI(props.todo.todoId, props.plan.goalId, processing)
      .then((res) => {
        const processing = {
          goalId: props.plan.goalId,
          data: res,
        };
        dispatch(
          modifyPlanSliceActions.responseTodos(JSON.stringify(processing))
        );
      })
      .then((res) => {
        setIsEditMode(false);
      })
      .catch((err) => {
        console.log("PlanTodoListLeftItem : editTodoAPI => ", err);
        if (err.response.data[0].message == "제목이 없습니다.") {
          setTitleValue(props.todo.title);
          setIsEditMode(false);
        }
        if (err.response.data[0].message == "25자 이하여야 합니다.") {
          setNotiContent(errorMessage);
          setNotiState(true);
        }
      });
  };

  const inputChangeHandler = (event) => {
    setTitleValue(event.target.value);
  };

  const inputSubmitHandler = (event) => {
    if (event.key === "Enter") {
      cancelEditMode();
    }
  };

  const deleteTodo = () => {
    delTodoAPI(props.todo.todoId, props.plan.goalId).then((res) => {
      const proccessing = {
        goalId: props.plan.goalId,
        data: res,
      };
      dispatch(
        modifyPlanSliceActions.responseTodos(JSON.stringify(proccessing))
      );
    });
  };

  const [NotiState, setNotiState] = useState(false);
  const [notiContent, setNotiContent] = useState();

  const errorMessage = (
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
        <p style={{ lineHeight: "40%" }}>
          TODO의 제목은 25자 이하로 작성해야 합니다.
        </p>
      </div>
    </div>
  );

  const [askDeleteState, setAskDeleteState] = useState(false);

  const AskDeleteForm = (props) => {
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
          <Button className={styles["button"]} onClick={props.modalHandler}>
            취소
          </Button>
          <Button
            className={`${styles["button"]} ${styles["delete-button"]}`}
            onClick={() => {
              deleteTodo();
              props.modalHandler();
            }}
          >
            삭제
          </Button>
        </div>
      </div>
    );
  };

  const askDelete = () => {
    setAskDeleteState(true);
  };

  const titleReadMode = (
    <div onClick={enterEditMode} className={styles["todo-title-wrapper"]}>
      <div className={styles["todo-title-inner-wrapper"]}>
        <svg
          style={{ marginRight: "6px", color: "rgb(150, 150, 150)" }}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-hash"
          viewBox="0 0 16 16"
        >
          <path d="M8.39 12.648a1.32 1.32 0 0 0-.015.18c0 .305.21.508.5.508.266 0 .492-.172.555-.477l.554-2.703h1.204c.421 0 .617-.234.617-.547 0-.312-.188-.53-.617-.53h-.985l.516-2.524h1.265c.43 0 .618-.227.618-.547 0-.313-.188-.524-.618-.524h-1.046l.476-2.304a1.06 1.06 0 0 0 .016-.164.51.51 0 0 0-.516-.516.54.54 0 0 0-.539.43l-.523 2.554H7.617l.477-2.304c.008-.04.015-.118.015-.164a.512.512 0 0 0-.523-.516.539.539 0 0 0-.531.43L6.53 5.484H5.414c-.43 0-.617.22-.617.532 0 .312.187.539.617.539h.906l-.515 2.523H4.609c-.421 0-.609.219-.609.531 0 .313.188.547.61.547h.976l-.516 2.492c-.008.04-.015.125-.015.18 0 .305.21.508.5.508.265 0 .492-.172.554-.477l.555-2.703h2.242l-.515 2.492zm-1-6.109h2.266l-.515 2.563H6.859l.532-2.563z" />
        </svg>
        <span className={styles["todo-title"]}>{props.todo.title}</span>
      </div>
      <svg
        onClick={(event) => {
          event.stopPropagation();
          askDelete();
        }}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className={styles["delete-icon"]}
        viewBox="0 0 16 16"
      >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
      </svg>
    </div>
  );

  const titleEditInput = (
    <input
      type="text"
      key={props.todo.todoId}
      onBlur={cancelEditMode}
      onChange={inputChangeHandler}
      onKeyPress={inputSubmitHandler}
      value={titleValue}
      placeholder="일정을 입력해 주세요."
      autoFocus
      className={styles["edit-todo-input"]}
    />
  );

  return (
    <div className={styles["todo-detail-wrapper"]}>
      {NotiState && (
        <NotiDeliverer
          content={notiContent}
          stateHandler={setNotiState}
          duration={5000}
          width={400}
        />
      )}
      <FixedModal
        modalState={askDeleteState}
        stateHandler={setAskDeleteState}
        content={<AskDeleteForm />}
        width={"300px"}
        height={"310px"}
      />

      {isEditMode ? titleEditInput : titleReadMode}
    </div>
  );
};

export default PlanTodoListLeftItem;

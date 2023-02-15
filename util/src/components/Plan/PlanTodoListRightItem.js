import React, { useState } from "react";
import styles from "./PlanTodoListRightItem.module.css";
import { modifyPlanSliceActions } from "../../redux/planSlice";
import { useSelector, useDispatch } from "react-redux";
import { editTodoAPI } from "../../api/Plan/editTodoAPI";
import NotiDeliverer from "../UI/StackNotification/NotiDeliverer";
import { recvTodoPeriodAPI } from "../../api/Plan/recvTodoPeriodAPI";
import warning from "../../img/Warning.png";
import { useNavigate } from "react-router-dom";
import PlanIsDoneToggle from "./PlanIsDoneToggle";

const PlanTodoListRightItem = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const todos = useSelector((state) => state.planSlice.todos);
  const [isDateEditMode, setIsDateEditMode] = useState(false);
  const [dateValue, setDateValue] = useState(
    props.toStringByFormatting(new Date(props.todo.dueDate))
  );
  const [isDescriptionEditMode, setIsDescriptionEditMode] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState(
    props.todo.description
  );
  const [refresh, setRefresh] = useState(false);

  const enterDateEditMode = () => {
    setIsDateEditMode(true);
  };

  const cancelDateEditMode = () => {
    const processing = {
      title: props.todo.title,
      description: props.todo.description,
      state: props.todo.state,
      dueDate: dateValue,
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
        setIsDateEditMode(false);
        recvTodoPeriodAPI(props.plan.goalId).then((res) => {
          const processing = {
            goalId: props.plan.goalId,
            data: res,
          };
          dispatch(
            modifyPlanSliceActions.responseTodoPeriod(
              JSON.stringify(processing)
            )
          );
        });
      })
      .catch((err) => {
        setNotiContent(errorMessage);
        setDoneNotiState(true);
      });
  };

  const dateInputSubmitHandler = (event) => {
    if (event.key === "Enter") {
      cancelDateEditMode();
    }
  };

  const dateInputChangeHandler = (event) => {
    setDateValue(event.target.value);
  };

  const enterDescriptionEditMode = () => {
    setIsDescriptionEditMode(true);
  };

  const cancelDescriptionEditMode = () => {
    const processing = {
      title: props.todo.title,
      description: descriptionValue,
      state: props.todo.state,
      dueDate: props.todo.dueDate,
    };
    editTodoAPI(props.todo.todoId, props.plan.goalId, processing)
      .then((res) => {
        const proccessing = {
          goalId: props.plan.goalId,
          data: res,
        };
        dispatch(
          modifyPlanSliceActions.responseTodos(JSON.stringify(proccessing))
        );
      })
      .then((res) => {
        setIsDescriptionEditMode(false);
      })
      .catch((err) => {
        console.log("PlanTodoListRightItem : editTodoAPI => ", err);
      });
  };

  const descriptionInputSubmitHandler = (event) => {
    if (event.key === "Enter") {
      cancelDescriptionEditMode();
    }
  };

  const descriptionInputChangeHandler = (event) => {
    setDescriptionValue(event.target.value);
  };

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
          TODO의 날짜는 현재 작성중인 TODO 목표의
        </p>
        <p style={{ lineHeight: "40%" }}>
          날짜 범위를 미만 & 초과할 수 없습니다.
        </p>
      </div>
    </div>
  );

  const [doneModalState, setDoneModalState] = useState(false);
  const [doneNotiState, setDoneNotiState] = useState(false);
  const [notiContent, setNotiContent] = useState();

  const dateReadMode = (
    <div onClick={enterDateEditMode} className={styles["todo-duedate-wrapper"]}>
      {`${props.time.getFullYear()}년 ${
        props.time.getMonth() + 1
      }월 ${props.time.getDate()}일`}
      ,
    </div>
  );

  const descriptionReadMode = (
    <div
      onClick={enterDescriptionEditMode}
      className={styles["todo-description-wrapper"]}
    >
      {props.todo.description}
    </div>
  );

  const dateEditInput = (
    <input
      type="date"
      onBlur={cancelDateEditMode}
      onKeyPress={dateInputSubmitHandler}
      onChange={dateInputChangeHandler}
      value={dateValue}
      autoFocus
      className={styles["edit-date-input"]}
    />
  );

  const descriptionEditInput = (
    <input
      type="text"
      onBlur={cancelDescriptionEditMode}
      onKeyPress={descriptionInputSubmitHandler}
      onChange={descriptionInputChangeHandler}
      value={descriptionValue}
      placeholder="메모를 입력해 주세요."
      autoFocus
      className={styles["edit-description-input"]}
    />
  );

  return (
    <div
      className={styles["todo-space-wrapper"]}
      style={{ width: `${props.containerRef?.current?.scrollWidth}px` }}
    >
      {/* <FixedModal modalState={doneModalState} stateHandler={setDoneModalState} content={doneModalForm} addBtn={addBtn} width={380} height={450} /> */}
      {doneNotiState && (
        <NotiDeliverer
          content={notiContent}
          stateHandler={setDoneNotiState}
          duration={5000}
          width={400}
        />
      )}
      <div className={styles["todo-space"]}>
        <div style={{ marginRight: "12px" }}>
          <PlanIsDoneToggle plan={props.plan} todo={props.todo} />
        </div>

        {/* {props.todo.state ? isDoneTrue : isDoneFalse} */}
        {isDateEditMode ? dateEditInput : dateReadMode}
        {isDescriptionEditMode ? descriptionEditInput : descriptionReadMode}
      </div>
      {/*  */}
    </div>
  );
};

export default PlanTodoListRightItem;

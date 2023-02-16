import React, { useEffect, useState, useRef } from "react";
import styles from "./PlanTodoListLeft.module.css";
import PlanTodoListLeftItem from "./PlanTodoListLeftItem";

const PlanTodoListLeft = (props) => {
  const todosLeftRef = useRef();
  const [newTodo, setNewTodo] = useState(false);

  const todoTitles = props.todos[props.plan.goalId]?.map((el, idx) => {
    return (
      <PlanTodoListLeftItem
        key={`todo-titles-${el.todoId}-${idx}`}
        applyTodoData={props.applyTodoData}
        getInputTodoData={props.getInputTodoData}
        todo={el}
        plan={props.plan}
      />
    );
  });

  const [newTodoTitleValue, setNewTodoTitleValue] = useState();

  const newTodoInputHandler = (event) => {
    setNewTodoTitleValue(event.target.value);
  };

  const newTodoClickShow = () => {
    setNewTodo(true);
    props.getNewTodoIdx(props.plan.goalId);
  };

  const newTodoClickHide = () => {
    if (newTodoTitleValue === "") {
      setNewTodo(false);
      props.getNewTodoIdx(-1);
    }
  };

  useEffect(() => {
    props.getInputTodoData(newTodoTitleValue, null, null, props.plan.goalId);
  }, [newTodoTitleValue]);

  const onEnterNewPlanHandler = (event) => {
    if (event.key === "Enter") {
      props.applyTodoData();
    }
  };

  useEffect(() => {
    setNewTodoTitleValue("");
  }, [props.newTodoGoalId === props.plan.goalId && newTodo]);

  const plusImg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        color: "rgb(100,100,100)",
        marginLeft: "-5px",
        marginRight: "7px",
      }}
      width="24"
      height="24"
      fill="currentColor"
      className="bi bi-plus"
      viewBox="0 0 16 16"
    >
      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
    </svg>
  );

  const newTodoDummy = (
    <div onClick={newTodoClickShow} className={styles["new-todo-wrapper"]}>
      {props.newTodoGoalId === props.plan.goalId && newTodo ? (
        <input
          type="text"
          value={newTodoTitleValue}
          onKeyPress={onEnterNewPlanHandler}
          onChange={newTodoInputHandler}
          onBlur={newTodoClickHide}
          placeholder="일정을 입력해 주세요."
          autoFocus
          className={styles["new-todo-input"]}
        />
      ) : (
        <div className={styles["new-todo"]}>{plusImg} TODO 작성</div>
      )}
    </div>
  );

  return (
    <div ref={todosLeftRef} className={styles["todos-left"]}>
      {newTodoDummy}
      {props.todos[props.plan.goalId] && todoTitles}
    </div>
  );
};

export default PlanTodoListLeft;

import React, { useEffect, useState, useRef } from "react";
import Card from "../../UI/Card/Card";
import { recvTodosAPI } from "../../../api/Plan/recvTodosAPI";
import { modifyPlanSliceActions } from "../../../redux/planSlice";
import { useSelector, useDispatch } from "react-redux";
import PlanCardItemTodo from "./PlanCardItemTodo";
import styles from "./PlanCardItem.module.css";
import FixedModal from "../../UI/FixedModal/FixedModal";
import PlanCardTodoCRUD from "./PlanCardTodoCRUD";
import PlanCardPlanCRUD from "./PlanCardPlanCRUD";
import {
  OverlayScrollbarsComponent,
  useOverlayScrollbars,
} from "overlayscrollbars-react";
import { recvTodayTodosAPI } from "../../../api/Plan/recvTodayTodosAPI";

const PlanCardItemForm = (props) => {
  const scrollRef = useRef();
  const [initialize, instance] = useOverlayScrollbars({
    options: { scrollbars: { autoHide: "scroll" } },
  });

  useEffect(() => {
    initialize(scrollRef.current);
  }, [initialize]);

  const todos = useSelector((state) => {
    return props.today === true
      ? state.planSlice.todayTodos
      : state.planSlice.todos[props?.plan?.goalId];
  });
  const plans = useSelector((state) => state.planSlice.plans);

  const todoList =
    todos &&
    todos.map((todo, idx) => {
      return (
        <PlanCardItemTodo
          key={`plan-card-${todo.todoId}-${
            props.today === true ? "today" : "per-plan"
          }`}
          todo={todo}
          plan={props.today === true ? plans[todo.goalId] : props.plan}
          className={idx % 2 ? "odd" : "even"}
          today={props.today}
        />
      );
    });

  const [todoModalState, setTodoModalState] = useState(false);
  const [planModalState, setPlanModalState] = useState(false);

  const empty = (
    <div
      style={{
        height: `${48 * 3}px`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      TODO를 생성해 주세요.
    </div>
  );

  const headerButtons = (
    <div className={styles["button-wrapper"]}>
      <div
        onClick={() => {
          setPlanModalState(true);
        }}
        className={styles["new-button"]}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-pencil-square"
          viewBox="0 0 16 16"
        >
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
          <path
            fillRule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
          />
        </svg>
      </div>
      <div
        onClick={() => {
          setTodoModalState(true);
        }}
        className={styles["new-button"]}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-plus-lg"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
          />
        </svg>
      </div>
    </div>
  );

  return (
    <Card className={styles["plan-card"]}>
      <FixedModal
        modalState={todoModalState}
        stateHandler={setTodoModalState}
        content={<PlanCardTodoCRUD plan={props.plan} />}
        width={"400px"}
        height={"auto"}
      />
      <FixedModal
        modalState={planModalState}
        stateHandler={setPlanModalState}
        content={<PlanCardPlanCRUD plan={props.plan} />}
        width={"400px"}
        height={"auto"}
      />
      <header className={styles["header"]}>
        <div className={styles["plan-title-wrapper"]}>
          <span>
            {props.today === true ? "오늘 할 일" : props?.plan?.title}
          </span>
          {props.today === true ? null : headerButtons}
        </div>
      </header>
      <div className={styles["todos-wrapper"]} ref={scrollRef}>
        <div className={styles["todos-inner-wrapper"]}>{todoList}</div>
      </div>
      {todos?.length === 0 && empty}
    </Card>
  );
};

const PlanCardItem = (props) => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => {
    return props.today === true
      ? state.planSlice.todayTodos
      : state.planSlice.todos[props?.plan?.goalId];
  });

  // useEffect(() => {
  //   recvTodayTodosAPI()
  //   .then((res) => {
  //     dispatch(modifyPlanSliceActions.responseTodayTodos(JSON.stringify(res)))
  //   })
  //   .catch((err) => {
  //     console.log('PlanCardItem : recvTodayTodosAPI => ', err)
  //   })
  // }, [todos])

  useEffect(() => {
    if (props.today === true) {
      recvTodayTodosAPI()
        .then((res) => {
          dispatch(
            modifyPlanSliceActions.responseTodayTodos(JSON.stringify(res))
          );
        })
        .catch((err) => {
          console.log("PlanCardItem : recvTodayTodosAPI => ", err);
        });
    } else {
      recvTodosAPI(props.plan.goalId)
        .then((res) => {
          const processing = {
            goalId: props.plan.goalId,
            data: res,
          };
          console.log("PlanCardItem : recvTodosAPI");
          dispatch(
            modifyPlanSliceActions.responseTodos(JSON.stringify(processing))
          );
        })
        .catch((err) => {
          console.log("PlanCardItem : recvTodosAPI => ", err);
        });
    }
  }, []);
  return (
    <React.Fragment>
      <PlanCardItemForm today={props.today} plan={props.plan} />
    </React.Fragment>
  );
};

export default PlanCardItem;

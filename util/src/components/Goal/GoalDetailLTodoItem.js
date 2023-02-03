import classes from "../Goal/GoalDetail.module.css";

const GoalDetailLTodoItem = (props) => {

  return (
    <li className={classes["goal-detail-todos-item"]}>
      <span className={classes["goal-detail-todos-item-title"]}>{props.todo.title}</span>
      <span className={classes["goal-detail-todos-item-duedate"]}>{props.todo.dueDate}</span>
      <span className={classes["goal-detail-todos-item-state"]}>{props.todo.state}</span>
    </li>
  );
};

export default GoalDetailLTodoItem;
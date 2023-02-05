import React from "react";


const PlanCardItemTodo = (props) => {

  const dueDate = new Date(props.todo.dueDate)
  const dueDateString = `${dueDate.getFullYear()}년 ${dueDate.getMonth()}월 ${dueDate.getDate()}일`
  return (
    <div>
      {props.todo.title}
      {dueDateString}
    </div>
  )
}

export default PlanCardItemTodo
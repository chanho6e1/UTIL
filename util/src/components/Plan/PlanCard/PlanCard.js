import React, {useEffect} from "react";
import Card from "../../UI/Card/Card";
import { recvTodosAPI } from "../../../api/Plan/recvTodosAPI";
import { modifyPlanSliceActions } from '../../../redux/planSlice'
import { useSelector, useDispatch } from 'react-redux'
import PlanCardTodo from "./PlanCardTodo";

const PlanCard = (props) => {
  const dispatch = useDispatch()
  const todos = useSelector(state => state.planSlice.todos[props.plan.goalId])

  useEffect(() => {
    recvTodosAPI(props.plan.goalId)
    .then((res) => {
      const processing = {
        goalId: props.plan.goalId,
        data: res
      }
      dispatch(modifyPlanSliceActions.responseTodos(JSON.stringify(processing)))
    })
    .catch((err) => {
      console.log('PlanIndividual : recvTodosAPI => ', err)
    })
  }, [])

  const todoList = todos && todos.map((todo, idx) => {
    return (
      <PlanCardTodo todo={todo} />
    )
  })

  


  return (
    <Card>
      <header>
        {props.plan.title}
      </header>
      <body>
        {todoList}
      </body>
    </Card>
  )
}

export default PlanCard
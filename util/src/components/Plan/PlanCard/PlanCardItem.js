import React, {useEffect} from "react";
import Card from "../../UI/Card/Card";
import { recvTodosAPI } from "../../../api/Plan/recvTodosAPI";
import { modifyPlanSliceActions } from '../../../redux/planSlice'
import { useSelector, useDispatch } from 'react-redux'
import PlanCardItemTodo from "./PlanCardItemTodo";
import styles from './PlanCardItem.module.css'

const PlanCardItem = (props) => {
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
      <PlanCardItemTodo todo={todo} className={idx % 2 ? 'odd' : 'even'} />
    )
  })

  


  return (
    <Card className={styles['plan-card']}>
      <header className={styles['header']}>
        <div className={styles['plan-title-wrapper']}>
          {props.plan.title}
        </div>
      </header>
      <body>
        {todoList}
      </body>
    </Card>
  )
}

export default PlanCardItem
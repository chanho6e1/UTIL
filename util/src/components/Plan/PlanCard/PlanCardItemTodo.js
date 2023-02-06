import React from "react";
import styles from './PlanCardItemTodo.module.css'
import arrow from '../../../img/arrow.png'

const PlanCardItemTodo = (props) => {

  const dueDate = new Date(props.todo.dueDate)
  const dueDateString = `${dueDate.getFullYear()}년 ${dueDate.getMonth()}월 ${dueDate.getDate()}일`
  return (
    <div className={`${styles['plan-item-wrapper']} ${styles[`${props.className}`]}`}>
      <img className={styles['arrow-icon']} src={arrow} style={{transform: 0 ? 'rotate(90deg)' : 'none', marginRight:'12px', width: '12px', height: '12px'}}/>
      <div className={styles['plan-item-text']}>
        <span>{props.todo.title}</span>
        <span className={styles['small-text']}>{dueDateString}</span>
      </div>
      
    </div>
  )
}

export default PlanCardItemTodo
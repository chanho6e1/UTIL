import React, {useState} from "react";
import styles from './PlanCardItemTodo.module.css'
import arrow from '../../../img/arrow.png'
import PlanIsDoneToggle from "../PlanIsDoneToggle";
import FixedModal from "../../UI/FixedModal/FixedModal";
import PlanCardTodoCRUD from "./PlanCardTodoCRUD";

const PlanCardItemTodo = (props) => {

  const [modalState, setModalState] = useState(false)

  const dueDate = new Date(props.todo.dueDate)
  const dueDateString = `${dueDate.getFullYear()}.${dueDate.getMonth() + 1}.${dueDate.getDate()}`
  return (
    <div onClick={() => {setModalState(true)}} className={`${styles['plan-item-wrapper']} ${styles[`${props.className}`]}`}>
      <FixedModal modalState={modalState} stateHandler={setModalState} content={<PlanCardTodoCRUD todo={props.todo} plan={props.plan} />} width={'400px'} height={'auto'} />
      {/* <img className={styles['arrow-icon']} src={arrow} style={{transform: 0 ? 'rotate(90deg)' : 'none', marginRight:'12px', width: '12px', height: '12px'}}/> */}
      
      <div className={styles['plan-item-text']}>
        <span className={styles['title-text']}>{props.todo.title}</span>
        <span className={styles['small-text']}>{dueDateString}</span>
      </div>
      
      <div onClick={(event) => {event.stopPropagation();}} style={{marginLeft: '12px'}}>
        <PlanIsDoneToggle plan={props.plan} todo={props.todo} />
      </div>
    </div>
  )
}

export default PlanCardItemTodo
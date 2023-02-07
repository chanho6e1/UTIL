import React, {useState} from "react";
import PlanCardItem from "./PlanCardItem";
import styles from './PlanCard.module.css'
import { notificationSliceActions } from "../../../redux/notificationSlice";
import { useSelector, useDispatch } from 'react-redux'
import PlanCardPlanCRUD from "./PlanCardPlanCRUD";
import FixedModal from "../../UI/FixedModal/FixedModal";

const PlanCard = (props) => {
  const dispatch = useDispatch()
  const plans = useSelector(state => state.planSlice.plans)

  const plansRender = Object.keys(plans).map((id, arrIdx) => {
    return (
      <PlanCardItem plan={plans[id]} />
    )
  })

  const [modalState, setModalState] = useState(false)

  return (
    <div className={styles['plan-card-wrapper']}>
      <FixedModal modalState={modalState} stateHandler={setModalState} content={<PlanCardPlanCRUD />} width={'400px'} height={'auto'} />
      <div id={styles['header']} className={styles['header']}>
        <span className={styles['plan-string']}>목표</span>
        <div onClick={() => {setModalState(true)}} className={styles['new-button']}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
          </svg>
        </div>
      </div>
      
      {plansRender}
    </div>
  )
}

export default PlanCard
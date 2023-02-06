import React from "react";
import PlanCardItem from "./PlanCardItem";
import styles from './PlanCard.module.css'
import { notificationSliceActions } from "../../../redux/notificationSlice";
import { useSelector, useDispatch } from 'react-redux'

const PlanCard = (props) => {
  const dispatch = useDispatch()
  const plans = useSelector(state => state.planSlice.plans)

  const plansRender = Object.keys(plans).map((id, arrIdx) => {
    return (
      <PlanCardItem plan={plans[id]} />
    )
  })

  return (
    <div className={styles['plan-card-wrapper']}>
      {plansRender}
    </div>
  )
}

export default PlanCard
import React, {useEffect} from "react";
import Plan from "./Plan";
import styles from './PlanExpanded.module.css'
import { HashRouter, BrowserRouter, Routes, Route, Link, NavLink, Navigate, useNavigate, useMatch, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { modifyPlanSliceActions } from '../../redux/planSlice'
import { recvPlans } from "../../api/Plan/recvPlans";
import PlanLoading from "./PlanLoading";

const PlanExpanded = (props) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
      recvPlans()
      .catch((err) => {
          navigate('/login');
      })
      .then((res) => {
          dispatch(modifyPlanSliceActions.responsePlans(JSON.stringify(res)))
      })
  }, [])

  const plans = useSelector(state => state.planSlice.plans)

  const planForm = (
    <div className={styles['plan-expanded']}>
      <div className={styles['plans-navbar']}>
        <div className={styles['navbar-element']}>목표 로드맵</div>
        <div className={styles['navbar-element']} style={{marginTop: '8px'}}>
        </div>
      </div>
      <Plan />
    </div>
  )

  const planLoading = <PlanLoading />

  return (

    <React.Fragment>
      { plans === null ? planLoading : planForm}
    </React.Fragment>
    
    
    
  )
}

export default PlanExpanded
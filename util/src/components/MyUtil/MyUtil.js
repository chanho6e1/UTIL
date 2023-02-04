import React, {useState, useEffect, useRef} from "react";
import styles from './MyUtil.module.css'
import { HashRouter, BrowserRouter, Routes, Route, Link, NavLink, Navigate, useNavigate, useMatch } from "react-router-dom";
import Card from "../UI/Card/Card";


import { notificationSliceActions } from "../../redux/notificationSlice";
import { useSelector, useDispatch } from 'react-redux'

import NotiDeliverer from "../UI/StackNotification/NotiDeliverer";

import PlanCard from "../Plan/PlanCard/PlanCard";


const MyUtil = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const plans = useSelector(state => state.planSlice.plans)


  const plansRender = Object.keys(plans).map((id, arrIdx) => {
    return (
      <PlanCard plan={plans[id]} />
    )
  })


  return (
    <div className={styles['my-util']}>
      {plansRender}

    </div>
  )
}

export default MyUtil
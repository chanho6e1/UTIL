import React, {useState, useEffect, useRef} from "react";
import styles from './MyUtil.module.css'
import { HashRouter, BrowserRouter, Routes, Route, Link, NavLink, Navigate, useNavigate, useMatch } from "react-router-dom";
import Card from "../UI/Card/Card";
import FixedModal from "../UI/FixedModal/FixedModal";
import Plan from "../Plan/Plan";
import PlanExpanded from "../Plan/PlanExpanded";
import PopUp from "../UI/PopUp/PopUp";
import StackNotification from "../UI/StackNotification/StackNotification";

import { notificationSliceActions } from "../../redux/notificationSlice";
import { useSelector, useDispatch } from 'react-redux'

import NotiDeliverer from "../UI/StackNotification/NotiDeliverer";


const MyUtil = (props) => {
  const dispatch = useDispatch()
  const notis = useSelector(state => state.notificationSlice.stack)
  const navigate = useNavigate()
  const planExpandedRef = useRef()
  const [planExpandedBoolean, setPlanExpandedBoolean] = useState(false)
  const planExpandedToggler = (boolean) => {
      navigate(`/index/plan`);
      setPlanExpandedBoolean(boolean)
  }

  // const planExpandedModal = <Modal component={<PlanExpanded />} id={'plan-expanded'} name={'plan-expanded'} parentId={`plan-expanded-button`} parentRef={planExpandedRef} toggleFunction={planExpandedToggler} toggleBoolean={planExpandedBoolean} url={`/index/plan/*`} prevUrl={'/index'} />






  return (
    <div className={styles['my-util']}>
      {/* {showNoti && <NotiDeliverer id={1} content={content} stateHandler={setShowNoti} />} */}

      <PlanExpanded />

    </div>
  )
}

export default MyUtil
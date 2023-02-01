import React, {useState, useEffect, useRef} from "react";
import styles from './MyUtil.module.css'
import { HashRouter, BrowserRouter, Routes, Route, Link, NavLink, Navigate, useNavigate, useMatch } from "react-router-dom";
import Card from "../UI/Card/Card";
import FixedModal from "../UI/FixedModal/FixedModal";
import Plan from "../Plan/Plan";
import PlanExpanded from "../Plan/PlanExpanded";
import PopUp from "../UI/PopUp/PopUp";



const MyUtil = (props) => {
  const navigate = useNavigate()
  const planExpandedRef = useRef()
  const [planExpandedBoolean, setPlanExpandedBoolean] = useState(false)
  const planExpandedToggler = (boolean) => {
      navigate(`/index/plan`);
      setPlanExpandedBoolean(boolean)
  }

  // const planExpandedModal = <Modal component={<PlanExpanded />} id={'plan-expanded'} name={'plan-expanded'} parentId={`plan-expanded-button`} parentRef={planExpandedRef} toggleFunction={planExpandedToggler} toggleBoolean={planExpandedBoolean} url={`/index/plan/*`} prevUrl={'/index'} />


  const [test, setTest] = useState(false)
  


  return (
    <div className={styles['my-util']}>
      <PlanExpanded />
      
      {/* <PopUp popUpState={test} stateHandler={setTest} showTime={3000} width={300} height={150} /> */}
      {/* <FixedModal modalState={test} stateHandler={setTest} content={'삭제 시 복구할 수 없습니다.'} />
      <button onClick={() => setTest(true)}>das</button> */}
    </div>
  )
}

export default MyUtil
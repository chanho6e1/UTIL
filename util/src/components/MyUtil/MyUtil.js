import React, {useState, useEffect, useRef} from "react";
import styles from './MyUtil.module.css'
import { HashRouter, BrowserRouter, Routes, Route, Link, NavLink, Navigate, useNavigate, useMatch } from "react-router-dom";
import Card from "../UI/Card/Card";
import Modal from "../UI/Modal/Modal";
import Plan from "../Plan/Plan";
import PlanExpanded from "../Plan/PlanExpanded";

const MyUtil = (props) => {
  const navigate = useNavigate()
  const planExpandedRef = useRef()
  const [planExpandedBoolean, setPlanExpandedBoolean] = useState(false)
  const planExpandedToggler = (boolean) => {
      navigate(`/index/plan`);
      setPlanExpandedBoolean(boolean)
  }

  const planExpandedModal = <Modal component={<PlanExpanded />} id={'plan-expanded'} name={'plan-expanded'} parentId={`plan-expanded-button`} parentRef={planExpandedRef} toggleFunction={planExpandedToggler} toggleBoolean={planExpandedBoolean} url={`/index/plan/*`} prevUrl={'/index'} />

  return (
    <div>
      <Card className={styles['plans-wrapper']}>
        <div ref={planExpandedRef} id="plan-expanded-button" className={styles['plans-div']}>

            <div className={styles['plans-navbar']}>
                <div className={styles['navbar-element']}>목표 로드맵</div>
                <div className={styles['navbar-element']} style={{marginTop: '8px'}}>
                  <div onClick={planExpandedToggler} >
                      {planExpandedModal}
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                      </svg>
                  </div>
                </div>
            </div>

            <Plan showRange={6}/>
          
        </div>
      </Card>
    </div>
  )
}

export default MyUtil
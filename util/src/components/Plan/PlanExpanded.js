import React from "react";
import Plan from "./Plan";
import styles from './PlanExpanded.module.css'

const PlanExpanded = (props) => {

  return (

    <div className={styles['plan-expanded']}>
      <div className={styles['plans-navbar']}>
        <div className={styles['navbar-element']}>목표 로드맵</div>
        <div className={styles['navbar-element']} style={{marginTop: '8px'}}>
        </div>
      </div>
      <Plan showRange={256}/>
    </div>

    
    
  )
}

export default PlanExpanded
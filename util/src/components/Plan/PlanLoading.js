import React from "react";
import styles from './PlanLoading.module.css'

const PlanLoading = (props) => {

  return (
    <div className={styles['loading-wrapper']}>
      <div className={styles['row']}>
        <div className={`${styles['animation']} ${styles['header']}`} />
        <div className={`${styles['animation']} ${styles['header']}`} />
      </div>
      <div className={styles['column']}>
        <div className={`${styles['animation']} ${styles['side-bar']}`} />
        <div className={`${styles['animation']} ${styles['content']}`} />
      </div>
    </div>
  )
}

export default PlanLoading
import React from "react";
import styles from "./PlanResponsive.module.css";
import PlanExpanded from "./PlanExpanded";
import PlanCard from "./PlanCard/PlanCard";

const PlanResponsive = (props) => {
  return (
    <React.Fragment>
      <div className={styles["mobile"]}>
        <PlanCard />
      </div>
      <div className={styles["pc"]}>
        <PlanExpanded />
      </div>
    </React.Fragment>
  );
};

export default PlanResponsive;

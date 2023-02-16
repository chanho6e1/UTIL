import React, { useEffect, useState } from "react";
import Plan from "./Plan";
import styles from "./PlanExpanded.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { modifyPlanSliceActions } from "../../redux/planSlice";
import { recvPlansPeriodAPI } from "../../api/Plan/recvPlansPeriodAPI";
import { recvTodosPeriodAPI } from "../../api/Plan/recvTodosPeriodAPI";
import PlanLoading from "./PlanLoading";

const PlanExpanded = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [startRange, setStartRange] = useState(null);
  const [endRange, setEndRange] = useState(null);

  useEffect(() => {
    recvPlansPeriodAPI().then((res) => {
      if (res?.startDate && res?.endDate) {
        const startDate = new Date(res.startDate);
        const endDate = new Date(res.endDate);
        const startRange = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          1
        );
        const endRange = new Date(
          endDate.getFullYear(),
          endDate.getMonth() + 2,
          0
        );
        setStartRange(startRange);
        setEndRange(endRange);
      } else {
        const prototypeDate = new Date();
        const startRange = new Date(prototypeDate.getFullYear(), 0, 1);
        const endRange = new Date(prototypeDate.getFullYear(), 12, 0);
        setStartRange(startRange);
        setEndRange(endRange);
      }
    });
  }, []);

  useEffect(() => {
    recvTodosPeriodAPI().then((res) => {
      dispatch(modifyPlanSliceActions.responseTodosPeriod(JSON.stringify(res)));
    });
  }, []);

  // useEffect(() => {
  //   recvIngPlanAPI()
  //     .catch((err) => {
  //         navigate('/login');
  //     })
  //     .then((res) => {
  //         dispatch(modifyPlanSliceActions.responsePlans(JSON.stringify(res)))
  //     })
  // }, [])

  const plans = useSelector((state) => state.planSlice.plans);

  const planForm = (
    <div
      className={styles["plan-expanded"]}
      style={{ height: `${props.contracted === true ? "100%" : "100vh"}` }}
    >
      {/* <div className={styles['plans-navbar']}>
        <div className={styles['navbar-element']}>목표 로드맵</div>
        <div className={styles['navbar-element']} style={{marginTop: '8px'}}>
        </div>
      </div> */}
      <Plan
        contracted={props.contracted}
        startRange={startRange}
        endRange={endRange}
      />
    </div>
  );

  const planLoading = <PlanLoading />;

  return (
    <React.Fragment>
      {plans === null || startRange === null || endRange === null
        ? planLoading
        : planForm}
    </React.Fragment>
  );
};

export default PlanExpanded;

import classes from "../Goal/GoalDetail.module.css";
import GoalDetailL from "./GoalDetailL";
import GoalDetailR from "./GoalDetailR";
import React, {useState, useEffect, useRef, useCallback} from "react";
import { modifyPostDetailSliceActions } from '../../redux/postDetailSlice'
import { modifyPlanSliceActions } from '../../redux/planSlice'
import { detailPlansAPI } from "../../api/Goal/detailPlansAPI";
import { detailTodosAPI } from "../../api/Goal/detailTodosAPI";
import { detailReviewsAPI } from "../../api/Goal/detailReviewsAPI";
import { detailTilAPI } from "../../api/Goal/detailTilAPI";
import GoalDetailMobile from "./GoalDetailMobile";

import { useSelector, useDispatch } from 'react-redux'
import { HashRouter, BrowserRouter, Routes, Route, Link, NavLink, Navigate, useNavigate, useMatch, useLocation, useParams } from "react-router-dom";
import { Fragment } from "react";



const GoalDetail = (props) => {
  const idx = useParams().id
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [tilPage, settilPage] = useState(1)

  useEffect(() => {
    detailPlansAPI(idx)
    .catch((err) => {
        navigate('/login');
    })
    .then((res) => {
        dispatch(modifyPlanSliceActions.getPlans(JSON.stringify(res)))
    })
  }, [])

  useEffect(() => {
    detailTodosAPI(idx)
    .then((res) => {
      const proccessing = {
        goalId: idx,
        data: res
    }
    dispatch(modifyPostDetailSliceActions.getTodos(JSON.stringify(proccessing)))
    })
  }, [])

  useEffect(() => {
    detailReviewsAPI(idx)
    .then((res) => {
      const proccessing = {
        goalId: idx,
        data: res
    }
    dispatch(modifyPostDetailSliceActions.getReviews(JSON.stringify(proccessing)))
    })
  }, [])

  useEffect(() => {
    detailTilAPI(idx, tilPage)
    .then((res) => {
      const proccessing = {
        goalId: idx,
        data: res
    }
    dispatch(modifyPostDetailSliceActions.getTils(JSON.stringify(proccessing)))
    })
  }, [tilPage])

  const plans = useSelector(state => state.planSlice.allPlans)
  const reviews = useSelector(state => state.postDetailSlice.reviews)
  const tils = useSelector(state => state.postDetailSlice.tils)

  const prevPage = () => {
    if (tilPage > 1) {
      settilPage((prevState) => prevState - 1)
    }
  }

  const nextPage = () => {
    if (tilPage < tils[idx].totalPages)
    settilPage((prevState) => prevState + 1)
  }

  
  return (
    <Fragment>
      <div className={classes["goal-detail-pc"]}>
        <div />
        {plans && <GoalDetailL plan={plans[idx]} reviews={reviews} />}
        <div className={classes["goal-detail-line"]}/>
        {plans && <GoalDetailR plan={plans[idx]} tils={tils} nextPage={nextPage} prevPage={prevPage} tilPage={tilPage}/>}
        <div />
      </div>
      <div className={classes["goal-detail-mobile"]}>
        {plans && <GoalDetailMobile plan={plans[idx]} reviews={reviews} tils={tils} nextPage={nextPage} prevPage={prevPage} tilPage={tilPage}/>}
      </div>
    </Fragment>
  );
};

export default GoalDetail;

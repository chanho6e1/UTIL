import classes from "../Goal/GoalDetail.module.css";
import GoalDetailL from "./GoalDetailL";
import GoalDetailR from "./GoalDetailR";
import React, {useState, useEffect, useRef, useCallback} from "react";
import { modifyPlanSliceActions } from '../../redux/planSlice'
import { detailPlansAPI } from "../../api/Goal/detailPlansAPI";
import { detailTodosAPI } from "../../api/Goal/detailTodosAPI";
import { detailReviewsAPI } from "../../api/Goal/detailReviewsAPI";
import { detailTilAPI } from "../../api/Goal/detailTilAPI";

import { useSelector, useDispatch } from 'react-redux'
import { HashRouter, BrowserRouter, Routes, Route, Link, NavLink, Navigate, useNavigate, useMatch, useLocation, useParams } from "react-router-dom";



const GoalDetail = (props) => {
  const idx = useParams().id
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    detailPlansAPI(idx)
    .catch((err) => {
        navigate('/login');
    })
    .then((res) => {
        dispatch(modifyPlanSliceActions.responsePlans(JSON.stringify(res)))
    })
  }, [])

  useEffect(() => {
    detailTodosAPI(idx)
    .then((res) => {
      const proccessing = {
        goalId: idx,
        data: res
    }
    dispatch(modifyPlanSliceActions.responseTodos(JSON.stringify(proccessing)))
    })
  }, [])

  useEffect(() => {
    detailReviewsAPI(idx)
    .then((res) => {
      const proccessing = {
        goalId: idx,
        data: res
    }
    dispatch(modifyPlanSliceActions.responseReviews(JSON.stringify(proccessing)))
    })
  }, [])

  useEffect(() => {
    detailTilAPI(idx)
    .then((res) => {
      const proccessing = {
        goalId: idx,
        data: res
    }
    dispatch(modifyPlanSliceActions.responseTils(JSON.stringify(proccessing)))
    })
  }, [])


  const plans = useSelector(state => state.planSlice.plans)
  const todos = useSelector(state => state.planSlice.todos)
  const reviews = useSelector(state => state.planSlice.reviews)
  const tils = useSelector(state => state.planSlice.tils)


  return (
    <div className={classes["goal-detail"]}>
      <GoalDetailL goal={plans} todos={todos} reviews={reviews}/>
      <div className={classes["goal-detail-line"]}/>
      <GoalDetailR goal={plans} tils={tils}/>
    </div>
  );
};

export default GoalDetail;

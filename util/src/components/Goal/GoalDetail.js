import classes from "../Goal/GoalDetail.module.css";
import GoalDetailL from "./GoalDetailL";
import GoalDetailR from "./GoalDetailR";
import React, {useState, useEffect, useRef, useCallback} from "react";
import { modifyPostDetailSliceActions } from '../../redux/postDetailSlice'
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
        dispatch(modifyPostDetailSliceActions.getPlans(JSON.stringify(res)))
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
    detailTilAPI(idx)
    .then((res) => {
      const proccessing = {
        goalId: idx,
        data: res
    }
    dispatch(modifyPostDetailSliceActions.getTils(JSON.stringify(proccessing)))
    })
  }, [])


  const plans = useSelector(state => state.postDetailSlice.plans)
  const todos = useSelector(state => state.postDetailSlice.todos)
  const reviews = useSelector(state => state.postDetailSlice.reviews)
  const tils = useSelector(state => state.postDetailSlice.tils)


  return (
    <div className={classes["goal-detail"]}>
      <GoalDetailL goal={plans} todos={todos} reviews={reviews}/>
      <div className={classes["goal-detail-line"]}/>
      <GoalDetailR goal={plans} tils={tils}/>
    </div>
  );
};

export default GoalDetail;

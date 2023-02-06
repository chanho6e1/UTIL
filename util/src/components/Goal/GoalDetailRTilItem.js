import classes from "../Goal/GoalDetail.module.css";
import { HashRouter, BrowserRouter, Routes, Route, Link, NavLink, Navigate, useNavigate, useMatch, useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import React, {useState, useEffect, useRef, useCallback} from "react";
import { modifyPostDetailSliceActions } from '../../redux/postDetailSlice'
import { tilAPI } from "../../api/Detail/tilAPI";

const GoalDetailRTilItem = (props) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const move = () => {
    tilAPI(props.til.postId)
    .catch((err) => {
        navigate('/login');
    })
    .then((res) => {
      navigate(`/post/${props.til.postId}`, {
        state: {
          post: res
        }
      });
    })
  };


  return (
    // <Link to={`/post/${props.til.postId}`} post={posts}>
    //   <li className={classes["goal-detail-r-tils-item-title"]}>{props.til.title}</li>
    // </Link>
    <p onClick={move}>{props.til.title}</p>
  );
};

export default GoalDetailRTilItem;
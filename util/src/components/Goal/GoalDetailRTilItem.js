import classes from "../Goal/GoalDetail.module.css";
import {
  HashRouter,
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  Navigate,
  useNavigate,
  useMatch,
  useLocation,
  useParams,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { modifyPostDetailSliceActions } from "../../redux/postDetailSlice";
import { tilAPI } from "../../api/Detail/tilAPI";

const GoalDetailRTilItem = (props) => {
  return (
    <Link
      className={classes["goal-detail-r-tils-item-link"]}
      to={`/index/post/${props.til.postId}`}
    >
      <div className={classes["goal-detail-r-tils-item-title"]}>
        {props.til.title}
      </div>
    </Link>
  );
};

export default GoalDetailRTilItem;

import classes from "../Goal/GoalDetail.module.css";
import { HashRouter, BrowserRouter, Routes, Route, Link, NavLink, Navigate, useNavigate, useMatch, useLocation, useParams } from "react-router-dom";


const GoalDetailRTilItem = (props) => {
  return (
    <Link to={`/post/${props.til.postId}`}>
      <li className={classes["goal-detail-r-tils-item-title"]}>{props.til.title}</li>
    </Link>
  );
};

export default GoalDetailRTilItem;
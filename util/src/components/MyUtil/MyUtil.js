import React, { useState, useEffect, useRef } from "react";
import styles from "./MyUtil.module.css";
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
} from "react-router-dom";
import { notificationSliceActions } from "../../redux/notificationSlice";
import { useSelector, useDispatch } from "react-redux";

import AnimatedModal from "../UI/AnimatedModal/Modal";
import DetailItem from "../Detail/DetailItem";
import PlanExpanded from "../Plan/PlanExpanded";

const MyUtil = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ShowModalHandler = (boolean) => {
    navigate(`/post/121`);
    setShowModal(boolean);
  };

  const cardRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const modal = (
    <AnimatedModal
      component={<DetailItem id={121} />}
      id={121}
      name={"word"}
      parentId={`modal-parent-word-121`}
      parentRef={cardRef}
      toggleFunction={ShowModalHandler}
      toggleBoolean={showModal}
      url={`post/121`}
      prevUrl={"/setting"}
    />
  );

  return (
    <div className={styles["my-util"]}>
      <div
        onClick={() => {
          ShowModalHandler(true);
        }}
        ref={cardRef}
        style={{ width: "300px", height: "300px", backgroundColor: "red" }}
      >
        {modal}
      </div>
    </div>
  );
};

export default MyUtil;

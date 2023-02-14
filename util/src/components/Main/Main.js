import React, { useRef } from "react";
import styles from "./Main.module.css";
import SwipeableDock from "../UI/SwipeableDock/SwipeableDock";
import * as Icons from "./Icons";
import logo from "../../img/util-logo.png";
import { useSelector, useDispatch } from "react-redux";
import { UserIcon, CurrentUser, UserDockWrapper } from "./MainUserInfo";
import ToastEditor from "../MarkdownEditor/ToastEditor";

import PlanExpanded from "../Plan/PlanExpanded";

import Plan from "../Plan/Plan";
import MyUtil from "../MyUtil/MyUtil";
import UserPage from "../UserPage/UserPage";
import UserProfileChange from "../UserProfileChangePage/UserProfileChange";
import PlanResponsive from "../Plan/PlanResponsive";
import Explore from "../Explore/Explore";
import { getSubscribePosts } from "../../api/Post/getSubscribePosts";
import Search from "../Search/Search";
import UserRecommend from "../UserRecommend/UserRecommend";

const Main = (props) => {
  const parentRef = useRef();
  const userAuth = useSelector((state) => state.userAuthSlice.userAuth);

  const postData = {
    content: [<UserPage />, <Explore />, <PlanResponsive />, <Search />],
    //
    dock: {
      logoContracted: (
        <img
          className={styles["logo-icon"]}
          src={logo}
          style={{ width: "96px", height: "auto" }}
        />
      ),
      logoExpanded: <div className={styles["logo-text"]}>util</div>,
      dockContracted: [Icons.home, Icons.feed, Icons.compass, Icons.search],
      dockExpanded: [
        <div>마이 유틸</div>,
        <div>탐색 탭</div>,
        <div>목표</div>,
        <div>검색</div>,
      ],
      dockContractedBottom: [Icons.notification, <UserIcon />],
      dockExpandedBottom: [<div>알림</div>, <CurrentUser />],
      dockWrapperBottom: [<React.Fragment />, <UserDockWrapper />],
    },
    url: ["/index", "/explore", "/plan", "/search"],
    bottomUrl: ["/notification", "/user"],
  };

  return (
    <div className={styles["dock-wrapper"]} ref={parentRef}>
      <SwipeableDock parentRef={parentRef} content={postData} />
    </div>
  );
};

export default Main;

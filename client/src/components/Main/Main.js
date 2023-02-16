import React, { useRef } from "react";
import styles from "./Main.module.css";
import SwipeableDock from "../UI/SwipeableDock/SwipeableDock";
import * as Icons from "./Icons";
import logo from "../../img/util-logo.png";
import { useSelector } from "react-redux";
import { UserIcon, CurrentUser, UserDockWrapper } from "./MainUserInfo";
import UserPage from "../UserPage/UserPage";
import PlanResponsive from "../Plan/PlanResponsive";
import Explore from "../Explore/Explore";
import Search from "../Search/Search";

const Main = (props) => {
  const parentRef = useRef();
  const userAuth = useSelector((state) => state.userAuthSlice.userAuth);

  const postData = {
    content: [<UserPage />, <PlanResponsive />, <Explore />, <Search />],
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
      dockContracted: [Icons.home, Icons.compass, Icons.feed,  Icons.search],
      dockExpanded: [
        <div>마이 유틸</div>,
        <div>목표</div>,
        <div>탐색</div>,
        <div>검색</div>,
      ],
      dockContractedBottom: [<UserIcon />],
      dockExpandedBottom: [<CurrentUser />],
      dockWrapperBottom: [<UserDockWrapper />],
    },
    url: ["/index", "/plan", "/explore", "/search"],
    bottomUrl: ["/notification", "/user"],
  };

  return (
    <div className={styles["dock-wrapper"]} ref={parentRef}>
      <SwipeableDock parentRef={parentRef} content={postData} />
    </div>
  );
};

export default Main;

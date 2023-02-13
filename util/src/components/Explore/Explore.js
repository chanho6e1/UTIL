import { useState } from "react";
import { getMyTags } from "../../api/UserProfile/getMyTags";
import { getPostsByMyTag } from "../../api/Post/getPostsByMyTag";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import ExploreFeed from "./ExploreFeed";
import classes from "./Explore.module.css";
import ExpandIcon from "../../img/Expand40.svg";
import DropDown from "../UI/DropDown/DropDown";
import { useEffect, useRef } from "react";
import { Fragment } from "react";
import { getSubscribePosts } from "../../api/Post/getSubscribePosts";
import { Routes, Route } from "react-router-dom";
import DetailItem from "../Detail/DetailItem";
import Tab from "../UI/Tab/Tab";
import { useLocation } from "react-router-dom";
import FixedModal from "../UI/FixedModal/FixedModal";
import UserRecommend from "../UserRecommend/UserRecommend";
import UserPage from "../UserPage/UserPage";
import { getUserFollowing } from "../../api/Post/getUserFollowing";

const ExploreForm = () => {
  const [criteria, setCriteria] = useState(0);
  const criteriaLabelList = ["피드", "최신", "조회수", "좋아요"];
  const criteriaList = ["date", "view", "like"];
  const criteriaAPI = [getSubscribePosts, getPostsByMyTag, getPostsByMyTag, getPostsByMyTag];
  const [dropDownCriteriaState, setDropDownCriteriaState] = useState(false);
  const [myTagList, setMyTagList] = useState([]);
  const userAuth = useSelector((state) => state.userAuthSlice.userAuth);
  const exploreRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const exploreWrapperRef = useRef();
  const [followingListCnt, setFollowingListCnt] = useState(0);
  const [modalState, setModalState] = useState(false);
  const location = useLocation();

  const onFeedClick = () => {
    setCriteria(0);
  };

  const onDateClick = () => {
    setCriteria(1);
  };

  const onViewClick = () => {
    setCriteria(2);
  };

  const onLikeClick = () => {
    setCriteria(3);
  };

  const [feedList, setFeedList] = useState([]);
  const [offset, setOffset] = useState(1);
  const size = 10;

  useEffect(() => {
    // 내가 가진 태그 조회
    getMyTags().then((res) => {
      setMyTagList(() => [...res]);
    });
  }, []);

  useEffect(() => {
    setIsLoading(() => true);
    criteriaAPI[criteria](criteriaList[criteria], 1, 20).then((res) => {
      console.log("초기데이터", res.content);
      setFeedList(() => res.content);
      setOffset(() => 1);
      setIsLoading(() => false);
    });

    getUserFollowing(userAuth.currentUser.userId).then((res) => {
      setFollowingListCnt(() => res.length);
      setOffset(0);
      if (res.length <= 0) {
        // 추천 컴포넌트
        if (location.pathname === "/explore") {
          setModalState(true);
          setIsLoading(false);
        }
      }
    });
  }, [criteria, followingListCnt, userAuth]);

  const fetchMoreData = () => {
    setIsLoading(() => true);
    criteriaAPI[criteria](criteriaList[criteria], offset + 1, size).then((res) => {
      setFeedList((prevState) => [...prevState, ...res.content]);
      setOffset((prevState) => prevState + 1);
      setIsLoading(() => false);
    });
  };

  const dropDownCriteriaItems = {
    label: ["최신", "조회수", "좋아요"],
    description: ["", ""],
    function: [onDateClick, onViewClick, onLikeClick],
  };

  const tabItems = [
    { content: "피드", function: onFeedClick },
    { content: "탐색", function: onDateClick },
  ];

  const dropDown = (
    <div>
      <DropDown
        dropDownItems={dropDownCriteriaItems}
        dropDownState={dropDownCriteriaState}
        setDropDownState={setDropDownCriteriaState}
        width={"152px"}
        itemHeight={"48px"}
        direction={"down"}
        borderRadius={"5px"}
      />

      <div
        className={classes["dropdown"]}
        onClick={() => {
          setDropDownCriteriaState(() => true);
        }}
      >
        <li className={classes["drop-down-li-tag"]} />
        {criteriaLabelList[criteria]}
      </div>
    </div>
  );

  const header = (
    <div className={classes[`header`]}>
      <div className={classes["tab-wrapper"]}>
        <Tab tabItems={tabItems} width={"200px"} height={"48px"} />
      </div>
      {criteria === 0 ? null : dropDown}
    </div>
  );

  const onWheelHandler = (event) => {
    const scrollHeight = exploreWrapperRef.current.scrollHeight;
    const scrollTop = exploreWrapperRef.current.scrollTop;
    const clientHeight = exploreWrapperRef.current.clientHeight;
    console.log(scrollHeight, scrollTop, clientHeight);
    if (scrollTop + clientHeight >= scrollHeight - 10 && isLoading === false) {
      fetchMoreData();
    }
  };

  const message1 = "관심 태그가 없어요\n\n마이 프로필에서 태그를 설정해 보세요";
  const message2 = "관련 태그에 맞는 게시물이 없어요";
  const message3 = "팔로우 중인 회원의 피드가 없어요";

  const altMessages = (
    <Fragment>
      {criteria !== 0 && myTagList.length === 0 && (
        <div className={classes["alt-message-wrapper"]}>{message1}</div>
      )}
      {criteria !== 0 && feedList.length === 0 && (
        <div className={classes["alt-message-wrapper"]}>{message2}</div>
      )}
      {criteria === 0 && feedList.length === 0 && (
        <div className={classes["alt-message-wrapper"]}>{message3}</div>
      )}
    </Fragment>
  );

  return (
    <div className={classes["explore-wrapper"]} onWheel={onWheelHandler} ref={exploreWrapperRef}>
      <div className={classes["explore-inner-wrapper"]}>
        {header}
        {altMessages}
        <ExploreFeed
          feedList={feedList}
          modalState={modalState}
          setModalState={setModalState}
          myTagList={myTagList}
        />
      </div>
    </div>
  );
};

const Explore = (props) => {
  return (
    <div>
      <div id="explore-overlay-root"></div>

      <Routes>
        <Route path="explore/" element={<ExploreForm />} />
        <Route path="explore/:nickname/*" element={<ExploreForm />} />
        {/* <Route path="explore/*" element={<ExploreForm />} />   */}
        <Route path="explore/:nickname/post/:id" element={<DetailItem />} />
        {/* <Route path="*" element={<UserPage />} /> */}
      </Routes>
    </div>
  );
};

export default Explore;

import React, { useEffect, useState, useRef } from "react";
import { Route, Routes, useLocation, useSearchParams, useParams } from "react-router-dom";
import classes from "./UserPage.module.css";
import PostCardItem from "../UI/PostCard/PostCardItem";
import TagDataList from "../UI/Tag/TagDataList";
import { Avatar, Pagination } from "@mui/material";
import Button from "../UI/Button/Button";
import PostCardContainerLoading from "../UI/Loading/PostCardContainerLoading";
import { getUserPosts } from "../../api/Post/getUserPosts";
import { getMyPosts } from "../../api/Post/getMyPosts";
import { getUserData } from "../../api/Post/getUserData";
import { getIsFollowing } from "../../api/Post/getIsFollowing";
import { getUserFollower } from "../../api/Post/getUserFollower";
import { getUserFollowing } from "../../api/Post/getUserFollowing";
import { deleteFollow } from "../../api/Post/deleteUnfollow";
import { postFollow } from "../../api/Post/postFollow";
import { getUserTag } from "../../api/Post/getUserTag";
import { getMyData } from "../../api/UserProfile/getMyData";
import { useNavigate } from "react-router-dom";
import UserPageResponsive from "./UserPageResponsive";
import useDidMountEffect from "../../hooks/useDidMountEffect";
import { useSelector, useDispatch } from "react-redux";
import Swipe from "react-easy-swipe";
import GoalDetail from "../Goal/GoalDetail";
import DetailItem from "../Detail/DetailItem";
import Card from "../UI/Card/Card";
import PlanCard from "../Plan/PlanCard/PlanCard";
import PlanExpanded from "../Plan/PlanExpanded";
import DropDown from "../UI/DropDown/DropDown";
import PlanList from "../UI/PlanList/PlanList.js";
import { Fragment } from "react";
import FollowModal from "../UI/FollowModal/FollowModal";
import FixedModal from "../UI/FixedModal/FixedModal";
import Tab from "../UI/Tab/Tab";
import { getUserDataByNickname } from "../../api/Post/getUserDataByNickname";
import { useCalendarState } from "@mui/x-date-pickers/internals";

const postCardItemList = (postList) => {
  return postList?.map((post) => {
    return (
      <UserPageResponsive
        id={post.postId}
        key={post.postId}
        thumbnail={post.thumbnail}
        title={post.title}
        content={post.content}
        likeStatusSize={post.likeStatusSize}
        likeStatus={post.likeStatus}
        bookmarkStatus={post.bookmarkStatus}
        profileImg={post.writerInfo.profileImg}
        nickname={post.writerInfo.nickname}
        createdDate={post.createdDate}
        tagList={post.tags}
      />
    );
  });
};

const UserPageForm = (props) => {
  const containerRef = useRef();
  const [postList, setPostList] = useState(null);
  const [userData, setUserData] = useState([]);
  // const [myData, setMyData] = useState([]);
  const [isFollowing, setIsFollowing] = useState(null);
  const [followerList, setFollowerList] = useState(null);
  const [followerListCnt, setFollowerListCnt] = useState(null);
  const [followerModalState, setFollowerModalState] = useState(false);
  const [followingList, setFollowingList] = useState(null);
  const [followingListCnt, setFollowingListCnt] = useState(null);
  const [followingModalState, setFollowingModalState] = useState(false);
  const [userTagList, setUserTagList] = useState([]);
  const myData = useSelector((state) => state.userAuthSlice.userAuth.currentUser);
  const criteria = ["date", "view", "like"];
  const [criteriaIdx, setCriteriaIdx] = useState(0);
  const [offset, setOffset] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const size = 8;
  const [isLoading, setIsLoading] = useState(true);
  const postWrapperRef = useRef();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const plans = useSelector((state) => state.planSlice.allPlans);
  const PlanCardItemList = () => {
    return Object.keys(plans).map((id, arrIdx) => {
      return <PlanList plan={plans[id]} />;
    });
  };

  const fetchUserPostData = (criteriaIdx, page, size) => {
    setIsLoading(true);
    if (myData.userId === props.id) {
      getMyPosts(criteria[criteriaIdx], page, size).then((res) => {
        setPostList(() => res.content);
        setOffset(() => page);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
        containerRef.current.scrollTo({
          left: 0,
          top: postWrapperRef.current.offsetTop - 14,
          behavior: "smooth",
        });
      });
    } else {
      getUserPosts(props.id, criteria[criteriaIdx], page, size).then((res) => {
        setPostList(() => res.content);
        setOffset(() => page);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
        containerRef.current.scrollTo({
          left: 0,
          top: postWrapperRef.current.offsetTop - 14,
          behavior: "smooth",
        });
      });
    }
  };

  const fetchUserPostDataMobile = (criteriaIdx, page, size) => {
    setIsLoading(true);
    if (myData.userId === props.id) {
      getMyPosts(criteria[criteriaIdx], page + 1, size).then((res) => {
        setPostList((prev) => [...prev, ...res.content]);
        setOffset(() => page + 1);
        // setIsLoading(false)
        setTimeout(() => {
          setIsLoading(false);
          setFetchStart(() => false);
        }, 500);
      });
    } else {
      getUserPosts(props.id, criteria[criteriaIdx], page + 1, size).then((res) => {
        setPostList((prev) => [...prev, ...res.content]);
        setOffset(() => page + 1);
        setTimeout(() => {
          setIsLoading(false);
          setFetchStart(() => false);
        }, 500);
      });
    }
  };

  const [fetchStart, setFetchStart] = useState(false);

  useEffect(() => {
    if (fetchStart === true) {
      fetchUserPostDataMobile(criteriaIdx, offset, size);
    }
  }, [fetchStart]);

  // 초기 데이터
  useEffect(() => {
    // Post API
    setIsLoading(true);

    if (myData.userId === props.id) {
      getMyPosts(criteria[criteriaIdx], offset, size).then((res) => {
        setPostList(() => res.content);
        setTotalPage(() => res.totalPages);
        setIsLoading(false);
      });
    } else {
      getUserPosts(props.id, criteria[criteriaIdx], offset, size).then((res) => {
        setPostList(() => res.content);
        setTotalPage(() => res.totalPages);
        setIsLoading(false);
      });
    }

    // My Data API
    // getMyData().then((res) => {
    //   setMyData(() => res);
    //   console.log("ssafy me", res);
    // });

    // User Data API, Tag Data
    getUserData(props.id).then((res) => {
      setUserData(() => res);
      setUserTagList(() => res.tags);
    });
  }, [props.id]);

  // Follow Data API
  const fetchUserFollower = (id) => {
    getUserFollower(id).then((res) => {
      setFollowerList(() => res);
      setFollowerListCnt(() => res.length);
    });
  };

  const fetchUserFollowing = (id) => {
    getUserFollowing(id).then((res) => {
      setFollowingList(() => res);
      setFollowingListCnt(() => res.length);
    });
  };

  useEffect(() => {
    getIsFollowing(props.id).then((res) => {
      setIsFollowing(() => res);
    });
    fetchUserFollower(props.id);
    fetchUserFollowing(props.id);
  }, [isFollowing, props.id]);

  const tagOnClickHandler = (event) => {
    const tagName = event.currentTarget.getAttribute("value");
    navigate(`/search?tag=${tagName}`);
  };

  const followBtnHandler = () => {
    // 현재 팔로우 중이면 언팔
    if (isFollowing) {
      deleteFollow(props.id).then((res) => {
        if (res === 200) {
          setIsFollowing((prevState) => !prevState);
        }
      });
    } else {
      postFollow(props.id).then((res) => {
        if (res === 200) {
          setIsFollowing((prevState) => !prevState);
        }
      });
    }
  };

  // isFollowing State에 맞게 팔로우 버튼 다르게 렌더링
  const followBtn = (isFollowing) => {
    if (isFollowing) {
      return (
        <Button
          className={`${classes[`follow-btn-true`]} ${classes[`button`]}`}
          onClick={followBtnHandler}
        >
          팔로잉
        </Button>
      );
    } else {
      return (
        <Button
          className={`${classes[`follow-btn-false`]} ${classes[`button`]}`}
          onClick={followBtnHandler}
        >
          팔로우
        </Button>
      );
    }
  };

  // 작성 글이 없다면 대체 화면 출력
  const postCardContainer = (postList) => {
    if (isLoading) {
      return <PostCardContainerLoading count={size} />;
    }
    if (!isLoading && postList && postList.length === 0) {
      return <div className={classes[`no-post`]}>포스트가 없습니다</div>;
    } else {
      return postCardItemList(postList);
    }
  };


  const pageChangeHandler = (event, page) => {
    fetchUserPostData(criteriaIdx, page, size);
    searchParams.set("page", page)
    setSearchParams(searchParams)
    // setOffset(parseInt(searchParams.get("page")))
  };
  
  // useEffect(() => {
  //   setOffset(parseInt(searchParams.get("page")))
  // }, [])

  useEffect(() => {
    // fetchUserPostData(criteriaIdx, offset, size);
    if (offset !== searchParams.get("page") && searchParams.get("page") !== null) {
      fetchUserPostData(criteriaIdx, searchParams.get("page"), size);
    }
  });
  
  // scroll event handler
  const handleScroll = () => {
    const scrollHeight = containerRef.current.scrollHeight;
    const scrollTop = containerRef.current.scrollTop;
    const clientHeight = containerRef.current.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight - 1 && isLoading === false) {
      if (offset < totalPage) {
        if (document.body.clientWidth < 1080) {
          setFetchStart(() => true);
        }
      }

      // 페이지 끝에 도달하면 추가 데이터를 받아온다
    }
  };

  useEffect(() => {
    // scroll event listener 등록
    if (containerRef.current !== null) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      // scroll event listener 해제
      if (containerRef.current !== null) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  });

  const userInformation = (
    <div className={classes[`user-page-upper`]}>
      <FixedModal
        modalState={followerModalState}
        stateHandler={setFollowerModalState}
        content={
          <FollowModal
            title={"팔로워"}
            followData={followerList}
            onFollowModalClose={() => {
              fetchUserFollower(props.id);
              fetchUserFollowing(props.id);
            }}
          />
        }
        width={"400px"}
        height={"400px"}
        overflow={"hidden"}
      />
      <FixedModal
        modalState={followingModalState}
        stateHandler={setFollowingModalState}
        content={
          <FollowModal
            title={"팔로우"}
            followData={followingList}
            onFollowModalClose={() => {
              fetchUserFollower(props.id);
              fetchUserFollowing(props.id);
            }}
          />
        }
        width={"400px"}
        height={"400px"}
        overflow={"hidden"}
      />
      <div className={classes[`user-page-upper-inner`]}>
        <div className={classes[`avatar-username`]}>
          <Avatar
            src={userData.imageUrl}
            sx={{
              width: "5vw",
              height: "5vw",
              minWidth: "56px",
              minHeight: "56px",
              maxWidth: "128px",
              maxHeight: "128px",
              border: "1px solid lightgray",
              marginRight: "6px",
              objectFit: "scale-down",
            }}
          />
        </div>
        <div className={classes["user-outer-wrapper"]}>
          <div className={classes["user-wrapper"]}>
            <div>
              <div className={classes["user-column"]}>
                <div className={classes.nickname}>{userData.nickname}</div>
                <div className={classes.follow}>
                  <div className={classes["follow-text-wrapper"]}>
                    <div
                      className={classes[`follow-text`]}
                      onClick={() => {
                        setFollowerModalState(true);
                      }}
                    >
                      팔로워
                    </div>
                    <div className={classes[`follow-number`]}>{followerListCnt}명</div>
                    <div
                      className={classes[`follow-text`]}
                      onClick={() => setFollowingModalState(true)}
                    >
                      팔로우
                    </div>
                    <div className={classes[`follow-number`]}>{followingListCnt}명</div>
                  </div>

                  {myData.userId !== props.id && followBtn(isFollowing)}
                </div>
              </div>
              <div className={classes["user-column"]}>
                <div className={classes["user-description"]}>{userData.discription}</div>
              </div>
            </div>
          </div>
          <div className={classes["tag-wrapper-pc"]}>
            <TagDataList tagList={userTagList} onClick={tagOnClickHandler} />
          </div>
        </div>
      </div>
      <Swipe
        onSwipeStart={(event) => {
          event.stopPropagation();
        }}
      >
        <div className={classes["tag-wrapper-mobile"]}>
          <TagDataList tagList={userTagList} onClick={tagOnClickHandler} />
        </div>
      </Swipe>
    </div>
  );

  const header = (
    <React.Fragment>
      {userInformation}
      <div className={classes["line"]} />
    </React.Fragment>
  );
  
  const [category, setCategory] = useState("전체 글");

  const categoryDropDownItems = {
    label: ["전체 글", "전체 목표"],
    function: [
      () => {
        setCategory("전체 글");
      },
      () => {
        setCategory("전체 목표");
      },
    ],
  };

  const tabItems = [
    {
      content: "전체 글",
      function: () => {
        setCategory("전체 글");
      },
    },
    {
      content: "전체 목표",
      function: () => {
        setCategory("전체 목표");
      },
    },
  ];

  const [categoryDropDownState, setCategoryDropDownState] = useState(false);

  const postDropDownItems = {
    label: ["포스트 작성", "회고록 작성"],
    function: [
      () => {
        navigate("/create/post");
      },
      () => {
        navigate("/create/review");
      },
    ],
  };

  const [postDropDownState, setPostDropDownState] = useState(false);

  const categoryView =
    category === "전체 글" ? (
      <Fragment>
        <div ref={postWrapperRef}>{postCardContainer(postList)}</div>

        <div className={classes[`pagination`]}>
          <Pagination count={totalPage} onChange={pageChangeHandler} page={parseInt(offset)}/>
        </div>
      </Fragment>
    ) : (
      <Fragment>{PlanCardItemList()}</Fragment>
    );

  const kanbanBoard = (
    <div className={classes["kanban-wrapper"]}>
      <Card className={classes["plan-kanban"]}>
        <PlanExpanded contracted={true} />
      </Card>
    </div>
  )

  const planCards = (
    <div className={classes["plan-card-wrapper"]}>
      <PlanCard />
    </div>
  )

  const postButton = (
    <div>
      <DropDown
        dropDownItems={postDropDownItems}
        dropDownState={postDropDownState}
        setDropDownState={setPostDropDownState}
        width={"152px"}
        itemHeight={"48px"}
        direction={"down"}
        borderRadius={"5px"}
      />
      <div
        className={classes["dropdown"]}
        onClick={() => {
          setPostDropDownState(() => true);
        }}
      >
        <li className={classes["drop-down-li-tag"]} />글 작성
      </div>
    </div>
  )

  return (
    <div ref={containerRef} className={classes["user-page"]}>
      <div className={classes["contents"]}>
        {header}

        <div className={classes["body-header"]}>
          {/* <div>
            <DropDown
              dropDownItems={categoryDropDownItems}
              dropDownState={categoryDropDownState}
              setDropDownState={setCategoryDropDownState}
              width={"152px"}
              itemHeight={"48px"}
              direction={"down"}
              borderRadius={"5px"}
            />
            <div
              className={classes["dropdown"]}
              onClick={() => {
                setCategoryDropDownState(() => true);
              }}
            >
              <li className={classes["drop-down-li-tag"]} />
              {category}
            </div>
          </div> */}
          {myData.userId === props.id && <Tab tabItems={tabItems} width={"200px"} height={"48px"} />}

          {myData.userId === props.id && postButton}
        </div>
        <div className={classes["body"]}>
          <div className={classes["article-list-wrapper"]}>
            {myData.userId === props.id && kanbanBoard}
            {categoryView}
          </div>
          {myData.userId === props.id && planCards}
        </div>
      </div>
    </div>
  );
};

const UserPageSet = (props) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const myData = useSelector((state) => state.userAuthSlice.userAuth.currentUser);
  // const [userId, setUserId] = useState(searchParams.get("user_id"));
  const [userData, setUserData] = useState([]);
  const params = useParams();
  const nickname = params["nickname"];

  useEffect(() => {
    if (nickname !== undefined) {
      getUserDataByNickname(nickname).then((res) => {
        console.log("res", res);
        setUserData(() => res);
      });
    }
  }, [params["nickname"]]);

  return (
    <div>
      <div id="index-overlay-root"></div>
      {myData !== null && nickname === undefined && (
        <UserPageForm id={myData?.userId} nickname={myData?.nickname} />
      )}
      {myData !== null &&
        nickname !== undefined &&
        userData?.userId != null &&
        userData?.nickname != null && (
          <UserPageForm id={userData.userId} nickname={userData.nickname} />
        )}
    </div>
  );
};

const UserPage = (props) => {
  return (
    <div>
      <div id="index-overlay-root"></div>

      <Routes>
        {/* <Route path="*" element={<UserPageForm id={userId === null ? myData.userId : userId} />} /> */}
          <Route path="index/" element={<UserPageSet/>}/>
          <Route path="index/:nickname/*" element={<UserPageSet/>}/>

        {/* <Route path="index/goal/:id" element={<GoalDetail />} />
          <Route path="index/post/:id" element={<DetailItem />} /> */}
          <Route path="index/goal/:id" element={<GoalDetail />} />
          <Route path="index/:nickname/post/:id" element={<DetailItem />} />
          {/* <Route path="index/:nickname/m/modal/post/:id" element={<UserPageSet />} /> */}

        {/* `/${url}/${props.nickname}/m/modal/post/${props.id}` */}
        {/* <Route
            path="indexes/:nickname"
            element={myData !== null && userData.userId && userData.nickname && <UserPageForm id={userData.userId} nickname={userData.nickname} />}
          /> */}
      </Routes>
    </div>
  );
};
export default UserPage;

// http://localhost:3000/index/asdfasdf

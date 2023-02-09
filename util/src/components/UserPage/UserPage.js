import React, { useEffect, useState, useRef } from "react";
import { Route, Routes } from "react-router-dom";
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

import PlanCard from "../Plan/PlanCard/PlanCard";

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
  const [followingList, setFollowingList] = useState(null);
  const [followingListCnt, setFollowingListCnt] = useState(null);
  const [userTagList, setUserTagList] = useState([]);
  const myData = useSelector((state) => state.userAuthSlice.userAuth.currentUser);
  const criteria = ["date", "view", "like"];
  const [criteriaIdx, setCriteriaIdx] = useState(0);
  const [offset, setOffset] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const size = 8;
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const fetchUserPostData = (criteriaIdx, page, size) => {
    setIsLoading(true);
    if (myData.userId === props.id) {
      getMyPosts(criteria[criteriaIdx], page, size).then((res) => {
        setPostList(() => res.content);
        setOffset(() => page);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
    } else {
      getUserPosts(props.id, criteria[criteriaIdx], page, size).then((res) => {
        setPostList(() => res.content);
        setOffset(() => page);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
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

    // User Data API
    getUserData(props.id).then((res) => {
      setUserData(() => res);
    });

    // Tag Data API
    getUserTag(props.id).then((res) => {
      setUserTagList(() => res);
    });
  }, []);

  // Follow Data API
  useEffect(() => {
    getIsFollowing(props.id).then((res) => {
      setIsFollowing(() => res);
    });
    getUserFollower(props.id).then((res) => {
      setFollowerList(() => res);
      setFollowerListCnt(() => res.length);
    });
    getUserFollowing(props.id).then((res) => {
      setFollowingList(() => res);
      setFollowingListCnt(() => res.length);
    });
  }, [isFollowing]);

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
  };

  const wrapperDiv = useRef();

  // scroll event handler
  const handleScroll = () => {
    const scrollHeight = containerRef.current.scrollHeight;
    const scrollTop = containerRef.current.scrollTop;
    const clientHeight = containerRef.current.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight - 1 && isLoading === false) {
      if (offset < totalPage) {
        setFetchStart(() => true);
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

  const userPageUpper = (
    <div className={classes[`user-page-upper`]}>
      <div className={classes[`user-page-upper-inner`]}>
        <div className={classes[`avatar-username`]}>
          <Avatar
            src={userData.imageUrl}
            sx={{
              width: "15vw",
              height: "15vw",
              minWidth: "96px",
              minHeight: "96px",
              maxWidth: "128px",
              maxHeight: "128px",
              border: "1px solid lightgray",
              marginRight: "12px",
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
                    <div className={classes[`follow-text`]}>팔로워</div>
                    <div className={classes[`follow-number`]}>{followerListCnt}명</div>
                    <div className={classes[`follow-text`]}>팔로우</div>
                    <div className={classes[`follow-number`]}>{followingListCnt}명</div>
                  </div>

                  {myData.userId !== props.id && followBtn(isFollowing)}
                  {followBtn(isFollowing)}
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

  return (
    <div ref={wrapperDiv} className={classes[`user-page`]}>
      <div ref={containerRef} className={classes[`postcard-container`]}>
        <div className={classes[`postcard-inner`]}>
          {userPageUpper}
          <div className={classes["line"]} />
          {postCardContainer(postList)}
        </div>

        <div className={classes["plan-card-wrapper"]}>
          <PlanCard />
        </div>
      </div>

      <div className={classes[`pagination`]}>
        <Pagination count={totalPage} onChange={pageChangeHandler} />
      </div>
    </div>
  );
};

const UserPage = (props) => {
  return (
    <div>
      <div id="inner-overlay-root"></div>
      <Routes>
        <Route path="/*" element={<UserPageForm id={props.id} />} />
        <Route path="index/*" element={<UserPageForm id={props.id} />} />
        <Route path="index/goal/:id" element={<GoalDetail />} />
        <Route path="index/post/:id" element={<DetailItem />} />
      </Routes>
    </div>
  );
};
export default UserPage;

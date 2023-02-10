import FeedCardItem from "../UI/FeedCard/FeedCardItem";
import classes from "./Feed.module.css";
import { useState, useEffect, useRef, Fragment } from "react";
import Loading from "../UI/Loading/Loading";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserFollowing } from "../../api/Post/getUserFollowing";
import UserRecommend from "../UserRecommend/UserRecommend";
import FixedModal from "../UI/FixedModal/FixedModal";

const feedCardItemList = (postList) => {
  return postList?.map((post) => {
    return (
      <div key={`simple-feed-card-${post.postId}`} className={classes["card-wrapper"]}>
        <FeedCardItem
          id={post.postId}
          key={post.postId}
          thumbnail={post.thumbnail}
          title={post.title}
          contents={post.contents}
          likeStatusSize={post.likeStatusSize}
          likeStatus={post.likeStatus}
          bookmarkStatus={post.bookmarkStatus}
          profileImg={post.writerInfo.profileImg}
          nickname={post.writerInfo.nickname}
          createdDate={post.createdDate}
        />
      </div>
    );
  });
};

const Feed = (props) => {
  const userAuth = useSelector((state) => state.userAuthSlice.userAuth);
  const [feedList, setFeedList] = useState([]);

  const [criteria, setCriteria] = useState(props.criteria || 0);
  const criteriaList = ["date", "view", "like"];
  const [offset, setOffset] = useState(0);
  const size = 10;
  const feedRef = useRef();
  const [followingListCnt, setFollowingListCnt] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (userAuth.currentUser !== null) {
      getUserFollowing(userAuth.currentUser.userId).then((res) => {
        setFollowingListCnt(() => res.length);
        setOffset(0);
        if (res.length > 0) {
          props.api(criteriaList[criteria], offset + 1, size).then((res) => {
            setOffset((prevState) => prevState + 1);
            setFeedList(() => res.content);
            setIsLoading(false);
          });
        } else {
          // 추천 컴포넌트
          if (location.pathname === "/feed") {
            setModalState(true);
            setIsLoading(false);
          }
        }
      });
    }
  }, [criteria, userAuth, followingListCnt]);

  const fetchMoreData = () => {
    setIsLoading(true);
    props.api(criteriaList[criteria], offset + 1, size).then((res) => {
      setFeedList((prevState) => [...prevState, ...res.content]);
      setOffset((prevState) => prevState + 1);
      setIsLoading(false);
    });
  };

  // scroll event handler
  const handleScroll = () => {
    const scrollHeight = feedRef.current.scrollHeight;
    const scrollTop = feedRef.current.scrollTop;
    const clientHeight = feedRef.current.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight - 10 && isLoading === false) {
      // 페이지 끝에 도달하면 추가 데이터를 받아온다
      fetchMoreData();
    }
  };

  const content = (feedList) => {
    if (feedList.length > 0) {
      return <ul>{feedCardItemList(feedList)}</ul>;
    } else {
      return <div className={classes[`no-post`]}>포스트가 없습니다</div>;
    }
  };

  useEffect(() => {
    // scroll event listener 등록
    if (feedRef.current !== null) {
      feedRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      // scroll event listener 해제
      if (feedRef.current !== null) {
        feedRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  });

  const recommendDoneHandler = () => {
    fetchMoreData();
  };

  return (
    <Fragment>
      <div id="feed-overlay-root"></div>
      <FixedModal
        modalState={modalState}
        stateHandler={setModalState}
        content={<UserRecommend onDone={recommendDoneHandler} />}
        width={"100vh"}
        height={"400px"}
        overflow={"hidden"}
      />
      <div className={classes.feed} ref={feedRef}>
        {content(feedList)}
        {isLoading && <div className={classes.loading}>{Loading()}</div>}
      </div>
    </Fragment>
  );
};

export default Feed;

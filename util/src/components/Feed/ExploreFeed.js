import FeedCardItem from "../UI/FeedCard/FeedCardItem";
import classes from "./Feed.module.css";
import { getPosts } from "../../api/Post/getPosts";
import { useState, useEffect, useRef, Fragment } from "react";
import Loading from "../UI/Loading/Loading";

const feedCardItemList = (postList) => {
  return postList?.map((post) => {
    return (
      <div key={`explore-feed-card-${post.postId}`} className={classes["card-wrapper"]}>
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

const ExploreFeed = (props) => {
  const [feedList, setFeedList] = useState([]);
  const [criteria, setCriteria] = useState(props.criteria === undefined ? 0 : props.criteria);
  const criteriaList = ["date", "view", "like"];
  const [offset, setOffset] = useState(1);
  const size = 10;
  const feedRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    props.api(criteriaList[criteria], offset, size).then((res) => {
      setFeedList(() => res.content);
      setIsLoading(false);
    });
  }, [criteria]);

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

  const content = (postList) => {
    if (postList.length > 0) {
      return <ul>{feedCardItemList(feedList)}</ul>;
    } else {
      return <div className={classes[`alt-text`]}>관련 태그에 맞는 게시물이 없어요</div>;
    }
  };
  return (
    <Fragment>
      <div className={classes.feed} ref={feedRef}>
        {content(feedList)}
        {isLoading && <div className={classes.loading}>{Loading()}</div>}
      </div>
    </Fragment>
  );
};

export default ExploreFeed;

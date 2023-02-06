import FeedCardItem from "../UI/FeedCard/FeedCardItem";
import classes from "./Feed.module.css";
import { getPosts } from "../../api/Post/getPosts";
import { useState, useEffect, useRef, Fragment } from "react";
import Loading from "../UI/Loading/Loading";

const feedCardItemList = (postList) => {
  return postList?.map((post) => {
    return (
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
    );
  });
};

const Feed = (props) => {
  const [feedList, setFeedList] = useState([]);
  const criteria = ["date", "view", "like"];
  const [offset, setOffset] = useState(1);
  const size = 10;

  const feedRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPosts(criteria[0], offset, size).then((res) => {
      setFeedList(() => res);
      setIsLoading(false);
    });
  }, []);

  const fetchMoreData = () => {
    setIsLoading(true);
    getPosts(criteria[0], offset + 1, size).then((res) => {
      setFeedList((prevState) => [...prevState, ...res]);
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
    feedRef.current.addEventListener("scroll", handleScroll);
    return () => {
      // scroll event listener 해제
      feedRef.current.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <Fragment>
      <div className={classes.feed} ref={feedRef}>
        {<ul>{feedCardItemList(feedList)}</ul>}
      </div>
      <div>{isLoading && <div className={classes.loading}>{Loading()}</div>}</div>
    </Fragment>
  );
};

export default Feed;

import FeedCardItem from "../UI/FeedCard/FeedCardItem";
import classes from "./Feed.module.css";
import { getPosts } from "../../api/Post/getPosts";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
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

const Feed = () => {
  const [feedList, setFeedList] = useState([]);
  const criteria = ["date", "view", "like"];
  const [offset, setOffset] = useState(1);
  const size = 5;

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

  // const handleScroll = () => {
  //   console.log("handle");
  //   const scrollHeight = document.documentElement.scrollHeight;
  //   const scrollTop = document.documentElement.scrollTop;
  //   const clientHeight = document.documentElement.clientHeight;

  //   if (scrollTop + clientHeight >= scrollHeight && isLoading === true) {
  //     fetchMoreData();
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   // return () => {
  //   //   window.removeEventListener("scroll", handleScroll);
  //   // };
  // });

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    console.log("sh", scrollHeight, "st", scrollTop, "ch", clientHeight);
    if (scrollTop + clientHeight >= scrollHeight && isLoading === false) {
      // 페이지 끝에 도달하면 추가 데이터를 받아온다
      fetchMoreData();
    }
  };

  useEffect(() => {
    // scroll event listener 등록
    window.addEventListener("scroll", handleScroll);
    return () => {
      // scroll event listener 해제
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <div className={classes.feed}>
      {<ul>{feedCardItemList(feedList)}</ul>}
      {isLoading && Loading()}
    </div>
  );
};

export default Feed;

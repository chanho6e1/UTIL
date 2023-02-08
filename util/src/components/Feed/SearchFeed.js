import FeedCardItem from "../UI/FeedCard/FeedCardItem";
import classes from "./Feed.module.css";
import { useState, useEffect, useRef, Fragment } from "react";
import Loading from "../UI/Loading/Loading";
import { getPostSearch } from "../../api/Post/getPostSearch";
import { getPostByTagName } from "../../api/Post/getPostByTagName";
import { getPostByNickname } from "../../api/Post/getPostByNickname";

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

const SearchFeed = (props) => {
  const [feedList, setFeedList] = useState([]);
  const criteria = ["date", "view", "like"];
  const [offset, setOffset] = useState(1);
  const size = 10;

  const searchRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (props.searchInput !== null && props.searchInput !== "") {
      setIsLoading(true);
      if (props.api === 0) {
        getPostSearch(criteria[props.criteria], offset, size, props.searchInput).then((res) => {
          if (res.content.length !== 0) {
            setFeedList(() => res.content);
          }
          setIsLoading(false);
        });
      } else if (props.api === 1) {
        getPostByTagName(criteria[props.criteria], offset, size, props.searchInput).then((res) => {
          if (res.content.length !== 0) {
            setFeedList(() => res.content);
          }
          setIsLoading(false);
        });
      } else {
        getPostByNickname(criteria[props.criteria], offset, size, props.searchInput).then((res) => {
          if (res.content.length !== 0) {
            setFeedList(() => res.content);
          }
          setIsLoading(false);
        });
      }
    }
  }, [props.searchInput, props.api, props.criteria]);

  const fetchMoreData = () => {
    setIsLoading(true);
    if (props.api === 0) {
      getPostSearch(criteria[props.criteria], offset + 1, size, props.searchInput).then((res) => {
        setFeedList((prevState) => [...prevState, ...res.content]);
        setOffset((prevState) => prevState + 1);
        setIsLoading(false);
      });
    } else {
      getPostByTagName(criteria[props.criteria], offset + 1, size, props.searchInput).then(
        (res) => {
          setFeedList((prevState) => [...prevState, ...res.content]);
          setOffset((prevState) => prevState + 1);
          setIsLoading(false);
        }
      );
    }
  };

  // scroll event handler
  const handleScroll = () => {
    const scrollHeight = searchRef.current.scrollHeight;
    const scrollTop = searchRef.current.scrollTop;
    const clientHeight = searchRef.current.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 10 && isLoading === false) {
      // 페이지 끝에 도달하면 추가 데이터를 받아온다
      fetchMoreData();
    }
  };

  useEffect(() => {
    // scroll event listener 등록
    if (searchRef.current !== null) {
      searchRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      // scroll event listener 해제
      if (searchRef.current !== null) {
        searchRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  });

  return (
    <Fragment>
      <div className={classes.feed} ref={searchRef}>
        {<ul>{feedCardItemList(feedList)}</ul>}
        {isLoading && <div className={classes.loading}>{Loading()}</div>}
      </div>
    </Fragment>
  );
};

export default SearchFeed;

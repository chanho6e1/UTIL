import FeedCardItem from "../UI/FeedCard/FeedCardItem";
import classes from "./Feed.module.css";
import { getPosts } from "../../api/Post/getPosts";
import { useState, useEffect, useRef, Fragment } from "react";
import Loading from "../UI/Loading/Loading";
import FixedModal from "../UI/FixedModal/FixedModal";
import UserRecommend from "../UserRecommend/UserRecommend";
import { useLocation } from "react-router-dom";

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
  const criteriaList = ["feed", "date", "view", "like"];
  const [offset, setOffset] = useState(1);
  const size = 10;
  const feedRef = useRef();
  const location = useLocation()

  // const location = useLocation();

  const [modalState, setModalState] = useState(false);


  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // if (criteria !== 0) {
      props.api(criteriaList[props.criteria], offset, size).then((res) => {
        // setFeedList(() => res.content);
        // setIsLoading(false);
        console.log(res.content)
        if (res.content.length > 0) {
          
          // setOffset((prevState) => prevState + 1);
          setFeedList(() => res.content);
          setIsLoading(false);

          

        } else {
          setFeedList(() => [])

          if (props.criteria === 0) {
            // 추천 컴포넌트
            if (location.pathname === "/explore") {
              setModalState(true);
              setIsLoading(false);
            }
          }
        }
        
        




      });
    // } else {

    // }

    
  }, [props.criteria]);

  const fetchMoreData = () => {
    setIsLoading(true);
    // if (criteria !== 0) {
      props.api(criteriaList[props.criteria], offset + 1, size).then((res) => {
        setFeedList((prevState) => [...prevState, ...res.content]);
        setOffset((prevState) => prevState + 1);
        setIsLoading(false);
        
      });
    // } else {

    // }
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


  const recommendDoneHandler = () => {
    fetchMoreData();
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
    const altText1 = (<div className={classes[`alt-text`]}>관심 태그가 없어요<br/><br/>마이 프로필에서 태그를 설정해 보세요</div>)
    const altText2 = (<div className={classes[`alt-text`]}>관련 태그에 맞는 게시물이 없어요</div>)
    const altText3 = (<div className={classes[`alt-text`]}>팔로우 중인 회원의 포스트가 없어요 </div>)

    if (postList.length > 0) {
      return <div className={classes['feed-card-wrapper']}>{feedCardItemList(feedList)}</div>;
    } else {
      return <Fragment>{props.criteria === 0 ? altText3 : (props.myTagList.length > 0 ? altText2 : altText1)}</Fragment>
    }
  };


  return (
    <Fragment>
      
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

export default ExploreFeed;

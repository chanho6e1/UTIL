import FeedCardItem from "../UI/FeedCard/FeedCardItem";
import classes from "./ExploreFeed.module.css";
import { getPosts } from "../../api/Post/getPosts";
import { useState, useEffect, useRef, Fragment } from "react";
import Loading from "../UI/Loading/Loading";
import FixedModal from "../UI/FixedModal/FixedModal";
import UserRecommend from "../UserRecommend/UserRecommend";
import { useLocation } from "react-router-dom";



const ExploreFeed = (props) => {
  const location = useLocation()
  const [modalState, setModalState] = useState(false);


  const feedCardItemList = props.feedList.map((post) => {
    return (
      <div className={classes['feed-card-item-wrapper']}>
        <FeedCardItem
          id={post.postId}
          key={`explore-feed-card-${post.postId}`}
          thumbnail={post.thumbnail}
          title={post.title}
          contents={post.contents}
          likeStatusSize={post.likeStatusSize}
          likeStatus={post.likeStatus}
          bookmarkStatus={post.bookmarkStatus}
          profileImg={post.writerInfo.profileImg}
          nickname={post.writerInfo.nickname}
          userId={post.writerInfo.userId}
          createdDate={post.createdDate}
        />
      </div>
    );
  });
  





  return (
    <Fragment>
      <FixedModal
        modalState={modalState}
        stateHandler={setModalState}
        content={<UserRecommend />}
        width={"100vh"}
        height={"400px"}
        overflow={"hidden"}
      />

      <div className={classes['feed-wrapper']}>
        {feedCardItemList}
      </div>
    </Fragment>
  );
};

export default ExploreFeed;

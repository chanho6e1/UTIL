import FeedCardItem from "../UI/FeedCard/FeedCardItem";
import classes from "./ExploreFeed.module.css";
import { Fragment } from "react";
import { useLocation } from "react-router-dom";

const ExploreFeed = (props) => {
  const location = useLocation();

  const feedCardItemList = props.feedList.map((post, idx) => {
    return (
      <div key={`explore-feed-card-${post.postId}-${post.title}-${post.writerInfo.nickname}-${idx}`} className={classes["feed-card-item-wrapper"]}>
        <FeedCardItem
          id={post.postId}
          // key={`explore-feed-card-${post.postId}`}
          thumbnail={post.thumbnail}
          title={post.title}
          contents={post.content}
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
      <div className={classes["feed-wrapper"]}>{feedCardItemList}</div>
    </Fragment>
  );
};

export default ExploreFeed;

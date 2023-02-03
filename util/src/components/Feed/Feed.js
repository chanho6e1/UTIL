import React from "react";
import FeedCardItem from "../UI/FeedCard/FeedCardItem";
import classes from "./Feed.module.css";
import { getPosts } from "../../api/Post/getPosts";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useState } from "react";

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
  const [feedList, setFeedList] = useState(null);

  useEffect(() => {
    getPosts().then((res) => {
      setFeedList(() => res);
    });
  }, []);

  return <div className={classes.feed}>{<ul>{feedCardItemList(feedList)}</ul>}</div>;
};

export default Feed;

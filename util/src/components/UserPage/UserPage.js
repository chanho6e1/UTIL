import { useEffect, useState } from "react";
import classes from "./UserPage.module.css";
import { getUserPosts } from "../../api/Post/getUserPosts";
import PostCardItem from "../UI/PostCard/PostCardItem";
import { Avatar } from "@mui/material";

const postCardItemList = (postList) => {
  return postList?.map((post) => {
    return (
      <PostCardItem
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

const UserPage = (props) => {
  const [postList, setPostList] = useState(null);
  const [userId, setUserId] = useState(null);
  const [profileImg, setProfileImg] = useState(null);

  useEffect(() => {
    getUserPosts(props.id).then((res) => {
      setPostList(() => res);
    });
  }, []);

  useEffect(() => {
    
  }, []);

  return (
    <div className={classes[`user-page`]}>
      <div className={classes[`user-page-upper`]}>
        <Avatar
          src={props.profileImg}
          sx={{
            width: 128,
            height: 128,
            border: "1px solid lightgray",
            objectFit: "scale-down",
          }}
        />
        <div>{userId}</div>
      </div>
      <div className={classes[`postcard-container`]}>{<ul>{postCardItemList(postList)}</ul>}</div>
    </div>
  );
};

export default UserPage;

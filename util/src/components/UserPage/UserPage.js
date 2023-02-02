import { useEffect, useState } from "react";
import classes from "./UserPage.module.css";
import { getUserPosts } from "../../api/Post/getUserPosts";
import { getUserData } from "../../api/Post/getUserData";
import PostCardItem from "../UI/PostCard/PostCardItem";
import { Avatar, Button } from "@mui/material";

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
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    getUserPosts(props.id).then((res) => {
      setPostList(() => res);
    });
  }, []);

  // useEffect(() => {
  //   getUserData(props.id).then((res) => {
  //     setUserData(() => res);
  //   });
  // }, []);

  return (
    <div className={classes[`user-page`]}>
      <div className={classes[`user-page-upper`]}>
        <div className={classes[`avatar-username`]}>
          <Avatar
            src={props.profileImg}
            sx={{
              width: 128,
              height: 128,
              border: "1px solid lightgray",
              objectFit: "scale-down",
            }}
          />
          <div className={classes.nickname}>ten_letter</div>
        </div>
        <div className={classes[`follow-userdata`]}>
          <div className={classes.follow}>
            <div className={classes.follower}>
              <div className={classes[`follow-text`]}>팔로워</div>
              <div className={classes[`follow-number`]}>30명</div>
            </div>
            <div className={classes.follower}>
              <div className={classes[`follow-text`]}>팔로우</div>
              <div className={classes[`follow-number`]}>50명</div>
            </div>
            <Button variant="contained">Follow</Button>
          </div>
          <div className={classes[`username-department`]}>
            <div className={classes.username}>송기훈</div>
            <div className={classes[`department-text`]}>소속</div>
            <div className={classes[`department-data`]}>SSAFY</div>
          </div>
          <div className={classes.email}>kihunbuzz@naver.com</div>
          <div className={classes.tags}>python kotlin android</div>
        </div>
      </div>
      <div className={classes[`postcard-container`]}>{<ul>{postCardItemList(postList)}</ul>}</div>
    </div>
  );
};

export default UserPage;

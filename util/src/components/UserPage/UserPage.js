import { useEffect, useState } from "react";
import classes from "./UserPage.module.css";
import { getUserPosts } from "../../api/Post/getUserPosts";
import PostCardItem from "../UI/PostCard/PostCardItem";

// id={post.postId}
// key={post.postId}
// thumbnail={post.thumbnail}
// title={post.title}
// contents={post.contents}
// likeStatusSize={post.likeStatusSize}
// likeStatus={post.likeStatus}
// bookmarkStatus={post.bookmarkStatus}
// profileImg={post.writerInfo.profileImg}
// nickname={post.writerInfo.nickname}
// createdDate={post.createdDate}

const postCardItemList = (postList) => {
  return postList?.map((post) => {
    return (
      <PostCardItem
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
        createdDate={post.date}
      />
    );
  });
};

const UserPage = (props) => {
  const [postList, setPostList] = useState(null);

  useEffect(() => {
    getUserPosts(props.id).then((res) => {
      setPostList(() => res);
    });
  }, []);

  return (
    <div className={classes[`postcard-container`]}>{<ul>{postCardItemList(postList)}</ul>}</div>
  );
};

export default UserPage;

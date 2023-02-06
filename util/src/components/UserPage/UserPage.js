import { useEffect, useState } from "react";
import classes from "./UserPage.module.css";
import PostCardItem from "../UI/PostCard/PostCardItem";
import TagDataList from "../UI/Tag/TagDataList";
import { Avatar, Pagination } from "@mui/material";
import Button from "../UI/Button/Button";
import PostCardContainerLoading from "../UI/Loading/PostCardContainerLoading";
import { getUserPosts } from "../../api/Post/getUserPosts";
import { getUserData } from "../../api/Post/getUserData";
import { getIsFollowing } from "../../api/Post/getIsFollowing";
import { getUserFollower } from "../../api/Post/getUserFollower";
import { getUserFollowing } from "../../api/Post/getUserFollowing";
import { deleteFollow } from "../../api/Post/deleteUnfollow";
import { postFollow } from "../../api/Post/postFollow";
import { getUserTag } from "../../api/Post/getUserTag";
import { getMyData } from "../../api/UserProfile/getMyData";

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
  const [userData, setUserData] = useState([]);
  const [myData, setMyData] = useState([]);
  const [isFollowing, setIsFollowing] = useState(null);
  const [followerList, setFollowerList] = useState(null);
  const [followerListCnt, setFollowerListCnt] = useState(null);
  const [followingList, setFollowingList] = useState(null);
  const [followingListCnt, setFollowingListCnt] = useState(null);
  const [userTagList, setUserTagList] = useState([]);

  const criteria = ["date", "view", "like"];
  const [criteriaIdx, setCriteriaIdx] = useState(0);
  const [offset, setOffset] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const size = 10;
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserPostData = (criteriaIdx, page, size) => {
    console.log("fetch!");
    setIsLoading(true);
    getUserPosts(props.id, criteria[criteriaIdx], page, size).then((res) => {
      setPostList(() => res.content);
      setOffset(() => page);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    });
  };

  // 초기 데이터
  useEffect(() => {
    // Post API
    setIsLoading(true);
    getUserPosts(props.id, criteria[criteriaIdx], offset, size).then((res) => {
      setPostList(() => res.content);
      setTotalPage(() => res.totalPages);
      setIsLoading(false);
    });

    // My Data API
    getMyData().then((res) => {
      setMyData(() => res);
    });

    // User Data API
    getUserData(props.id).then((res) => {
      setUserData(() => res);
    });

    // Tag Data API
    getUserTag(props.id).then((res) => {
      setUserTagList(() => res);
    });
  }, []);

  // Follow Data API
  useEffect(() => {
    getIsFollowing(props.id).then((res) => {
      setIsFollowing(() => res);
    });
    getUserFollower(props.id).then((res) => {
      setFollowerList(() => res);
      setFollowerListCnt(() => res.length);
    });
    getUserFollowing(props.id).then((res) => {
      setFollowingList(() => res);
      setFollowingListCnt(() => res.length);
    });
  }, [isFollowing]);

  const tagOnClickHandler = (event) => {
    console.log(event.currentTarget.id);
  };

  const followBtnHandler = () => {
    // 현재 팔로우 중이면 언팔
    if (isFollowing) {
      deleteFollow(props.id).then((res) => {
        if (res === 200) {
          setIsFollowing((prevState) => !prevState);
        }
      });
    } else {
      postFollow(props.id).then((res) => {
        if (res === 200) {
          setIsFollowing((prevState) => !prevState);
        }
      });
    }
  };

  // isFollowing State에 맞게 팔로우 버튼 다르게 렌더링
  const followBtn = (isFollowing) => {
    if (isFollowing) {
      return (
        <Button className={classes[`follow-btn-true`]} onClick={followBtnHandler}>
          팔로잉
        </Button>
      );
    } else {
      return (
        <Button className={classes[`follow-btn-false`]} onClick={followBtnHandler}>
          팔로우
        </Button>
      );
    }
  };

  // 작성 글이 없다면 대체 화면 출력
  const postCardContainer = (postList) => {
    if (isLoading) {
      return <PostCardContainerLoading count={size} />;
    }
    if (!isLoading && postList && postList.length === 0) {
      return <div className={classes[`no-post`]}>포스트가 없습니다</div>;
    } else {
      return <ul>{postCardItemList(postList)}</ul>;
    }
  };

  const pageChangeHandler = (event, page) => {
    fetchUserPostData(criteriaIdx, page, size);
  };

  return (
    <div className={classes[`user-page`]}>
      <div className={classes[`user-page-upper`]}>
        <div className={classes[`avatar-username`]}>
          <Avatar
            src={userData.imageUrl}
            sx={{
              width: 128,
              height: 128,
              border: "1px solid lightgray",
              objectFit: "scale-down",
            }}
          />
          <div className={classes.nickname}>{userData.nickname}</div>
        </div>
        <div className={classes[`follow-userdata`]}>
          <div className={classes.follow}>
            <div className={classes.follower}>
              <div className={classes[`follow-text`]}>팔로워</div>
              <div className={classes[`follow-number`]}>{followerListCnt}명</div>
            </div>
            <div className={classes.follower}>
              <div className={classes[`follow-text`]}>팔로우</div>
              <div className={classes[`follow-number`]}>{followingListCnt}명</div>
            </div>
            {myData.userId !== props.id && followBtn(isFollowing)}
          </div>
          <div className={classes[`userdata`]}>
            <div className={classes[`username-department`]}>
              <div className={classes.username}>{userData.userName}</div>
              <div className={classes[`department-text`]}>소속</div>
              <div className={classes[`department-data`]}>{userData.department}</div>
            </div>
            <div className={classes[`username-department`]}>
              <div className={classes[`department-text`]}>email</div>
              <div className={classes[`department-data`]}>{userData.email}</div>
            </div>
            <div className={classes.tags}>
              <TagDataList tagList={userTagList} onClick={tagOnClickHandler} />
            </div>
          </div>
        </div>
      </div>
      <div className={classes[`postcard-container`]}>{postCardContainer(postList)}</div>
      <div className={classes[`pagination`]}>
        <Pagination count={totalPage} onChange={pageChangeHandler} />
      </div>
    </div>
  );
};

export default UserPage;

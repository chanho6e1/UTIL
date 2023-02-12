import classes from "./FollowCard.module.css";
import { Avatar } from "@mui/material";
import Card from "../Card/Card";
import Button from "../Button/Button";
import { useState, useEffect } from "react";
import { getIsFollowing } from "../../../api/Post/getIsFollowing";
import { postFollow } from "../../../api/Post/postFollow";
import { deleteFollow } from "../../../api/Post/deleteUnfollow";
import { useSelector } from "react-redux";

const FollowCard = (props) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const myData = useSelector((state) => state.userAuthSlice.userAuth.currentUser);

  useEffect(() => {
    getIsFollowing(props.userData.userId).then((res) => {
      setIsFollowing(() => res);
    });
  }, []);

  const profileOnClickHandler = () => {
    // 클릭 시 유저 페이지로 이동
    console.log("profile", props.userData.userId);
  };

  const followBtnHandler = () => {
    // 현재 팔로우 중이면 언팔
    if (isFollowing) {
      deleteFollow(props.userData.userId).then((res) => {
        if (res === 200) {
          setIsFollowing((prevState) => !prevState);
        }
      });
    } else {
      postFollow(props.userData.userId).then((res) => {
        if (res === 200) {
          setIsFollowing((prevState) => !prevState);
        }
      });
    }
  };

  const followBtn = (isFollowing) => {
    if (myData.userId === props.userData.userId) {
      return
    }
    if (isFollowing) {
      return (
        <Button
          className={`${classes[`follow-btn-true`]} ${classes[`button`]}`}
          onClick={followBtnHandler}
        >
          팔로잉 취소
        </Button>
      );
    } else {
      return (
        <Button
          className={`${classes[`follow-btn-false`]} ${classes[`button`]}`}
          onClick={followBtnHandler}
        >
          팔로우
        </Button>
      );
    }
  };

  return (
    <Card className={classes.card}>
      <div className={classes[`followcard-content`]}>
        <div className={classes[`left-content`]}>
          <div className={classes[`avatar-wrapper`]}>
            <Avatar
              src={props.userData.imageUrl}
              sx={{
                width: "10vw",
                height: "10vw",
                maxWidth: "80px",
                maxHeight: "80px",
                border: "1px solid lightgray",
                objectFit: "scale-down",
              }}
              onClick={profileOnClickHandler}
            />
          </div>
          <div className={classes[`nickname-username`]}>
            <div className={classes.nickname} onClick={profileOnClickHandler}>
              {props.userData.nickName}
            </div>
            <div className={classes.username} onClick={profileOnClickHandler}>
              {props.userData.userName}
            </div>
          </div>
        </div>
        <div className={classes[`btn-wrapper`]}>{followBtn(isFollowing)}</div>
      </div>
    </Card>
  );
};

export default FollowCard;

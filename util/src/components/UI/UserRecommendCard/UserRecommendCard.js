import { useState } from "react";
import classes from "./UserRecommendCard.module.css";
import Card from "../Card/Card";
import Button from "../../UI/Button/Button";
import TagDataList from "../../UI/Tag/TagDataList";
import { Avatar } from "@mui/material";
import { deleteFollow } from "../../../api/Post/deleteUnfollow";
import { postFollow } from "../../../api/Post/postFollow";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getIsFollowing } from "../../../api/Post/getIsFollowing";

const UserRecommendCard = (props) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const navigate = useNavigate();

  // isFollowing State에 맞게 팔로우 버튼 다르게 렌더링
  const followBtn = (isFollowing) => {
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

  const tagOnClickHandler = (event) => {
    const tagName = event.currentTarget.getAttribute("value");
    navigate(`/search?tag=${tagName}`);
  };

  const profileOnClickHandler = (event) => {
    // 클릭 시 유저 페이지로 이동
    navigate(`/index/${props.userData.nickname}`, {
      state: props.userData.userId,
    });
  };

  useEffect(() => {
    getIsFollowing(props.userData.userId).then((res) => {
      setIsFollowing(() => res);
    });
  }, []);

  return (
    <Card className={classes.card}>
      <div className={classes[`card-inner-wrapper`]}>

        <div className={classes[`avatar-userdata`]}>
          <div className={classes.avatar}>

            <Avatar
              src={props.userData.imageUrl}
              sx={{
                width: "12vw",
                height: "12vw",
                maxWidth: "100px",
                maxHeight: "100px",
                border: "1px solid lightgray",
                marginRight: "12px",
                objectFit: "scale-down",
              }}
              onClick={profileOnClickHandler}
            />
          </div>
          <div className={classes[`user-wrapper`]}>
            <div className={classes[`nickname`]}>
              <div className={classes.nickname} onClick={profileOnClickHandler}>
                {props.userData.nickname}
              </div>
            </div>
            <div
              className={classes.description}
              onClick={profileOnClickHandler}
            >
              {props.userData.discription}
            </div>
            <div className={classes.pc}>
              <div className={classes.tags}>
                <TagDataList
                  tagList={props.userData.tags}
                  onClick={tagOnClickHandler}
                />
              </div>
            </div>
            
          </div>

          

        </div>
        <div className={classes.mobile}>
            <div className={classes.tags}>
              <TagDataList
                tagList={props.userData.tags}
                onClick={tagOnClickHandler}
              />
            </div>
          </div>
        <div className={classes[`btn-wrapper`]}>{followBtn(isFollowing)}</div>
        
      </div>
    </Card>
  );
};

export default UserRecommendCard;

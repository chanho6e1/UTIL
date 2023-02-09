import { useEffect, useState, useRef } from "react";
import { IconButton, createTheme, ThemeProvider, Avatar } from "@mui/material";
import classes from "./FeedCardItem.module.css";
import bookmarkIconFlat from "../../../img/BookmarkIconFlat.svg";
import bookmarkIconFill from "../../../img/BookmarkIconFill.svg";
import likeIconFlat from "../../../img/LikeIconFlat.svg";
import likeIconFill from "../../../img/LikeIconFill.svg";
import PhotoCameraIcon from "../../../img/photoCameraIcon_gray.png";
import { putLikeToggle } from "../../../api/Post/putLikeToggle";
import { putBookmarkToggle } from "../../../api/Post/putBookmarkToggle";
import Card from "../Card/Card";
import { HashRouter, BrowserRouter, Routes, Route, Link, NavLink, Navigate, useNavigate, useLocation } from "react-router-dom";
import AnimatedModal from "../AnimatedModal/Modal";
import DetailItem from "../../Detail/DetailItem";

const avatarTheme = createTheme({
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: { marginRight: 4 },
      },
    },
  },
});

const FeedCardItem = (props) => {
  const navigate = useNavigate();
  const [isBookmark, setIsBookmark] = useState(props.bookmarkStatus);
  const [isLike, setIsLike] = useState(props.likeStatus);
  const [likeStatusSize, setLikeStatusSize] = useState(props.likeStatusSize);

  const displayLikeStatusSize = (likeStatusSize) => {
    if (likeStatusSize > 1000) {
      return (likeStatusSize / 1000).toFixed(2) + "k";
    } else {
      return likeStatusSize;
    }
  };

  const imgErrorHandler = (event) => {
    event.target.src = PhotoCameraIcon;
  };

  const bookmarkClickHandler = () => {
    putBookmarkToggle(props.id).then((res) => {
      if (res === 200) {
        setIsBookmark((prevState) => !prevState);
      }
    });
  };

  const likeClickHandler = () => {
    putLikeToggle(props.id).then((res) => {
      if (res === 200) {
        if (isLike) {
          setLikeStatusSize((prevState) => prevState - 1);
        } else {
          setLikeStatusSize((prevState) => prevState + 1);
        }
        setIsLike((prevState) => !prevState);
      }
    });
  };

  const nicknameClickHandler = () => {
    // 닉네임 클릭 시 유저 페이지로 이동
    console.log(props.id);
  };

  const postClickHandler = () => {
    navigate(`/m/modal/post/${props.id}`)
    setShowModal(true)
  };


  const ShowModalHandler = (boolean) => {
    navigate(`/m/modal/post/${props.id}`);
    setShowModal(boolean)
  }

  const cardRef = useRef()
  const [showModal, setShowModal] = useState(false)
  const modal = <AnimatedModal rootId={'inner-overlay-root'} fadeOut={true} component={<DetailItem id={props.id} />} id={props.id} name={props.title} parentId={`modal-parent-${props.title}-${props.id}`} parentRef={cardRef} toggleFunction={ShowModalHandler} toggleBoolean={showModal} url={`m/modal/post/${props.id}`} prevUrl={'/index'} />

  return (

      <Card className={classes.card}>
        {modal}
        <div ref={cardRef} className={classes.feedcarditem}> 
          <div className={classes[`feedcard-image`]} onClick={postClickHandler}>
            <img src={props.thumbnail} onError={imgErrorHandler} />
          </div>
          <div className={classes[`feedcard-text-contents`]}>
            <div className={classes[`text-contents`]} onClick={postClickHandler}>
              <div className={classes.title}>{props.title}</div>
              <div className={classes.contents}>{props.contents}</div>
            </div>
            <div className={classes[`icons-div`]}>
              <IconButton
                onClick={bookmarkClickHandler}
                style={{
                  paddingTop: 0,
                  paddingRight: 0,
                  paddingBottom: 0,
                  paddingLeft: 0,
                  marginRight: 10,
                }}
              >
                <img src={isBookmark ? bookmarkIconFill : bookmarkIconFlat} />
              </IconButton>
              <div className={classes.like}>
                <IconButton
                  onClick={likeClickHandler}
                  style={{
                    paddingTop: 0,
                    paddingRight: 0,
                    paddingBottom: 0,
                    paddingLeft: 0,
                  }}
                >
                  <img src={isLike ? likeIconFill : likeIconFlat} />
                </IconButton>
                <div className={classes[`like-count`]}>{displayLikeStatusSize(likeStatusSize)}</div>
              </div>
            </div>
          </div>
          <div className={classes["feedcard-lower-contents"]}>
            <div className={classes[`profile-img-nickname`]} onClick={nicknameClickHandler}>
              <ThemeProvider theme={avatarTheme}>
                <Avatar
                  src={props.profileImg}
                  sx={{
                    width: 24,
                    height: 24,
                    border: "1px solid lightgray",
                    objectFit: "scale-down",
                  }}
                />
              </ThemeProvider>
              <div className={classes.nickname}>{props.nickname}</div>
            </div>
            <div className={classes.date}>{props.createdDate}</div>
          </div>
        </div>
      </Card>

  );
};

export default FeedCardItem;

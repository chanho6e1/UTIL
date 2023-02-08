import { useState, useEffect, useRef } from "react";
import classes from "./PostCardItem.module.css";
import TagDataList from "../Tag/TagDataList";
import { IconButton, createTheme, ThemeProvider, Avatar } from "@mui/material";
import bookmarkIconFlat from "../../../img/BookmarkIconFlat.svg";
import bookmarkIconFill from "../../../img/BookmarkIconFill.svg";
import likeIconFlat from "../../../img/LikeIconFlat.svg";
import likeIconFill from "../../../img/LikeIconFill.svg";
import PhotoCameraIcon from "../../../img/photoCameraIcon_gray.png";
import { getPostTag } from "../../../api/Post/getPostTag";
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

const PostCardItem = (props) => {
  const [tagList, setTagList] = useState(null);
  const [isBookmark, setIsBookmark] = useState(props.bookmarkStatus);
  const [isLike, setIsLike] = useState(props.likeStatus);
  const navigate = useNavigate();

  useEffect(() => {
    getPostTag(props.id).then((res) => {
      setTagList(() => res);
    });
  }, []);

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
    // 지금 유저 아이디가 아니라 포스트 아이디를 넣어줘야 함
    putLikeToggle(props.id).then((res) => {
      if (res === 200) {
        setIsLike((prevState) => !prevState);
      }
    });
  };

  const tagOnClickHandler = (event) => {
    // 태그 클릭시 검색 페이지로 이동
    console.log(event.currentTarget.id);
  };

  const postClickHandler = () => {
    // props.id로 해당 글로 이동
    // navigate(`/post/${props.id}`)
    // console.log("clicked", props.id);

    navigate(`/post/${props.id}`);
    setShowModal(true)
  };

  const ShowModalHandler = (boolean) => {
    navigate(`/post/${props.id}`);
    setShowModal(boolean)
  }

  const cardRef = useRef()
  const [showModal, setShowModal] = useState(false)
  const modal = <AnimatedModal fadeOut={true} component={<DetailItem id={props.id} />} id={props.id} name={props.title} parentId={`modal-parent-${props.title}-${props.id}`} parentRef={cardRef} toggleFunction={ShowModalHandler} toggleBoolean={showModal} url={`post/${props.id}`} prevUrl={'/index'} />
  return (

      <Card className={classes.card}>
        {modal}
        <div className={classes.postcarditem} style={{width:'100%', height:'100%'}} ref={cardRef}>
          <div className={classes[`card-text`]}>
            <div className={classes.title} onClick={postClickHandler}>
              {props.title}
            </div>
            <div className={classes.contents} onClick={postClickHandler}>
              {props.content}
            </div>
            <div className={classes.tags}>
              <TagDataList tagList={tagList} onClick={tagOnClickHandler} />
            </div>
            <div className={classes[`icon-user`]}>
              <div className={classes.iconbutton}>
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
                <div className={classes.likecount}>{props.likeCount}</div>
              </div>
              <div className={classes.user}>
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
                <div className={classes.date}>{props.createdDate}</div>
              </div>
            </div>
          </div>
          <div className={classes[`card-image`]} onClick={postClickHandler}>
            <img src={props.thumbnail} onError={imgErrorHandler} />
          </div>
        </div>
      </Card>

  );
};

export default PostCardItem;

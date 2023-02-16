import React, { useState, useEffect, useRef } from "react";
import classes from "./PostCardItem.module.css";
import { IconButton, createTheme, ThemeProvider, Avatar } from "@mui/material";
import bookmarkIconFlat from "../../../img/BookmarkIconFlat.svg";
import bookmarkIconFill from "../../../img/BookmarkIconFill.svg";
import likeIconFlat from "../../../img/LikeIconFlat.svg";
import likeIconFill from "../../../img/LikeIconFill.svg";
import PhotoCameraIcon from "../../../img/photoCameraIcon_gray.png";
import { putLikeToggle } from "../../../api/Post/putLikeToggle";
import { putBookmarkToggle } from "../../../api/Post/putBookmarkToggle";
import Card from "../Card/Card";
import { useNavigate } from "react-router-dom";

import { Viewer } from "@toast-ui/react-editor";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";
import prism from "prismjs";
import "prismjs/themes/prism.css";

const avatarTheme = createTheme({
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: { marginRight: 4 },
      },
    },
  },
});

const displayLikeStatusSize = (likeStatusSize) => {
  if (likeStatusSize > 1000) {
    return (likeStatusSize / 1000).toFixed(2) + "k";
  } else {
    return likeStatusSize;
  }
};

const PostCardItem = (props) => {
  // const [tagList, setTagList] = useState(null);
  const [isBookmark, setIsBookmark] = useState(props.bookmarkStatus);
  const [isLike, setIsLike] = useState(props.likeStatus);
  const [likeStatusSize, setLikeStatusSize] = useState(props.likeStatusSize);
  const navigate = useNavigate();
  const viewerRef = useRef();

  const [plainContent, setPlainContent] = useState(null);

  useEffect(() => {
    if (viewerRef?.current?.innerText) {
      setPlainContent(viewerRef?.current?.innerText);
    }
  }, [viewerRef?.current?.innerText]);

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
        if (isLike) {
          setLikeStatusSize((prevState) => prevState - 1);
        } else {
          setLikeStatusSize((prevState) => prevState + 1);
        }
        setIsLike((prevState) => !prevState);
      }
    });
  };

  const tagOnClickHandler = (event) => {
    // 태그 클릭시 검색 페이지로 이동
    const tagName = event.currentTarget.getAttribute("value");
    navigate(`/search?tag=${tagName}`);
  };

  const postClickHandler = () => {
    // props.id로 해당 글로 이동
    // navigate(`/post/${props.id}`)
    navigate(`/index/${props.nickname}/post/${props.id}`);
  };

  // const temp = (
  //   <React.Fragment>
  //     <div className={classes.iconbutton}>
  //       <IconButton
  //         onClick={bookmarkClickHandler}
  //         style={{
  //           paddingTop: 0,
  //           paddingRight: 0,
  //           paddingBottom: 0,
  //           paddingLeft: 0,
  //           marginRight: 10,
  //         }}
  //       >
  //         <img src={isBookmark ? bookmarkIconFill : bookmarkIconFlat} />
  //       </IconButton>
  //       <IconButton
  //         onClick={likeClickHandler}
  //         style={{
  //           paddingTop: 0,
  //           paddingRight: 0,
  //           paddingBottom: 0,
  //           paddingLeft: 0,
  //         }}
  //       >
  //         <img src={isLike ? likeIconFill : likeIconFlat} />
  //       </IconButton>
  //       <div className={classes.likecount}>
  //         gggtrd
  //         {displayLikeStatusSize(props.likeStatusSize)}
  //       </div>
  //     </div>
  //   </React.Fragment>
  // );

  const buttons = (
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
      <div className={classes.likecount}>{displayLikeStatusSize(likeStatusSize)}</div>
    </div>
  );

  const userInfo = (
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
      <div className={classes.nickname}>{props.nickname} ·</div>
      <div className={classes.date}>{props.createdDate}</div>
    </div>
  );

  return (
    <Card className={classes.card}>
      <div
        className={classes["left-wrapper"]}
      >
        <div className={classes["left-top"]} onClick={postClickHandler}>
          <div className={classes.title}>{props.title}</div>
          <div className={classes.contents}>{plainContent}</div>
          {/* <div className={classes.contents}>{props.content}</div> */}
          <div ref={viewerRef} style={{ display: "none" }}>
            <Viewer
              initialValue={props.content}
              plugins={[[codeSyntaxHighlight, { highlighter: prism }]]}
            />
          </div>
        </div>

        <div className={classes["left-bottom"]}>
          <div className={classes["function-wrapper"]}>
            {buttons}
            {/* <Swipe onSwipeStart={(event) => {event.stopPropagation()}}>
              <div className={classes.tags}>
                <TagDataList tagList={props.tagList} onClick={tagOnClickHandler} />
              </div>
            </Swipe> */}
          </div>

          {userInfo}
        </div>
      </div>

      <div className={classes["right-wrapper"]}>
        <div
          className={classes[`card-image-wrapper`]}
          onClick={postClickHandler}
        >
          <img src={props.thumbnail} onError={imgErrorHandler} />
        </div>
      </div>
    </Card>
  );
};

export default PostCardItem;

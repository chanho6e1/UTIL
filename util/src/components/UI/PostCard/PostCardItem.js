import { useState } from "react";
import classes from "./PostCardItem.module.css";
import PostCardTagDataList from "./PostCardTagDataList";
import { IconButton, createTheme, ThemeProvider, Avatar } from "@mui/material";
import bookmarkIconFlat from "../../../img/BookmarkIconFlat.svg";
import bookmarkIconFill from "../../../img/BookmarkIconFill.svg";
import likeIconFlat from "../../../img/LikeIconFlat.svg";
import likeIconFill from "../../../img/LikeIconFill.svg";
import PhotoCameraIcon from "../../../img/photoCameraIcon.png";
import { useEffect } from "react";
import { getUserPosts } from "../../../api/Post/getUserPosts";

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
  const [isBookmark, setIsBookmark] = useState(false);
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    getUserPosts().then((res) => {
      setTagList(() => res);
    });
  }, []);

  const thumbnail = () => {
    if (props.thumbnail === "") {
      return (
        <div className={classes[`card-image`]} style={{ backgroundColor: "#c9c9c9" }}>
          <img src={PhotoCameraIcon} />
        </div>
      );
    } else {
      return (
        <div className={classes[`card-image`]} style={{ backgroundColor: "#fff" }}>
          <img src={props.thumbnail} />
        </div>
      );
    }
  };

  const bookmarkClickHandler = () => {
    setIsBookmark((prevState) => !prevState);
  };

  const likeClickHandler = () => {
    setIsLike((prevState) => !prevState);
  };

  const tagOnClickHandler = (event) => {
    console.log(event.currentTarget.innerText);
  };

  return (
    <li>
      <div className={classes.postcarditem}>
        <div className={classes[`card-text`]}>
          <div className={classes.title}>{props.title}</div>
          <div className={classes.contents}>{props.contents}</div>
          <div className={classes.tags}>
            <PostCardTagDataList tagList={tagList} onClick={tagOnClickHandler} />
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
                  src={props.userpicture}
                  sx={{
                    width: 24,
                    height: 24,
                    border: "1px solid lightgray",
                    objectFit: "scale-down",
                  }}
                />
              </ThemeProvider>
              <div className={classes.username}>{props.username}</div>
              <div className={classes.date}>{props.date}</div>
            </div>
          </div>
        </div>
        {thumbnail()}
      </div>
    </li>
  );
};

export default PostCardItem;

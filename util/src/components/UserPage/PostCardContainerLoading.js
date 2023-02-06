import React, { useRef, useEffect } from "react";
import classes from "./PostCardContainerLoading.module.css";

const PostCardLoadingItem = () => {
  return (
    <li>
      <div className={classes.item}>
        <div className={classes[`text-area`]}> </div>
        <div className={classes[`thumbnail-area`]}> </div>
      </div>
    </li>
  );
};

const PostCardLoadingList = (count) => {
  const loadingList = [];

  for (let i = 0; i < count; i++) {
    loadingList.push(PostCardLoadingItem());
  }

  return loadingList;
};

const PostCardContainerLoading = (props) => {
  const aniWrapperRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      aniWrapperRef.current.style.opacity = "255";
    }, 100);
  }, []);

  return (
    <div className={classes["ani-wrapper"]} ref={aniWrapperRef}>
      <ul>{PostCardLoadingList(props.count)}</ul>
    </div>
  );
};

export default PostCardContainerLoading;

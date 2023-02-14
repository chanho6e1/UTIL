import classes from "../Goal/GoalDetail.module.css";
import React, {useState, useEffect, useRef, useCallback} from "react";
import Button from "../UI/Button/Button"
import GoalDetailLReview from "./GoalDetailLReview";
import GoalDetailRTil from "./GoalDetailRTil";
import FeedCardItem from "../UI/FeedCard/FeedCardItem";
import PlanCardItem from "../Plan/PlanCard/PlanCardItem"
import { Fragment } from "react";
import { Avatar, Pagination } from "@mui/material";
import Tab from "../UI/Tab/Tab";


const GoalDetailMobile = (props) => {
  const [reviewView, goreviewView] = useState(true)
  const [todosView, gotodosView] = useState(false)
  const [postView, gopostView] = useState(false)
  const [tilsArr, settilsArr] = useState([])
  const [category, setCategory] = useState("회고록");
  
  const tabItems = [
    {content: '회고록', function: () => {
      setCategory("회고록");
    }},
    {content: '포스트', function: () => {
      setCategory("포스트");
    }},
    {content: 'Check List', function: () => {
      setCategory("Check List");
    }},
  ]

  const categoryView1 = 
    category === "Check List" ? (
      <PlanCardItem plan={props.plan} />
    ) : (
      <Fragment>
        <div ref={props.postWrapperRef} className={classes["goal-detail-mobile-feedcard"]}>
          {props.postList?.map((til) => (
            <FeedCardItem
                id={til.postId}
                key={til.postId}
                thumbnail={til.thumbnail}
                title={til.title}
                contents={til.content}
                likeStatusSize={til.likeStatusSize}
                likeStatus={til.likeStatus}
                bookmarkStatus={til.bookmarkStatus}
                profileImg={til.writerInfo.profileImg}
                nickname={til.writerInfo.nickname}
                createdDate={til.createdDate}
            />
          ))}
        </div>
      </Fragment>
    );
  
  const categoryView2 = 
    category === "회고록" ? (
      <GoalDetailLReview reviews={props.reviews[props.plan?.goalId]}/>
    ) : (
      categoryView1
    );
   

  useEffect(() => {
    if (props.tils) {
      settilsArr(Object.values(props.tils))
    }
  }, [props.tils])

  const reviewViewHandler = () => {
    gotodosView(false)
    gopostView(false)
    goreviewView(true)
  }

  const todosViewHandler = () => {
    gopostView(false)
    goreviewView(false)
    gotodosView(true)
  }

  const postViewHandler = () => {
    goreviewView(false)
    gotodosView(false)
    gopostView(true)
  }

  const bigView = (
    <div className={classes["goal-detail-mobile"]} >
      <div>
        <div className={classes["goal-detail-title"]}>{props.plan?.title}</div>
        <div className={classes["goal-detail-title-date"]}>{props.plan?.startDate} ~ {props.plan?.endDate}</div>
      </div>
      <div className={classes["goal-detail-mobile-content"]}>
        <div className={classes["goal-detail-mobile-content-in"]}>
          <GoalDetailLReview reviews={props.reviews[props.plan?.goalId]}/>
          <div />
          <div className={classes["goal-detail-r-out"]}>
            <GoalDetailRTil tils={props.tils[props.plan?.goalId]?.content} prevPage={props.prevPage} nextPage={props.nextPage} tilPage={props.tilPage}/>
          </div>
          {/* {todosView && props.plan !== null && <PlanCardItem plan={props.plan} />} */}
        </div>
      </div>
    </div>
  )

  const smallView =(
    <div className={classes["goal-detail-mobile"]} >
      <div>
        <div className={classes["goal-detail-title"]}>{props.plan?.title}</div>
        <div className={classes["goal-detail-title-date"]}>{props.plan?.startDate} ~ {props.plan?.endDate}</div>
      </div>
      <div className={classes["goal-detail-mobile-content-box"]}>
        <div className={classes["goal-detail-mobile-content-tap"]}>
          <Tab tabItems={tabItems} width={'300px'} height={'48px'} />
        </div>
        <div className={classes["goal-detail-mobile-content"]}>
          {categoryView2}
        </div>
      </div>
    </div>
  )

  return (
    <Fragment>
      <div className={classes["goal-detail-mobile-big"]} >
        {bigView}
      </div>
      <div className={classes["goal-detail-mobile-small"]} >
        {smallView}
      </div>
    </Fragment>
  );
};

export default GoalDetailMobile
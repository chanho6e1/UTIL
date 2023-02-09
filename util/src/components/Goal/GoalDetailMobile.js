import classes from "../Goal/GoalDetail.module.css";
import React, {useState, useEffect, useRef, useCallback} from "react";
import Button from "../UI/Button/Button"
import GoalDetailLReview from "./GoalDetailLReview";
import GoalDetailRTil from "./GoalDetailRTil";
import FeedCardItem from "../UI/FeedCard/FeedCardItem";
import PlanCardItem from "../Plan/PlanCard/PlanCardItem"
import { Fragment } from "react";


const GoalDetailMobile = (props) => {
  const [reviewView, goreviewView] = useState(true)
  const [todosView, gotodosView] = useState(false)
  const [postView, gopostView] = useState(false)
  const [tilsArr, settilsArr] = useState([])
  
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
        <p>{props.plan?.startDate} ~ {props.plan?.endDate}</p>
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
        <p>{props.plan?.startDate} ~ {props.plan?.endDate}</p>
      </div>
      <div className={classes["goal-detail-mobile-button"]}>
        <Button className={classes["goal-detail-mobile-button-in"]} onClick={reviewViewHandler}>회고록</Button>
        <Button className={classes["goal-detail-mobile-button-in"]} onClick={postViewHandler}>포스트</Button>
        {/* <Button onClick={todosViewHandler}>세부 항목</Button> */}
      </div>
      <div className={classes["goal-detail-mobile-content"]}>
        {reviewView && <GoalDetailLReview reviews={props.reviews[props.plan?.goalId]}/>}
        {postView &&
          <div>
            <div className={classes["goal-detail-r-tils-page"]}>
              <span className={classes["goal-detail-r-tils-page-button"]} onClick={props.prevPage}>prev</span>
              <span className={classes["goal-detail-r-tils-page-num"]}>{props.tilPage}</span>
              <span className={classes["goal-detail-r-tils-page-button"]} onClick={props.nextPage}>next</span>
            </div>
            <div>
              {tilsArr[0].content.map((til) => (
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
          </div>
        }
        {/* {postView && <GoalDetailRTil tils={props.tils[props.plan?.goalId]?.content} prevPage={props.prevPage} nextPage={props.nextPage} tilPage={props.tilPage}/>} */}
        {/* {todosView && props.plan !== null && <PlanCardItem plan={props.plan} />} */}
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
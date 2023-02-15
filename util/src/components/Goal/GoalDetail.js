import classes from "../Goal/GoalDetail.module.css";
import GoalDetailL from "./GoalDetailL";
import GoalDetailR from "./GoalDetailR";
import React, { useState, useEffect, useRef } from "react";
import { modifyPostDetailSliceActions } from "../../redux/postDetailSlice";
import { detailTodosAPI } from "../../api/Goal/detailTodosAPI";
import { detailReviewsAPI } from "../../api/Goal/detailReviewsAPI";
import { detailTilAPI } from "../../api/Goal/detailTilAPI";
import { detailAllTodosAPI } from "../../api/Goal/detailAllTodosAPI";
import { detailGoalCompleteAPI } from "../../api/Goal/detailGoalCompleteAPI";
import GoalDetailMobile from "./GoalDetailMobile";
import NotiDeliverer from "../UI/StackNotification/NotiDeliverer";
import PlanState from "../UI/PlanList/PlanState";
import warning from "../../img/Warning.png";
import { useSelector, useDispatch } from "react-redux";
import {
  useParams,
} from "react-router-dom";


const GoalDetailShow = (props) => {
  const dispatch = useDispatch();
  const [tilPage, settilPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [postList, setPostList] = useState(null);
  const [offset, setOffset] = useState(1);
  const [fetchStart, setFetchStart] = useState(false);
  const containerRef = useRef();
  const [totalPage, setTotalPage] = useState(10);
  const postWrapperRef = useRef();
  const [todoComplete, setTodoComplete] = useState(false);
  const [complete, setComplete] = useState(props.state);
  const [doneNotiState, setDoneNotiState] = useState(false);
  const [notiContent, setNotiContent] = useState();

  const fetchUserPostData = (page) => {
    setIsLoading(true);
    detailTilAPI(props.idx, page).then((res) => {
      setPostList(() => res.content);
      setOffset(() => page);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
      containerRef.current.scrollTo({
        left: 0,
        top: postWrapperRef.current.offsetTop - 14,
        behavior: "smooth",
      });
    });
  };

  const fetchUserPostDataMobile = (page) => {
    setIsLoading(true);
    detailTilAPI(props.idx, page + 1).then((res) => {
      setPostList((prev) => [...prev, ...res.content]);
      setOffset(() => page + 1);
      setTimeout(() => {
        setIsLoading(false);
        setFetchStart(() => false);
      }, 500);
    });
  };

  useEffect(() => {
    if (fetchStart === true) {
      fetchUserPostDataMobile(offset);
    }
  }, [fetchStart]);

  const pageChangeHandler = (event, page) => {
    fetchUserPostData(page);
  };

  const handleScroll = () => {
    const scrollHeight = containerRef.current.scrollHeight;
    const scrollTop = containerRef.current.scrollTop;
    const clientHeight = containerRef.current.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight - 1 && isLoading === false) {
      if (offset < totalPage) {
        if (document.body.clientWidth < 1080) {
          setFetchStart(() => true);
        }
      }

      // 페이지 끝에 도달하면 추가 데이터를 받아온다
    }
  };

  useEffect(() => {
    // scroll event listener 등록
    if (containerRef.current !== null) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      // scroll event listener 해제
      if (containerRef.current !== null) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  });

  useEffect(() => {
    detailAllTodosAPI(props.idx).then((res) => {
      setTodoComplete(res);
    });
  }, []);

  useEffect(() => {
    detailTodosAPI(props.idx).then((res) => {
      const proccessing = {
        goalId: props.idx,
        data: res,
      };
      dispatch(
        modifyPostDetailSliceActions.getTodos(JSON.stringify(proccessing))
      );
    });
  }, []);

  useEffect(() => {
    detailReviewsAPI(props.idx).then((res) => {
      const proccessing = {
        goalId: props.idx,
        data: res,
      };
      dispatch(
        modifyPostDetailSliceActions.getReviews(JSON.stringify(proccessing))
      );
    });
  }, []);

  useEffect(() => {
    detailTilAPI(props.idx, tilPage).then((res) => {
      const proccessing = {
        goalId: props.idx,
        data: res,
      };
      dispatch(
        modifyPostDetailSliceActions.getTils(JSON.stringify(proccessing))
      );
    });
  }, [tilPage]);

  useEffect(() => {
    setIsLoading(true);

    detailTilAPI(props.idx, offset).then((res) => {
      setPostList(() => res.content);
      setTotalPage(() => res.totalPages);
      setIsLoading(false);
    });
  }, []);

  const reviews = useSelector((state) => state.postDetailSlice.reviews);
  const tils = useSelector((state) => state.postDetailSlice.tils);

  const prevPage = () => {
    if (tilPage > 1) {
      settilPage((prevState) => prevState - 1);
    }
  };

  const nextPage = () => {
    if (tilPage < tils[props.idx].totalPages)
      settilPage((prevState) => prevState + 1);
  };

  const errorMessage = (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <img
        style={{ width: "40px", height: "40px", marginRight: "12px" }}
        src={warning}
      />
      <div>
        <p style={{ lineHeight: "40%" }}>아직 완료되지 않은 TODO가 있습니다.</p>
      </div>
    </div>
  );

  const completeToggle = () => {
    detailAllTodosAPI(props.idx).then((res) => {
      if (res === true) {
        detailGoalCompleteAPI(props.idx).then((res) => {
          setComplete(res);
        });
      } else {
        setNotiContent(errorMessage);
        setDoneNotiState(true);
      }
    });
  };

  const completeButton = (
    <PlanState
      state={complete}
      startDate={props.plans[props.idx].startDate}
      endDate={props.plans[props.idx].endDate}
    />
  );

  return (
    <div ref={containerRef} className={classes["goal-detail"]}>
      {doneNotiState && (
        <NotiDeliverer
          content={notiContent}
          stateHandler={setDoneNotiState}
          duration={5000}
          width={400}
        />
      )}
      <div className={classes["goal-detail-pc"]}>
        <div />
        {props.plans && (
          <GoalDetailL
            plan={props.plans[props.idx]}
            reviews={reviews}
            completeToggle={completeToggle}
            completeButton={completeButton}
          />
        )}
        <div className={classes["goal-detail-line"]} />
        {props.plans && (
          <GoalDetailR
            plan={props.plans[props.idx]}
            tils={tils}
            nextPage={nextPage}
            prevPage={prevPage}
            tilPage={tilPage}
          />
        )}
        <div />
      </div>
      <div className={classes["goal-detail-mobile"]}>
        {props.plans && (
          <GoalDetailMobile
            plan={props.plans[props.idx]}
            reviews={reviews}
            tils={tils}
            nextPage={nextPage}
            prevPage={prevPage}
            tilPage={tilPage}
            totalPage={totalPage}
            pageChangeHandler={pageChangeHandler}
            postList={postList}
            postWrapperRef={postWrapperRef}
            completeToggle={completeToggle}
            completeButton={completeButton}
          />
        )}
      </div>
    </div>
  );
};

const GoalDetail = (props) => {
  const idx = useParams().id;
  const plans = useSelector((state) => state.planSlice.allPlans);

  return (
    <div>
      <GoalDetailShow idx={idx} plans={plans} state={plans[idx].state} />
    </div>
  );
};
export default GoalDetail;

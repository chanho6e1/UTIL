import classes from "../Goal/GoalDetail.module.css";
import GoalDetailL from "./GoalDetailL";
import GoalDetailR from "./GoalDetailR";
import React, {useState, useEffect, useRef, useCallback} from "react";
import { modifyPostDetailSliceActions } from '../../redux/postDetailSlice'
import { modifyPlanSliceActions } from '../../redux/planSlice'
import { detailPlansAPI } from "../../api/Goal/detailPlansAPI";
import { detailTodosAPI } from "../../api/Goal/detailTodosAPI";
import { detailReviewsAPI } from "../../api/Goal/detailReviewsAPI";
import { detailTilAPI } from "../../api/Goal/detailTilAPI";
import GoalDetailMobile from "./GoalDetailMobile";
import { Avatar, Pagination } from "@mui/material";


import { useSelector, useDispatch } from 'react-redux'
import { HashRouter, BrowserRouter, Routes, Route, Link, NavLink, Navigate, useNavigate, useMatch, useLocation, useParams } from "react-router-dom";
import { Fragment } from "react";



const GoalDetail = (props) => {
  const idx = useParams().id
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [tilPage, settilPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true);
  const [postList, setPostList] = useState(null);
  const [offset, setOffset] = useState(1);
  const [fetchStart, setFetchStart] = useState(false);
  const containerRef = useRef();
  const [totalPage, setTotalPage] = useState(10);
  const postWrapperRef = useRef();


  const fetchUserPostData = (criteriaIdx, page, size) => {
    setIsLoading(true);
    detailTilAPI(idx, page).then((res) => {
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
    detailTilAPI(idx, page + 1).then((res) => {
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
    detailPlansAPI(idx)
    .catch((err) => {
        navigate('/login');
    })
    .then((res) => {
        dispatch(modifyPlanSliceActions.getPlans(JSON.stringify(res)))
    })
  }, [])

  useEffect(() => {
    detailTodosAPI(idx)
    .then((res) => {
      const proccessing = {
        goalId: idx,
        data: res
    }
    dispatch(modifyPostDetailSliceActions.getTodos(JSON.stringify(proccessing)))
    })
  }, [])

  useEffect(() => {
    detailReviewsAPI(idx)
    .then((res) => {
      const proccessing = {
        goalId: idx,
        data: res
    }
    dispatch(modifyPostDetailSliceActions.getReviews(JSON.stringify(proccessing)))
    })
  }, [])

  useEffect(() => {
    detailTilAPI(idx, tilPage)
    .then((res) => {
      const proccessing = {
        goalId: idx,
        data: res
    }
    dispatch(modifyPostDetailSliceActions.getTils(JSON.stringify(proccessing)))
    })
  }, [tilPage])

  useEffect(() => {
    setIsLoading(true);

    detailTilAPI(idx, offset). then((res) => {
      setPostList(() => res.content);
      setTotalPage(() => res.totalPages);
      setIsLoading(false);
    })
  }, [])

  const plans = useSelector(state => state.planSlice.allPlans)
  const reviews = useSelector(state => state.postDetailSlice.reviews)
  const tils = useSelector(state => state.postDetailSlice.tils)

  const prevPage = () => {
    if (tilPage > 1) {
      settilPage((prevState) => prevState - 1)
    }
  }

  const nextPage = () => {
    if (tilPage < tils[idx].totalPages)
    settilPage((prevState) => prevState + 1)
  }

  
  return (
    <div ref={containerRef} className={classes["goal-detail"]}>
      <div className={classes["goal-detail-pc"]}>
        <div />
        {plans && <GoalDetailL plan={plans[idx]} reviews={reviews} />}
        <div className={classes["goal-detail-line"]}/>
        {plans && <GoalDetailR plan={plans[idx]} tils={tils} nextPage={nextPage} prevPage={prevPage} tilPage={tilPage}/>}
        <div />
      </div>
      <div className={classes["goal-detail-mobile"]}>
        {plans && <GoalDetailMobile plan={plans[idx]} reviews={reviews} tils={tils} nextPage={nextPage} prevPage={prevPage} tilPage={tilPage} totalPage={totalPage} pageChangeHandler={pageChangeHandler} postList={postList} postWrapperRef={postWrapperRef}/>}
      </div>
    </div>
  );
};

export default GoalDetail;

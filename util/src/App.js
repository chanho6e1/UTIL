import React, {useEffect, useState, useRef} from 'react';
import { HashRouter, BrowserRouter, Routes, Route, Link, NavLink, Navigate, useNavigate, useLocation } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import 'overlayscrollbars/overlayscrollbars.css';
import { getCurrentUser } from './util/APIUtils';
import Main from './components/Main/Main';
import { useSelector, useDispatch } from 'react-redux'
import { userAuthSliceActions } from './redux/userAuthSlice'
import OAuthRedirectHandler from './components/UserAuth/OAuth/OAuthRedirectHandler';
import SocialLoginModule from './components/UserAuth/SocialLoginModule';
import { ACCESS_TOKEN } from './constants';
import SocialLogin from './components/UserAuth/SocialLogin';
import StackNotification from './components/UI/StackNotification/StackNotification';
import GoalDetail from "./components/Goal/GoalDetail";
import DetailItem from './components/Detail/DetailItem';

import ToastEditor from './components/MarkdownEditor/ToastEditor';
// import OAuth2RedirectHandler from './components/UserAuth/OAuth/OAuth2RedirectHandler';

import { modifyPlanSliceActions } from './redux/planSlice';
import { recvIngPlanAPI } from './api/Plan/recvIngPlanAPI';





const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { pathname } = useLocation();
  const wrapRef = useRef(null);
  const plans = useSelector(state => state.planSlice.plans)

  const movePage = (url) =>{
    if(pathname !== `/${url}` && !pathname.includes('modal')) {
      
      wrapRef.current.classList.replace('loaded', 'unloaded');
      setTimeout(()=> { 
        // navigate(url);
        wrapRef.current.classList.replace('unloaded', 'loaded');
      } , 10)
    }
  }

  useEffect(() => {

    movePage(pathname)
  }, [pathname])

  useEffect(() => {
    loadCurrentlyLoggedInUser()
  })

  

  const loadCurrentlyLoggedInUser = () => {
    getCurrentUser()
    .then(response => {
      dispatch(userAuthSliceActions.changeAuthenticated('true'))
      dispatch(userAuthSliceActions.changeCurrentUser(JSON.stringify(response.data)))
      dispatch(userAuthSliceActions.changeLoading('false'))
    }).catch(error => {
      dispatch(userAuthSliceActions.changeLoading('false'))
    });    
  }


  useEffect(() => {
    recvIngPlanAPI()
      .catch((err) => {
          navigate('/login');
      })
      .then((res) => {
          dispatch(modifyPlanSliceActions.responsePlans(JSON.stringify(res)))
      })
  }, [])



  return (
    <div className="App" id="overlay-root">
      {/* <div id="overlay-root" style={{zIndex: '9999'}}></div> */}
      <StackNotification />
      <div ref={wrapRef} className="wrap loaded">

      <Routes>
      
        <Route path="/goal/:id" element={<GoalDetail />} /> 
        <Route path="/post/:id" element={<DetailItem />} /> 
        {/* <Route path="/post/:id" element={<DetailItem />} />  */}

        <Route path="/*" element={plans && <Main />} />
        <Route path="/login" element={<SocialLogin />} />
        <Route path="/oauth2/redirect" element={<OAuthRedirectHandler />} /> 
        <Route path="/create" >
          <Route path="review" element={<ToastEditor key={'review'} forReview={true}/>} />
          <Route path="post" element={<ToastEditor key={'post'} />} />
        </ Route>
      </Routes>
    
    </div>
  </div>

  );
}

export default App;

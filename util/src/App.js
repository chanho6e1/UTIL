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

import ToastEditor from './components/MarkdownEditor/ToastEditor';
// import OAuth2RedirectHandler from './components/UserAuth/OAuth/OAuth2RedirectHandler';





const App = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const wrapRef = useRef(null);

  const movePage = (url) =>{
    if(pathname !== `/${url}` ){
      
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

  const dispatch = useDispatch()

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

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    dispatch(userAuthSliceActions.changeAuthenticated('false'))
    dispatch(userAuthSliceActions.changeCurrentUser(null))
  }

  return (
    <div className="App" id="overlay-root">
      {/* <div id="overlay-root" style={{zIndex: '9999'}}></div> */}
      <StackNotification />
      <div ref={wrapRef} className="wrap loaded">

        <Routes>
          <Route path="/*" element={<Main />} />
          <Route path="/login" element={<SocialLogin />} />
          <Route path="/oauth2/redirect" element={<OAuthRedirectHandler />} /> 
          <Route path="/create" >
            <Route path="review" element={<ToastEditor forReview={true} />} />
            <Route path="post" element={<ToastEditor />} />
          </ Route>
        </Routes>
      </div>
    
    </div>
    

  );
}

export default App;

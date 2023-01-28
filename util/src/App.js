import React, {useEffect, useState} from 'react';
import { HashRouter, BrowserRouter, Routes, Route, Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import 'overlayscrollbars/overlayscrollbars.css';
import { getCurrentUser } from './util/APIUtils';
import Main from './components/Main/Main';
import { useSelector, useDispatch } from 'react-redux'
import { userAuthSliceActions } from './redux/userAuthSlice'
import OAuthRedirectHandler from './components/UserAuth/OAuth/OAuthRedirectHandler';
import SocialLoginModule from './components/UserAuth/SocialLoginModule';
// import OAuth2RedirectHandler from './components/UserAuth/OAuth/OAuth2RedirectHandler';

const App = () => {

  useEffect(() => {
    loadCurrentlyLoggedInUser()
  })

  const dispatch = useDispatch()

  const loadCurrentlyLoggedInUser = () => {
    getCurrentUser()
    .then(response => {
      dispatch(userAuthSliceActions.changeAuthenticated('true'))
      dispatch(userAuthSliceActions.changeCurrentUser(JSON.stringify(response)))
      dispatch(userAuthSliceActions.changeLoading('false'))
    }).catch(error => {
      dispatch(userAuthSliceActions.changeLoading('false'))
    });    
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/oauth2/redirect" element={<OAuthRedirectHandler />} /> 
      </Routes>
    </div>
    

  );
}

export default App;

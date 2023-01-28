import React, { useState } from "react";
import * as Icons from './Icons'
import { useSelector, useDispatch } from 'react-redux'
import styles from './MainUserInfo.module.css'
import { userAuthSliceActions } from '../../redux/userAuthSlice'
import { ACCESS_TOKEN } from '../../constants';
import { useNavigate, useLocation } from 'react-router-dom'



export const UserIcon = (props) => {
  const userAuth = useSelector(state => state.userAuthSlice.userAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    dispatch(userAuthSliceActions.changeAuthenticated('false'))
    dispatch(userAuthSliceActions.changeCurrentUser(null))
  }

  const navigateLogin = () => {
    navigate('/login');
  }

  const userImage = (
    <div onClick={handleLogout}>
      <div className={styles['user-image-wrapper']} >
        <img className={styles['user-image']} src={`${userAuth.authenticated ? userAuth.currentUser.imageUrl : null }`}/>
      </div> 
    </div>
      
  )

  const anonymous = (
    <div onClick={navigateLogin}>
      {Icons.user}
    </div>
  )

  


  return (
    <React.Fragment>
      {userAuth.authenticated ? userImage : anonymous}
    </React.Fragment> 
      

  )
}



export const CurrentUser = (props) => {
  const userAuth = useSelector(state => state.userAuthSlice.userAuth)

  const requiredLogin = (
    <React.Fragment>
      로그인
    </React.Fragment>
  )

  const userName = (
    <React.Fragment>
      {userAuth.authenticated ? userAuth.currentUser.userName : null}
      
    </React.Fragment>
  )

  return (
    <div>
      {userAuth.authenticated ? userName : requiredLogin}
    </div>
    // {userAuth.authenticated ? userName : requiredLogin}
  )
}
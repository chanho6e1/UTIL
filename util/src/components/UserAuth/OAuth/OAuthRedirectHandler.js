import React, {useEffect} from "react";
import { ACCESS_TOKEN } from '../../../constants';
import { Navigate, useLocation, useSearchParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userAuthSliceActions } from '../../../redux/userAuthSlice'

const OAuthRedirectHandler = (props) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams();

  const token = searchParams.get('token');
  const error = searchParams.get('error');
  const code = searchParams.get('code');

  if(token) {
    // 성공
    localStorage.setItem(ACCESS_TOKEN, token);
    dispatch(userAuthSliceActions.changeToken(token))

    if (code === '201') {
      // 회원가입 시
      return <Navigate to={{
        pathname: "/profile",
        state: { from: location }
      }}/>; 
    } else if (code === '200') {
      // 기존 유저 로그인 시
      return <Navigate to={{
        pathname: "/",
        state: { from: location }
      }}/>; 
    }

    
  } else {
    // 실패
      return <Navigate to={{
          pathname: "/login",
          state: { 
              from: location,
              error: error 
          }
      }}/>; 
  }
}

export default OAuthRedirectHandler
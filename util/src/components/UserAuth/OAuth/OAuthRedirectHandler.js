import React, {useEffect} from "react";
import { ACCESS_TOKEN } from '../../../constants';
import { Navigate, useLocation } from 'react-router-dom'

const OAuthRedirectHandler = (props) => {
  const location = useLocation()

  const getUrlParameter = (name) => {
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  const token = getUrlParameter('token');
  const error = getUrlParameter('error');

  if(token) {
    // 성공
    localStorage.setItem(ACCESS_TOKEN, token);
    return <Navigate to={{
        pathname: "/",
        state: { from: location }
    }}/>; 
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
import React from "react";
import styles from './SocialLoginModule.module.css'
import google from '../../img/social_google.png'
import kakaotalk from '../../img/social_kakaotalk.png'
import { GOOGLE_AUTH_URL, KAKAO_AUTH_URL, GITHUB_AUTH_URL } from '../../constants';


const SocialLoginModule = (props) => {

  return (

   
      <div className={styles['social-login-header']}>
        <a className={`${styles['social-login-wrapper']} ${styles['google-login']}`} href={GOOGLE_AUTH_URL}>
            <img className={styles['google-logo']} src={google} />
        </a>
        
        <a className={`${styles['social-login-wrapper']} ${styles['kakaotalk-login']}`} href={KAKAO_AUTH_URL}>
          <img className={styles['kakaotalk-logo']} src={kakaotalk} />
        </a>
      </div>

    
  )
  

}

export default SocialLoginModule
import React from "react";
import SocialLoginModule from "./SocialLoginModule";
import styles from './SocialLogin.module.css'

const SocialLogin = (props) => {

  return (

      <div className={styles['social-login']}>
        <SocialLoginModule />
      </div>
      

  )
  
}

export default SocialLogin
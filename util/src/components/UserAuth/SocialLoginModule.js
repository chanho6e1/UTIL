import React from "react";
import styles from "./SocialLoginModule.module.css";
import google from "../../img/social_google.png";
import kakaotalk from "../../img/social_kakaotalk.png";
import {
  GOOGLE_AUTH_URL,
  KAKAO_AUTH_URL,
  GITHUB_AUTH_URL,
} from "../../constants";

const SocialLoginModule = (props) => {
  return (
    <div className={styles["social-login-header"]}>
      <div className={styles["social-login-title"]}>Log in</div>
      <a className={styles["social-login-button"]} href={GOOGLE_AUTH_URL}>
        <div
          className={`${styles["social-login-wrapper"]} ${styles["google-login"]}`}
          
        >
          <img className={styles["google-logo"]} src={google} />
        </div>
        <div className={styles["login-label"]}>Continue with Google</div>
      </a>

      <a className={styles["social-login-button"]} href={KAKAO_AUTH_URL}>
        <div
          className={`${styles["social-login-wrapper"]} ${styles["kakaotalk-login"]}`}
          
        >
          <img className={styles["kakaotalk-logo"]} src={kakaotalk} />
        </div>
        <div className={styles["login-label"]}>Continue with Kakaotalk</div>
      </a>
    </div>
  );
};

export default SocialLoginModule;

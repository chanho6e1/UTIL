import React from "react";
import SocialLoginModule from "./SocialLoginModule";
import styles from "./SocialLogin.module.css";

const SocialLogin = (props) => {
  return (
    <div className={styles["social-login"]}>
      <div className={styles["background"]}>util</div>
      <div className={styles["content"]}>
        <div className={styles["box"]}>
          <div className={styles["signin-label"]}>Sign In</div>
          <div className={styles["welcome-label"]}>환영합니다!</div>
          <SocialLoginModule />
        </div>
      </div>
    </div>
  );
};

export default SocialLogin;

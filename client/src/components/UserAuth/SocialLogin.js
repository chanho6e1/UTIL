import React from "react";
import SocialLoginModule from "./SocialLoginModule";
import styles from "./SocialLogin.module.css";
import illust1 from "../../img/5172479.png";
import logo from "../../img/util-logo-black.png"
import android from "../../img/android_icon.png"

const SocialLogin = (props) => {
  return (
    <div className={styles["social-login"]}>

      

      <div className={styles["login-wrapper"]}>

        <div className={styles["header"]}>
          <div className={styles["logo-wrapper"]}>
                <img className={styles['logo-icon']} style={{ width: "auto", height: "80px", marginRight: '-15px' }} src={logo} />
                <div className={styles["logo-title"]}>til</div>
          </div>
        </div>

        <img className={styles['mobile-image']} style={{ width: "100vw", height: "auto", marginTop:'-20vw', maxWidth:'500px'}} src={illust1} />

        <div className={styles["body"]}>

          
          
          <div className={styles['ment-wrapper']}>
            <div className={styles['ment-1']}>
            <div className={styles["line"]} />
              <b>전문가</b>로 성장하는
            </div>
            <div className={styles['ment-2']}>
              가장 <b>정확한</b> 길
            </div>
            <div className={styles['sub-ment-1']}>“누군가가 원하는 것을 얘기 하기만 하면 되는 프로그래밍 언어를 원한다고 말하면 그에게 막대 사탕을 주도록 하라.”</div>
          </div>
        </div>
        
        <SocialLoginModule />
        
        <div style={{ color:'rgb(130,130,130)', fontSize:'14px', marginTop:'60px'}}><a style={{textDecoration: 'none', color:'rgb(130,130,130)', fontSize:'14px'}} href="https://www.freepik.com/free-vector/programming-concept-illustration_7118756.htm#query=programmer&position=19&from_view=keyword&track=sph">Image by storyset</a><br/>on Freepik</div>
        
        <div/>
      </div>
      <div>
        <img className={styles['pc-image']} style={{ width: "60vw", height: "auto", minWidth: "500px"}} src={illust1} />
      </div>
      
      
    </div>
  );
};

export default SocialLogin;

import { useEffect, useState } from "react";
import classes from "./UserProfileChange.module.css";
import UserProfileChangeCard from "../UI/UserProfileChangeCard/UserProfileChangeCard";
import { getMyData } from "../../api/UserProfile/getMyData";
import { getMyTags } from "../../api/UserProfile/getMyTags";
import defautUserProfilePic from "../../img/defaultUserProfilePic.svg";
import { postUserProfilePicUpload } from "../../api/UserProfile/postUserProfilePicUpload";

const UserProfileChange = (props) => {
  const [userData, setUserData] = useState("");
  const [userTagList, setUserTagList] = useState(null);

  useEffect(() => {
    getMyData().then((res) => setUserData(() => res));
    getMyTags().then((res) => {
      setUserTagList(() => res.map((t) => t.tagName));
    });
  }, []);

  const submitUserProfileHandler = (newUserData) => {
    console.log("submithandler", newUserData);
    // 프사 업로드 axios
    if (newUserData.uploadImage !== null) {
      const formData = new FormData();
      formData.append("files", newUserData.uploadImage);
      postUserProfilePicUpload(formData).then((res) => {
        console.log("res", res);
      });
    } else {
      console.log("same");
    }
  };

  return (
    <div>
      {userData && userTagList && (
        <UserProfileChangeCard
          imageUrl={userData.imageUrl || defautUserProfilePic}
          userName={userData.userName}
          nickname={userData.nickname}
          description={userData.description}
          department={userData.department}
          myTagList={userTagList}
          onConfirm={submitUserProfileHandler}
        />
      )}
    </div>
  );
};

export default UserProfileChange;

import { useEffect, useState } from "react";
import classes from "./UserProfileChange.module.css";
import UserProfileChangeCard from "../UI/UserProfileChangeCard/UserProfileChangeCard";
import { getMyData } from "../../api/UserProfile/getMyData";
import { getMyTags } from "../../api/UserProfile/getMyTags";
import { postUserProfilePicUpload } from "../../api/UserProfile/postUserProfilePicUpload";
import { putUserData } from "../../api/UserProfile/putUserData";
import { postUserTags } from "../../api/UserProfile/postUserTags";
import { putUserTags } from "../../api/UserProfile/putUserTags";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../util/APIUtils";
import { useSelector, useDispatch } from "react-redux";
import { userAuthSliceActions } from "../../redux/userAuthSlice";

const UserProfileChange = (props) => {
  const [userData, setUserData] = useState("");
  const [userTagList, setUserTagList] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getMyData().then((res) => setUserData(() => res));
    getMyTags().then((res) => {
      setUserTagList(() => res.map((t) => t.tagName));
    });
  }, []);

  const submitUserProfileHandler = (userData) => {
    const newTagList = [];
    for (const idx in userData.tagList) {
      const newItem = userData.tagList[idx].replace(/\s/g, "").toLowerCase();
      newTagList.push(newItem);
    }

    const updateUserData = (userData, newImageUrl, newTagList) => {
      const newUserData = {
        department: userData.department,
        discription: userData.description,
        imageUrl: newImageUrl,
        nickName: userData.nickname,
      };
      // 유저 데이터 변경
      putUserData(newUserData)
        .then((res) => {})
        .then(() => {
          // 태그 데이터 변경
          if (userData.isNewUser) {
            postUserTags(newTagList).then((res) => {
              // 성공 시 마이 유틸
              if (res.status === 200) {
                // window.location.reload();

                getCurrentUser()
                  .then((response) => {

                    dispatch(userAuthSliceActions.changeAuthenticated("true"));
                    dispatch(
                      userAuthSliceActions.changeCurrentUser(
                        JSON.stringify(response.data)
                      )
                    );
                    dispatch(userAuthSliceActions.changeLoading("false"));
                    navigate(`/index`);
                  })
                  .catch((error) => {
                    dispatch(userAuthSliceActions.changeLoading("false"));
                  });
              }
            });
          } else {
            putUserTags(newTagList).then((res) => {
              // 성공 시 마이 유틸
              if (res.status === 200) {
                navigate(`/index`);
              }
            });
          }
        });
    };

    // Profile Pic Upload
    if (userData.uploadImage !== null) {
      const formData = new FormData();
      formData.append("file", userData.uploadImage);
      postUserProfilePicUpload(formData).then((res) => {
        updateUserData(userData, res.data, newTagList);
      });
    } else {
      updateUserData(userData, userData.imageUrl, newTagList);
    }
  };

  return (
    <div className={classes[`profilecard-wrapper`]}>
      {userData && userTagList && (
        <UserProfileChangeCard
          imageUrl={userData.imageUrl}
          userName={userData.userName}
          nickname={userData.nickname}
          description={userData.discription}
          department={userData.department}
          myTagList={userTagList}
          onConfirm={submitUserProfileHandler}
        />
      )}
    </div>
  );
};

export default UserProfileChange;

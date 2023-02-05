import { useEffect, useState } from "react";
import classes from "./UserProfileChange.module.css";
import UserProfileChangeCard from "../UI/UserProfileChangeCard/UserProfileChangeCard";
import { getMyData } from "../../api/UserProfile/getMyData";
import { getMyTags } from "../../api/UserProfile/getMyTags";

const UserProfileChange = (props) => {
  const [userData, setUserData] = useState("");
  const [userTagList, setUserTagList] = useState(null);

  useEffect(() => {
    getMyData().then((res) => setUserData(() => res));
    getMyTags().then((res) => {
      setUserTagList(() => res.map((t) => t.tagName));
    });
  }, []);

  const submitUserProfileHandler = (userData) => {
    console.log("submithandler", userData);
    // 프사 업로드 axios
  };

  // {
  //   "status": 200,
  //   "message": "유저 정보 조회 성공",
  //   "data": {
  //     "userId": 4,
  //     "nickname": "kihunSONG",
  //     "email": "kihunbuzz@naver.com",
  //     "userName": "송기훈",
  //     "imageUrl": "http://k.kakaocdn.net/dn/buIL20/btrWzWtdtbm/ZDcQAE4bkLbBGFXOflr63k/img_110x110.jpg",
  //     "department": "string",
  //   }
  // }

  // {
  //   "status": 200,
  //   "message": "나의 관심 테그 조회 성공",
  //   "data": [
  //     {
  //       "tagId": 10,
  //       "tagName": "aa"
  //     },
  //     {
  //       "tagId": 11,
  //       "tagName": "bb"
  //     }
  //   ]
  // }

  return (
    <div>
      {userData && userTagList && (
        <UserProfileChangeCard
          imageUrl={userData.imageUrl}
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

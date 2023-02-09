import { useState } from "react";
import UserRecommendCard from "../UI/UserRecommendCard/UserRecommendCard";
import { getUserTag } from "../../api/Post/getUserTag";
import { useEffect } from "react";
import { getRecommendUser } from "../../api/UserProfile/getRecommendUser";

const userData = {
  userId: 4,
  nickname: "kihunSONG",
  email: "kihunbuzz@naver.com",
  userName: "송기훈",
  imageUrl:
    "https://utilbucket.s3.ap-northeast-2.amazonaws.com/static/user/9d13faae-9400-474b-a6da-c84641b04bfb_%EB%A1%9C%EA%B3%A0.jpg",
  department: "구미 SSAFY",
  discription:
    "테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트",
};

const UserRecommend = () => {
  const [userList, setUserList] = useState([]);
  const [userTagList, setUserTagList] = useState([]);

  useEffect(() => {
    getRecommendUser(1, 10).then((res) => {
      console.log("userlist res", res);
      setUserList(() => [...res]);
    });
    getUserTag(4).then((res) => {
      setUserTagList(() => res);
    });
  }, []);

  console.log("userlist", userList);

  return <UserRecommendCard userData={userData} userTagList={userTagList} />;
};

export default UserRecommend;

import { useEffect, useState } from "react";
import classes from "./UserProfileChange.module.css";
import UserProfileChangeCard from "../UI/UserProfileChangeCard/UserProfileChangeCard";

const UserProfileChange = (props) => {
  const submitUserProfileHandler = (userData) => {
    console.log("submithandler", userData);
    // 프사 업로드 axios
  };

  const DUMMY_USERDATA = {
    status: 200,
    message: "유저 조회 성공",
    data: {
      userId: 4,
      nickname: null,
      email: "kihunbuzz@naver.com",
      userName: "송기훈",
      imageUrl:
        "http://k.kakaocdn.net/dn/buIL20/btrWzWtdtbm/ZDcQAE4bkLbBGFXOflr63k/img_110x110.jpg",
      department: null,
      discription: null,
    },
  };

  const DUMMY_TAGDATA = {
    status: 200,
    message: "유저별 관심 테그 조회 성공",
    data: [
      {
        tagId: 10,
        tagName: "aa",
      },
      {
        tagId: 11,
        tagName: "bb",
      },
    ],
  };

  return (
    <div>
      <UserProfileChangeCard
        imageUrl={DUMMY_USERDATA.data.imageUrl}
        userName={DUMMY_USERDATA.data.userName}
        nickname={DUMMY_USERDATA.data.nickname}
        description={DUMMY_USERDATA.data.discription}
        department={DUMMY_USERDATA.data.department}
        tagList={DUMMY_TAGDATA.data}
        onConfirm={submitUserProfileHandler}
      />
    </div>
  );
};

export default UserProfileChange;

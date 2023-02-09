import { Fragment, useState } from "react";
import UserRecommendCard from "../UI/UserRecommendCard/UserRecommendCard";
import { getUserTag } from "../../api/Post/getUserTag";
import { useEffect } from "react";
import { getRecommendUser } from "../../api/UserProfile/getRecommendUser";

const UserRecommendCardList = (userList) => {
  const cardList = [];
  for (const user of userList) {
    getUserTag(user.userId).then((res) => {
      cardList.push(
        <div key={`user-recommend-card-${user.userId}`}>
          <UserRecommendCard userData={user} userTagList={res} />
        </div>
      );
    });
  }
  return cardList;
};

const UserRecommend = () => {
  const [userList, setUserList] = useState([]);
  const [userTagList, setUserTagList] = useState([]);
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    getRecommendUser(1, 10).then((res) => {
      setUserList(() => [res.content]);
      const test = UserRecommendCardList(res.content);
      setCardList(() => test);
    });
  }, []);

  return <Fragment>{cardList}</Fragment>;
};

export default UserRecommend;

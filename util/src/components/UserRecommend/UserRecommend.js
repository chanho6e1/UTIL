import { useState, useEffect, useRef } from "react";
import UserRecommendCard from "../UI/UserRecommendCard/UserRecommendCard";
import classes from "./UserRecommend.module.css";
import { getRecommendUser } from "../../api/UserProfile/getRecommendUser";
import Button from "../UI/Button/Button";
import Loading from "../UI/Loading/Loading";
import personAddIcon from "../../img/PersonAddIcon.svg";

const UserRecommend = (props) => {
  const [userList, setUserList] = useState([]);
  const [offset, setOffset] = useState(1);
  const size = 5;
  const recRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const UserRecommendCardList = (userList) => {
    return userList?.map((user) => {
      return <UserRecommendCard userData={user} key={`user-recommend-card-${user.userId}`} />;
    });
  };

  const fetchMoreData = () => {
    setIsLoading(true);
    getRecommendUser(offset + 1, size).then((res) => {
      if (res.content.length > 0) {
        setUserList((prevState) => [...prevState, ...res.content]);
        setOffset((prevState) => prevState + 1);
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (props.myTagList.length === 0) {
    } else {
      getRecommendUser(offset, size).then((res) => {
        setUserList(() => res.content);
      });
    }
  }, []);

  const onWheelHandler = () => {
    const scrollHeight = recRef.current.scrollHeight;
    const scrollTop = recRef.current.scrollTop;
    const clientHeight = recRef.current.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight - 10 && isLoading === false) {
      fetchMoreData();
    }
  };

  const altContents = () => {
    const message = "관심 태그가 없어요\n마이 프로필에서 태그를 설정해 보세요";
    return (
      <div className={classes[`alt-wrapper`]}>
        <div className={classes[`alt-message-icon`]}>
          <img src={personAddIcon} />
        </div>
        <div className={classes[`alt-message-wrapper`]}>{message}</div>
      </div>
    );
  };

  return (
    <div className={classes[`recommend-modal`]}>
      <div className={classes[`recommend-upper`]}>
        <div className={classes[`recommend-text`]}>관심 태그를 기반으로 추천해드려요!</div>
        <Button
          className={classes.button}
          onClick={() => {
            // props.onDone();
            props.modalHandler();
          }}
        >
          건너뛰기
        </Button>
      </div>
      <div className={classes[`recommend-wrapper`]} ref={recRef} onWheel={onWheelHandler}>
        <div className={classes[`content-wrapper`]}>
          {userList.length === 0 ? altContents() : UserRecommendCardList(userList)}
          {isLoading && <div className={classes.loading}>{Loading()}</div>}
        </div>
      </div>
    </div>
  );
};

export default UserRecommend;

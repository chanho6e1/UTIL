import { useState, useEffect, useRef } from "react";
import UserRecommendCard from "../UI/UserRecommendCard/UserRecommendCard";
import classes from "./UserRecommend.module.css";
import { getRecommendUser } from "../../api/UserProfile/getRecommendUser";
import Button from "../UI/Button/Button";
import Loading from "../UI/Loading/Loading";
import personAddIcon from "../../img/PersonAddIcon.svg";
import { useNavigate } from "react-router-dom";

const UserRecommend = (props) => {
  const [userList, setUserList] = useState([]);
  const [offset, setOffset] = useState(1);
  const size = 5;
  const recRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const UserRecommendCardList = (userList) => {
    return userList?.map((user) => {
      return <UserRecommendCard userData={user} key={`user-recommend-card-${user.userId}`} onDone={props.onDone} />;
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
    if (props.myTagList !== null) {
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
    const message = "관심 태그가 없어요. 마이 프로필에서 태그를 설정해 보세요";
    return (
      <div className={classes[`alt-wrapper`]}>
        <div className={classes[`alt-inner-wrapper`]}>
          <div className={classes[`alt-message-icon`]}>
            <img src={personAddIcon} />
          </div>
          <div className={classes[`alt-message-wrapper`]}>{message}</div>
        </div>
        
        <Button onClick={() => {navigate('/profile')}}>태그 추가하러 가기</Button>
      </div>
    );
  };

  return (
    <div className={classes[`recommend-modal`]}>
      <div className={classes[`recommend-upper`]}>
        <div className={classes[`recommend-text`]}>관심 태그 기반으로 추천해드려요!</div>
        <Button
          className={classes.button}
          onClick={() => {
            props.onDone();
            props.modalHandler();
          }}
        >
          다음
        </Button>
      </div>
      <div className={classes[`recommend-wrapper`]} ref={recRef} onWheel={onWheelHandler}>
        {userList.length === 0 && altContents()}
        <div className={classes[`content-wrapper`]}>
          {userList.length !== 0 && UserRecommendCardList(userList)}
          {isLoading && <div className={classes.loading}>{Loading()}</div>}
        </div>
      </div>
    </div>
  );
};

export default UserRecommend;

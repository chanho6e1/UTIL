import { useState, useEffect, useRef } from "react";
import UserRecommendCard from "../UI/UserRecommendCard/UserRecommendCard";
import classes from "./UserRecommend.module.css";
import { getRecommendUser } from "../../api/UserProfile/getRecommendUser";
import Button from "../UI/Button/Button";
import Loading from "../UI/Loading/Loading";

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

  // scroll event handler
  const handleScroll = () => {
    const scrollHeight = recRef.current.scrollHeight;
    const scrollTop = recRef.current.scrollTop;
    const clientHeight = recRef.current.clientHeight;
    console.log("st", scrollTop, "ch", clientHeight, "sh", scrollHeight);
    if (scrollTop + clientHeight >= scrollHeight - 20 && isLoading === false) {
      // 페이지 끝에 도달하면 추가 데이터를 받아온다
      fetchMoreData();
    }
  };

  useEffect(() => {
    getRecommendUser(offset, size).then((res) => {
      setUserList(() => res.content);
    });
  }, []);

  useEffect(() => {
    // scroll event listener 등록
    if (recRef.current !== null) {
      recRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      // scroll event listener 해제
      if (recRef.current !== null) {
        recRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  });

  return (
    <div className={classes[`recommend-modal`]}>
      <div className={classes[`recommend-upper`]}>
        <div className={classes[`recommend-text`]}>관심 태그를 기반으로 추천해드려요!</div>
        <Button
          onClick={() => {
            props.onDone();
            props.modalHandler();
          }}
        >
          건너뛰기
        </Button>
      </div>
      <div className={classes[`recommend-wrapper`]} ref={recRef}>
        <div className={classes[`content-wrapper`]}>
          {UserRecommendCardList(userList)}
          {isLoading && <div className={classes.loading}>{Loading()}</div>}
        </div>
      </div>
    </div>
  );
};

export default UserRecommend;

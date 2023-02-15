import { useEffect, useState, useRef } from "react";
import classes from "./Search.module.css";
import SearchBar from "../UI/SearchBar/SearchBar";
import { getPostSearch } from "../../api/Post/getPostSearch";
import { getPostByTagName } from "../../api/Post/getPostByTagName";
import { getPostByNickname } from "../../api/Post/getPostByNickname";
import { useLocation } from "react-router-dom";
import ExploreFeed from "../Explore/ExploreFeed";
import { Routes, Route } from "react-router-dom";
import DetailItem from "../Detail/DetailItem";

const SearchForm = (props) => {
  const apiLabelList = ["제목", "태그", "닉네임"];
  const criteriaLabelList = ["최신", "조회수", "좋아요"];
  const location = useLocation();
  const [searchInput, setSearchInput] = useState("");
  const [dropDownLabel, setDropDownLabel] = useState(apiLabelList[0]);
  const [dropDownCriteriaLabel, setDropDownCriteriaLabel] = useState(criteriaLabelList[0]);
  const searchFeedWrapperRef = useRef();

  const [api, setApi] = useState(0);
  const criteriaData = ["date", "view", "like"];
  const [criteria, setCriteria] = useState(0);

  const inputChangeHandler = (event) => {
    setSearchInput(() => event.target.value);
  };

  const clearBtnHandler = (event) => {
    setSearchInput(() => "");
  };

  // API Items
  const onTitleClick = (event) => {
    setApi(0);
    setDropDownLabel(apiLabelList[0]);
  };
  const onTagClick = (event) => {
    setApi(1);
    setDropDownLabel(apiLabelList[1]);
  };
  const onNicknameClick = (event) => {
    setApi(2);
    setDropDownLabel(apiLabelList[2]);
  };

  // Criteria Items
  const onDateClick = () => {
    setCriteria(0);
    setDropDownCriteriaLabel(criteriaLabelList[0]);
  };
  const onViewClick = () => {
    setCriteria(1);
    setDropDownCriteriaLabel(criteriaLabelList[1]);
  };
  const onLikeClick = () => {
    setCriteria(2);
    setDropDownCriteriaLabel(criteriaLabelList[2]);
  };

  useEffect(() => {
    if (location.search !== "") {
      const searchParams = new URLSearchParams(location.search);
      const tagName = searchParams.get("tag");
      setSearchInput(() => tagName);
      setApi(() => 1);
      setDropDownLabel(() => apiLabelList[1]);
    } else {
      setApi(() => 0);
      setDropDownLabel(() => apiLabelList[0]);
    }
  }, [location]);

  const [feedList, setFeedList] = useState([]);
  // const criteria = ["date", "view", "like"];
  const [offset, setOffset] = useState(1);
  const size = 10;

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchInput !== null && searchInput !== "") {
      setIsLoading(true);
      if (api === 0) {
        getPostSearch(criteriaData[criteria], offset, size, searchInput).then((res) => {
          if (res.content.length !== 0) {
            setFeedList(() => res.content);
          }
          setIsLoading(false);
        });
      } else if (api === 1) {
        getPostByTagName(criteriaData[criteria], offset, size, searchInput).then((res) => {
          if (res.content.length !== 0) {
            setFeedList(() => res.content);
          }
          setIsLoading(false);
        });
      } else {
        getPostByNickname(criteriaData[criteria], offset, size, searchInput).then((res) => {
          if (res.content.length !== 0) {
            setFeedList(() => res.content);
          }
          setIsLoading(false);
        });
      }
    }
  }, [searchInput, api, criteria]);

  const fetchMoreData = () => {
    setIsLoading(true);
    if (api === 0) {
      getPostSearch(criteriaData[criteria], offset + 1, size, searchInput).then((res) => {
        setFeedList((prevState) => [...prevState, ...res.content]);
        setOffset((prevState) => prevState + 1);
        setIsLoading(false);
      });
    } else if (api === 1) {
      getPostByTagName(criteriaData[criteria], offset + 1, size, searchInput).then((res) => {
        setFeedList((prevState) => [...prevState, ...res.content]);
        setOffset((prevState) => prevState + 1);
        setIsLoading(false);
      });
    } else {
      getPostByNickname(criteriaData[criteria], offset, size, searchInput).then((res) => {
        if (res.content.length !== 0) {
          setFeedList(() => res.content);
        }
        setIsLoading(false);
      });
    }
  };

  const onWheelHandler = (event) => {
    const scrollHeight = searchFeedWrapperRef.current.scrollHeight;
    const scrollTop = searchFeedWrapperRef.current.scrollTop;
    const clientHeight = searchFeedWrapperRef.current.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight - 10 && isLoading === false) {
      fetchMoreData();
    }
  };

  return (
    <div ref={searchFeedWrapperRef} onWheel={onWheelHandler} className={classes[`searchbar-feed`]}>
      <div className={classes[`searchbar`]}>
        <SearchBar
          inputChangeHandler={inputChangeHandler}
          clearBtnHandler={clearBtnHandler}
          onTitleClick={onTitleClick}
          onTagClick={onTagClick}
          onNicknameClick={onNicknameClick}
          onDateClick={onDateClick}
          onViewClick={onViewClick}
          onLikeClick={onLikeClick}
          value={searchInput}
          label={dropDownLabel}
          criteriaLabel={dropDownCriteriaLabel}
        />
      </div>
      <div className={classes[`searchfeed`]}>
        {searchInput === "" || searchInput === null ? (
          <div className={classes[`enter-search`]}>검색어를 입력하세요</div>
        ) : (
          // <SearchFeed api={api} searchInput={searchInput} criteria={criteria} />
          <ExploreFeed feedList={feedList} />
        )}
      </div>
    </div>
  );
};

const Search = (props) => {
  return (
    <div style={{ height: "100%" }}>
      <div id="search-overlay-root"></div>

      <Routes>
        <Route path="search/" element={<SearchForm />} />
        <Route path="search/:nickname/*" element={<SearchForm />} />
        <Route path="search/:nickname/post/:id" element={<DetailItem />} />
      </Routes>
    </div>
  );
};

export default Search;

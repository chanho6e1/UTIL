import { useEffect, useState, useRef } from "react";
import classes from "./Search.module.css";
import SearchBar from "../UI/SearchBar/SearchBar";
import { getPostSearch } from "../../api/Post/getPostSearch";
import { getPostByTagName } from "../../api/Post/getPostByTagName";
import SearchFeed from "../Feed/SearchFeed";
import { useLocation } from "react-router-dom";

const Search = (props) => {
  const apiLabelList = ["제목", "태그", "닉네임"];
  const criteriaLabelList = ["최신", "조회수", "좋아요"];
  const location = useLocation();
  const [searchInput, setSearchInput] = useState("");
  const [dropDownLabel, setDropDownLabel] = useState(apiLabelList[0]);
  const [dropDownCriteriaLabel, setDropDownCriteriaLabel] = useState(criteriaLabelList[0]);

  const [api, setApi] = useState(0);
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
    if (location.key !== "default") {
      const searchParams = new URLSearchParams(location.search);
      const tagName = searchParams.get("tag");
      setSearchInput(() => tagName);
      setApi(() => 1);
      setDropDownLabel(() => apiLabelList[1]);
    }
  }, [location]);

  return (
    <div className={classes[`searchbar-feed`]}>
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
        {searchInput === "" ? (
          <div className={classes[`enter-search`]}>검색어를 입력하세요</div>
        ) : (
          <SearchFeed api={api} searchInput={searchInput} criteria={criteria} />
        )}
      </div>
    </div>
  );
};

export default Search;

// searchInput !== "" &&

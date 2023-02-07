import { useEffect, useState } from "react";
import classes from "./Search.module.css";
import SearchBar from "../UI/SearchBar/SearchBar";
import { getPostSearch } from "../../api/Post/getPostSearch";
import { getPostByTagName } from "../../api/Post/getPostByTagName";
import SearchFeed from "../Feed/SearchFeed";

const Search = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const [dropDownLabel, setDropDownLabel] = useState("제목");
  const [api, setApi] = useState(0);

  const inputChangeHandler = (event) => {
    console.log("SSAFY", event.target.value);
    setSearchInput(() => event.target.value);
  };

  const clearBtnHandler = (event) => {
    setSearchInput(() => "");
  };

  const onTitleClick = (event) => {
    setDropDownLabel("제목");
    setApi(0);
  };

  const onTagClick = (event) => {
    setDropDownLabel("태그");
    setApi(1);
  };

  return (
    <div className={classes[`searchbar-feed`]}>
      <div className={classes[`searchbar`]}>
        <SearchBar
          inputChangeHandler={inputChangeHandler}
          clearBtnHandler={clearBtnHandler}
          onTitleClick={onTitleClick}
          onTagClick={onTagClick}
          value={searchInput}
          label={dropDownLabel}
        />
      </div>
      <div>
        {searchInput === "" ? (
          <h1>검색해보세요</h1>
        ) : (
          <SearchFeed api={api} searchInput={searchInput} />
        )}
      </div>
    </div>
  );
};

export default Search;

// searchInput !== "" &&

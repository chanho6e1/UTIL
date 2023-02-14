import { useState, Fragment } from "react";
import classes from "./SearchBar.module.css";
import { Button, IconButton } from "@mui/material";
import CloseIcon from "../../../img/Close40.svg";
import ExpandIcon from "../../../img/Expand40.svg";
import DropDown from "../DropDown/DropDown";
import Tab from "../Tab/Tab";

const SearchBar = (props) => {
  const dropDownSearchItems = {
    label: ["제목", "태그", "닉네임"],
    description: ["", ""],
    function: [props.onTitleClick, props.onTagClick, props.onNicknameClick],
  };

  const dropDownCriteriaItems = {
    label: ["최신", "조회수", "좋아요"],
    description: ["", ""],
    function: [props.onDateClick, props.onViewClick, props.onLikeClick],
  };

  const [dropDownState, setDropDownState] = useState(false);
  const [dropDownCriteriaState, setDropDownCriteriaState] = useState(false);

  const tabItems = [
    {content: '최신', function: props.onDateClick},
    {content: '조회수', function: props.onViewClick},
    {content: '좋아요', function: props.onLikeClick}
  ]

  return (
    <Fragment>
      <div className={classes[`search-container`]}>
        <div className={classes[`dummy`]}/>

        





        <div className={classes[`search-bar`]}>
          <div>
            <DropDown
              dropDownItems={dropDownSearchItems}
              dropDownState={dropDownState}
              setDropDownState={setDropDownState}
              width={"100px"}
              itemHeight={"48px"}
              direction={"down"}
              borderRadius={"5px"}
              noLiTag={true}
            />
            <div
              className={classes["search-dropdown"]}
              onClick={() => {
                setDropDownState(true);
              }}
            >
              {props.label}
            </div>
          </div>

          <div className={classes[`search-bar-line`]}/>

          <input
              className={classes[`text-input`]}
              placeholder={'검색어를 입력해 주세요.'}
              onChange={props.inputChangeHandler}
              value={props.value}
              type="text"
              id="search-input"
              maxLength={50}
          />
        </div>






        <div className={classes["sort-dropdown"]}>
          <DropDown
            dropDownItems={dropDownCriteriaItems}
            dropDownState={dropDownCriteriaState}
            setDropDownState={setDropDownCriteriaState}
            width={"152px"}
            itemHeight={"48px"}
            direction={"down"}
            borderRadius={"5px"}
          />
          <div
            className={classes["dropdown"]}
            onClick={() => {
              setDropDownCriteriaState(true);
            }}
          >
            <li className={classes["drop-down-li-tag"]} />{props.criteriaLabel}
          </div>
        </div>

        <div className={classes["sort-tab"]}>
          <Tab tabItems={tabItems} width={'100vw'} height={'48px'} />
        </div>




      </div>
    </Fragment>
  );
};

export default SearchBar;

import { useState, Fragment } from "react";
import classes from "./SearchBar.module.css";
import { Button, IconButton } from "@mui/material";
import CloseIcon from "../../../img/Close40.svg";
import ExpandIcon from "../../../img/Expand40.svg";
import DropDown from "../DropDown/DropDown";

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

  return (
    <Fragment>
      <div className={classes[`searchbar-dropdown`]}>
        <div className={classes[`dropdown-search`]}>
          <div className={classes[`dropdown`]}>
            <IconButton sx={{ width: 40, height: 40 }} onClick={() => setDropDownState(true)}>
              <img src={ExpandIcon} />
            </IconButton>
            <DropDown
              dropDownItems={dropDownSearchItems}
              dropDownState={dropDownState}
              setDropDownState={setDropDownState}
              width={"120px"}
              marginLeft={"-12px"}
              direction={"down"}
            />
          </div>
          <div className={classes[`dropdown-item`]}>{props.label}</div>
        </div>
        <div className={classes[`search-container`]}>
          <div className={classes[`input-wrap`]}>
            <input
              className={classes[`text-input`]}
              onChange={props.inputChangeHandler}
              value={props.value}
              type="text"
              id="search-input"
              maxLength={50}
            />
          </div>
          <div className={classes[`btn-wrap`]}>
            <IconButton sx={{ width: 40, height: 40 }} onClick={props.clearBtnHandler}>
              <img src={CloseIcon} />
            </IconButton>
          </div>
        </div>
        <div className={classes[`dropdown-sort`]}>
          <div className={classes[`dropdown-item`]}>{props.criteriaLabel}</div>
          <div className={classes[`dropdown`]}>
            <IconButton
              sx={{ width: 40, height: 40 }}
              onClick={() => setDropDownCriteriaState(true)}
            >
              <img src={ExpandIcon} />
            </IconButton>
            <DropDown
              dropDownItems={dropDownCriteriaItems}
              dropDownState={dropDownCriteriaState}
              setDropDownState={setDropDownCriteriaState}
              width={"120px"}
              marginLeft={"-80px"}
              direction={"down"}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SearchBar;

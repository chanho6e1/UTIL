import { useState, Fragment } from "react";
import classes from "./SearchBar.module.css";
import { Button, IconButton } from "@mui/material";
import CloseIcon from "../../../img/Close40.svg";
import ExpandIcon from "../../../img/Expand40.svg";
import DropDown from "../DropDown/DropDown";

const SearchBar = (props) => {
  const dropDownItems = {
    label: ["제목", "태그"],
    description: ["", ""],
    function: [props.onTitleClick, props.onTagClick],
  };

  const [dropDownState, setDropDownState] = useState(false);

  return (
    <Fragment>
      <div className={classes[`searchbar-dropdown`]}>
        <div className={classes[`dropdown-container`]}>
          <div className={classes[`dropdown`]}>
            <IconButton sx={{ width: 40, height: 40 }} onClick={() => setDropDownState(true)}>
              <img src={ExpandIcon} />
            </IconButton>
            <DropDown
              dropDownItems={dropDownItems}
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
      </div>
    </Fragment>
  );
};

export default SearchBar;

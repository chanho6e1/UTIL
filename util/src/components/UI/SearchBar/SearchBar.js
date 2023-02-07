import { useState, Fragment } from "react";
import classes from "./SearchBar.module.css";
import { Button, IconButton } from "@mui/material";
import CloseIcon from "../../../img/Close40.svg";
import ExpandIcon from "../../../img/Expand40.svg";
import DropDown from "../DropDown/DropDown";

const SearchBar = (props) => {
  const [searchInput, setSearchInput] = useState("");

  const onChangeHandler = (event) => {
    setSearchInput(event.target.value);
  };

  const clearBtnHandler = () => {
    setSearchInput("");
  };

  const dropDownItems = {
    label: ["제목", "태그"],
    description: ["", ""],
    function: [null, null],
  };

  const [dropDownState, setDropDownState] = useState(false);

  return (
    <Fragment>
      <div className={classes[`searchbar-dropdown`]}>
        <div className={classes[`dropdown`]}>
          <IconButton
            sx={{ width: 40, height: 40 }}
            onClick={() => setDropDownState((prevState) => !prevState)}
          >
            <img src={ExpandIcon} />
          </IconButton>
          <DropDown
            dropDownItems={dropDownItems}
            dropDownState={dropDownState}
            setDropDownState={setDropDownState}
            width={"260px"}
            direction={"down"}
            marginLeft={"100px"}
          />
          <div>{"이름"}</div>
        </div>
        <div className={classes[`search-container`]}>
          <div className={classes[`input-wrap`]}>
            <input
              className={classes[`text-input`]}
              onChange={onChangeHandler}
              value={searchInput}
              type="search"
              id="search-input"
              maxLength={50}
            />
          </div>
          <div className={classes[`btn-wrap`]}>
            <IconButton sx={{ width: 40, height: 40 }}>
              <img src={CloseIcon} onClick={clearBtnHandler} />
            </IconButton>
          </div>
        </div>
        <div>
          <h1>{searchInput}</h1>
        </div>
      </div>
    </Fragment>
  );
};

export default SearchBar;

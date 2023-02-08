import { useState } from "react";
import { getPosts } from "../../api/Post/getPosts";
import { getPostsByMyTag } from "../../api/Post/getPostsByMyTag";
import { IconButton } from "@mui/material";
import Feed from "../Feed/Feed";
import ExploreFeed from "../Feed/ExploreFeed";
import classes from "./Explore.module.css";
import ExpandIcon from "../../img/Expand40.svg";
import DropDown from "../UI/DropDown/DropDown";

const Explore = () => {
  const [criteria, setCriteria] = useState(0);
  const criteriaLabelList = ["최신", "조회수", "좋아요"];
  const [dropDownCriteriaState, setDropDownCriteriaState] = useState(false);

  const onDateClick = () => {
    setCriteria(0);
  };

  const onViewClick = () => {
    setCriteria(1);
  };

  const onLikeClick = () => {
    setCriteria(2);
  };

  const dropDownCriteriaItems = {
    label: ["최신", "조회수", "좋아요"],
    description: ["", ""],
    function: [onDateClick, onViewClick, onLikeClick],
  };

  return (
    <div className={classes[`explore-container`]}>
      <div className={classes[`dropdown-sort`]}>
        <div className={classes[`dropdown-item`]}>{criteriaLabelList[criteria]}</div>
        <div className={classes[`dropdown`]}>
          <IconButton sx={{ width: 40, height: 40 }} onClick={() => setDropDownCriteriaState(true)}>
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
      <div className={classes[`explore-feed`]}>
        <ExploreFeed api={getPostsByMyTag} criteria={criteria} />
      </div>
    </div>
  );
};

export default Explore;

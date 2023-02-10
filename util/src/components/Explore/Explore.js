import { useState } from "react";
import { getMyTags } from "../../api/UserProfile/getMyTags";
import { getPostsByMyTag } from "../../api/Post/getPostsByMyTag";
import { IconButton } from "@mui/material";
import Feed from "../Feed/Feed";
import { useSelector } from "react-redux";
import ExploreFeed from "../Feed/ExploreFeed";
import classes from "./Explore.module.css";
import ExpandIcon from "../../img/Expand40.svg";
import DropDown from "../UI/DropDown/DropDown";
import { useEffect } from "react";
import { Fragment } from "react";

const Explore = () => {
  const [criteria, setCriteria] = useState(0);
  const criteriaLabelList = ["최신", "조회수", "좋아요"];
  const [dropDownCriteriaState, setDropDownCriteriaState] = useState(false);
  const [myTagList, setMyTagList] = useState([]);
  const userAuth = useSelector((state) => state.userAuthSlice.userAuth);

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

  // 내가 가진 태그 조회
  useEffect(() => {
    getMyTags().then((res) => {
      setMyTagList(() => [...res]);
    });
  }, []);

  const content = (myTagList) => {
    const altText = "관심 태그가 없어요\n\n마이 프로필에서 태그를 설정해 보세요";
    if (myTagList.length > 0) {
      return (
        <Fragment>
          <div className={classes[`dropdown-container`]}>
            <div className={classes[`dropdown-sort`]}>
              <div className={classes[`dropdown-item`]}>{criteriaLabelList[criteria]}</div>
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
          <div className={classes[`explore-feed`]}>
            <ExploreFeed api={getPostsByMyTag} criteria={criteria} />
          </div>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <div className={classes[`alt-text`]}>{altText}</div>
        </Fragment>
      );
    }
  };

  return <div className={classes[`explore-container`]}>{content(myTagList)}</div>;
};

export default Explore;

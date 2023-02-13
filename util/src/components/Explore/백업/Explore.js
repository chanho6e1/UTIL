import { useState } from "react";
import { getMyTags } from "../../api/UserProfile/getMyTags";
import { getPostsByMyTag } from "../../api/Post/getPostsByMyTag";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import ExploreFeed from "../Feed/ExploreFeed";
import classes from "./Explore.module.css";
import ExpandIcon from "../../img/Expand40.svg";
import DropDown from "../UI/DropDown/DropDown";
import { useEffect, useRef } from "react";
import { Fragment } from "react";
import { getSubscribePosts } from "../../api/Post/getSubscribePosts";
import { Routes, Route } from "react-router-dom";
import DetailItem from "../Detail/DetailItem";
import Tab from "../UI/Tab/Tab";

const ExploreForm = () => {
  const [criteria, setCriteria] = useState(0);
  const criteriaLabelList = ["피드", "최신", "조회수", "좋아요"];
  const [dropDownCriteriaState, setDropDownCriteriaState] = useState(false);
  const [myTagList, setMyTagList] = useState([]);
  const userAuth = useSelector((state) => state.userAuthSlice.userAuth);
  const exploreRef = useRef()
  
  const onFeedClick = () => {
    setCriteria(0);
  };

  const onDateClick = () => {
    setCriteria(1);
  };

  const onViewClick = () => {
    setCriteria(2);
  };

  const onLikeClick = () => {
    setCriteria(3);
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

  const tabItems = [
    {content: '피드', function: onFeedClick},
    {content: '탐색', function: onDateClick}
  ]

  const dropDown = (
    <div>
      <DropDown 
        dropDownItems={dropDownCriteriaItems}
        dropDownState={dropDownCriteriaState}
        setDropDownState={setDropDownCriteriaState}
        width={'152px'} itemHeight={'48px'} direction={'down'} borderRadius={'5px'}
      />

      <div className={classes['dropdown']} onClick={() => {setDropDownCriteriaState(() => true)}}>
        <li className={classes['drop-down-li-tag']} />
        {criteriaLabelList[criteria]}
      </div>
    </div>
  )

  const content = (myTagList) => {
    
    const header = (
      <div className={classes[`dropdown-container`]}>
        <div className={classes['tab-wrapper']}>
          <Tab tabItems={tabItems} width={'200px'} height={'48px'} />
        </div>
        {criteria === 0 ? null : dropDown}
      </div>
    )

    const exploreFeed = (
      <div className={classes[`explore-feed`]}>
   
        {/* {header} */}
        <ExploreFeed api={criteria === 0 ? getSubscribePosts : getPostsByMyTag} criteria={criteria} myTagList={myTagList} exploreRef={exploreRef} />

        
      </div>
    )

    

    return (
      <Fragment>
        <div ref={exploreRef} className={classes['explore-wrapper']}>
          <div className={classes['explore-inner-wrapper']}>
          {header}
          {exploreFeed}
          </div>
          
        </div>
          

        
      </Fragment>
    )


};

  return <div className={classes[`explore-container`]}>{content(myTagList)}</div>;
};



const Explore = (props) => {
  return (
    <div>
      <div id="explore-overlay-root"></div>

      <Routes>
        <Route path="*" element={<ExploreForm />} /> 
        <Route path="explore/*" element={<ExploreForm />} />  
        <Route path="post/:id" element={<DetailItem />} />
      </Routes>
    </div>
  )
}

export default Explore;

import classes from "./FollowModal.module.css";
import { Fragment, useEffect, useState } from "react";
import FollowCard from "./FollowCard";
import { IconButton } from "@mui/material";
import CloseIcon from "../../../img/Close40.svg";

const FollowModal = (props) => {
  const [followData, setFollowData] = useState(props.followData);

  const FollowCardList = (followList) => {
    return followList?.map((user) => {
      return (
        <FollowCard
          id={user.userId}
          key={`follow-card-${user.userId}`}
          userData={user}
          modalHandler={props.modalHandler}
        />
      );
    });
  };

  useEffect(() => {
    if (props.followData) {
      setFollowData(() => [...props.followData]);
    }
  }, []);

  return (
    <div className={classes[`follow-modal`]}>
      <div className={classes[`follow-modal-upper`]}>
        <div className={classes[`follow-text`]}>{props.title}</div>
        <IconButton
          onClick={() => {
            props.onFollowModalClose();
            props.modalHandler();
          }}
          style={{
            padding: 0,
          }}
        >
          <img src={CloseIcon} />
        </IconButton>
      </div>
      <div className={classes[`follow-modal-lower`]}>
        <div className={classes[`follow-modal-contents`]}>{FollowCardList(followData)}</div>
      </div>
    </div>
  );
};

export default FollowModal;

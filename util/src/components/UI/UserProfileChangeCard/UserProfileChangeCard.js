import { useState, useRef, useEffect } from "react";
import classes from "./UserProfileChangeCard.module.css";
import { Avatar, Button, TextField, FormControl, IconButton } from "@mui/material";
import AutoCompleteMultipleTagInput from "../Tag/AutoCompleteMultipleTagInput";
import PhotoCameraIconCircle from "../../../img/photoCameraIcon_circle.png";
import { nicknameDuplicateCheck } from "../../../api/UserProfile/nicknameDuplicateCheck";
import { getAllTags } from "../../../api/UserProfile/getAllTags";

const isUnderTwoChars = (value) => (typeof value === "string" ? value.trim().length < 2 : false);
const isOverTenChars = (value) => (typeof value === "string" ? value.trim().length > 10 : false);
const isTagOverFive = (value) => value.length > 5;

const UserProfileChangeCard = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [isInit, setIsInit] = useState(true);

  // 프로필 사진
  const [imageUrl, setImageUrl] = useState(props.imageUrl);
  const [isHover, setIsHover] = useState(false);
  // 프로필 사진 업로드
  const fileInput = useRef(null);
  const fileChangeHandler = (event) => {
    if (!event.target.files) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        console.log(reader.result);
        setImageUrl(reader.result);
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const avatarOnMouseToggleHandler = () => {
    setIsHover((prevState) => !prevState);
  };

  // 닉네임
  const originalNickname = props.nickname ? props.nickname : "";
  const [nickname, setNickname] = useState(originalNickname);
  const [nicknameIsUnderTwoChars, setNicknameIsUnderTwoChars] = useState(false);
  const [nicknameIsOverTenChars, setNicknameIsOverTenChars] = useState(false);
  const [nicknameIsDuplicated, setNicknameIsDuplicated] = useState(false);

  const [description, setDescription] = useState(props.description ? props.description : "");
  // description(자기소개) 글자 수
  const [count, setCount] = useState(props.description ? props.description.length : 0);

  // 소속
  const [myDepartment, setMyDepartment] = useState(props.department ? props.department : "");

  // 관심 태그
  const [myTagList, setMyTagList] = useState(props.myTagList ? props.myTagList : []);
  const [myTagOverFive, setMyTagOverFive] = useState(isTagOverFive(myTagList.length));
  const [allTagList, setAllTagList] = useState([]);

  useEffect(() => {
    getAllTags().then((res) => {
      setAllTagList(() => res.map((t) => t.tagName));
    });
  }, []);

  const nicknameInputRef = useRef();
  const descriptionInputRef = useRef();
  const departmentInputRef = useRef();

  const nicknameOnChangeHandler = (event) => {
    setNickname(event.target.value);
    setNicknameIsUnderTwoChars(isUnderTwoChars(event.target.value));
    setNicknameIsOverTenChars(isOverTenChars(event.target.value));
    if (isInit) {
      setIsInit(false);
    }
  };

  // Form 유효성 검사 with timeout
  useEffect(() => {
    const identifier = setTimeout(() => {
      if (isInit && originalNickname === "") {
        setFormIsValid(false);
      } else {
        if (originalNickname.toLowerCase() === nickname.toLowerCase()) {
          setNicknameIsDuplicated(false);
          setFormIsValid(
            !nicknameIsDuplicated &&
              !nicknameIsUnderTwoChars &&
              !nicknameIsOverTenChars &&
              !myTagOverFive
          );
        } else {
          nicknameDuplicateCheck(nickname).then((res) => {
            setNicknameIsDuplicated(() => res);
            setFormIsValid(
              !nicknameIsDuplicated &&
                !nicknameIsUnderTwoChars &&
                !nicknameIsOverTenChars &&
                !myTagOverFive
            );
          });
        }
      }
    }, 300);
    return () => {
      clearTimeout(identifier);
    };
  }, [nickname, nicknameIsDuplicated, nicknameIsOverTenChars, nicknameIsUnderTwoChars, myTagList]);

  const descriptionOnChangeHandler = (event) => {
    setDescription(event.target.value);
    setCount(event.target.value.length);
  };

  const departmentOnChangeHandler = (value) => {
    setMyDepartment(value);
  };

  const myTagListChangeHandler = (value) => {
    setMyTagList(() => [...value]);
    setMyTagOverFive(() => isTagOverFive(value));
  };

  const onCancelClicked = () => {
    console.log("cancel");
  };

  const confirmHandler = (event) => {
    event.preventDefault();
    console.log("submit");

    const enteredNickname = nicknameInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredDepartment = departmentInputRef.current.value;

    console.log(enteredNickname);
    console.log(enteredDescription);
    console.log(enteredDepartment);
    console.log(myTagList);
    console.log(imageUrl);

    // Form 유효성 확인 한번 더 체크
    const enteredFormIsValid =
      !nicknameIsUnderTwoChars &&
      !nicknameIsOverTenChars &&
      !nicknameIsDuplicated &&
      !myTagOverFive;

    if (!enteredFormIsValid) {
      return;
    }

    props.onConfirm({
      nickname: enteredNickname,
      description: enteredDescription,
      department: enteredDepartment,
      tagList: myTagList,
      imageUrl: imageUrl,
    });
  };

  return (
    <form className={classes.userprofile} onSubmit={confirmHandler}>
      <div className={classes.header}>
        <IconButton
          onClick={() => {
            fileInput.current.click();
          }}
          onMouseEnter={avatarOnMouseToggleHandler}
          onMouseLeave={avatarOnMouseToggleHandler}
          className={classes.iconbutton}
        >
          <Avatar
            src={imageUrl}
            sx={{ width: 100, height: 100 }}
            className={classes[`avatar-img`]}
          />
          {isHover && <img src={PhotoCameraIconCircle} className={classes.camera} />}
          <input
            style={{ display: "none" }}
            type="file"
            accept="image/jpg,image/png,image/jpeg"
            ref={fileInput}
            onChange={fileChangeHandler}
          />
        </IconButton>
        {props.userName}
      </div>
      <div className={classes.userdata}>
        <div className={classes.nickname}>
          <FormControl sx={{ width: "100%" }}>
            <TextField
              id="filled-basic"
              error={nicknameIsUnderTwoChars || nicknameIsOverTenChars || nicknameIsDuplicated}
              helperText={
                nicknameIsUnderTwoChars || nicknameIsOverTenChars
                  ? "닉네임은 2자 이상 10자 이하입니다."
                  : nicknameIsDuplicated
                  ? "중복된 닉네임입니다."
                  : ""
              }
              label="Nickname"
              variant="outlined"
              defaultValue={nickname}
              inputRef={nicknameInputRef}
              onChange={nicknameOnChangeHandler}
            />
          </FormControl>
        </div>
        <div className={classes.description}>
          <FormControl sx={{ width: "100%" }}>
            <TextField
              id="filled-multiline-static"
              label="자기소개"
              variant="filled"
              multiline
              rows={5}
              defaultValue={description}
              inputProps={{ maxLength: 150 }}
              helperText={`${count}/150`}
              inputRef={descriptionInputRef}
              onChange={descriptionOnChangeHandler}
            />
          </FormControl>
        </div>
        <div className={classes.skill}>
          <FormControl sx={{ width: "100%" }}>
            <TextField
              id="filled-basic"
              label="소속"
              variant="outlined"
              defaultValue={myDepartment}
              inputRef={departmentInputRef}
              onChange={departmentOnChangeHandler}
            />
          </FormControl>
        </div>
        <div className={classes.skill}>
          <FormControl sx={{ width: "100%" }}>
            <AutoCompleteMultipleTagInput
              value={myTagList}
              tagList={allTagList}
              label={"관심 태그"}
              onChange={myTagListChangeHandler}
              error={myTagOverFive}
              helperText={myTagOverFive ? "관심 태그는 5개까지 등록 가능합니다." : ""}
            />
          </FormControl>
        </div>
        <div className={classes.button}>
          {/* 신규유저라면 취소버튼을 숨긴다 */}
          {props.nickname && (
            <Button type="button" variant="contained" sx={{ mr: 2 }} onClick={onCancelClicked}>
              취소
            </Button>
          )}
          <Button type="submit" variant="contained" disabled={!formIsValid}>
            저장
          </Button>
        </div>
      </div>
    </form>
  );
};

export default UserProfileChangeCard;

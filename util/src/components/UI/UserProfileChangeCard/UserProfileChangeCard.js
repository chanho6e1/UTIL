import { useState, useRef, useEffect } from "react";
import classes from "./UserProfileChangeCard.module.css";
import { Avatar, Button, TextField, FormControl, IconButton } from "@mui/material";
import axios from "axios";
import AutoCompleteTagInput from "./AutoCompleteTagInput";
import PhotoCameraIcon from "../../../img/photoCameraIcon_gray.png";

const isUnderTwoChars = (value) => value.trim().length < 2;
const isOverTenChars = (value) => value.trim().length > 10;
const isDuplicated = (value) => {
  const userInput = value.trim();
  const url = "http://i8d210.p.ssafy.io:8081/user/nickname/" + userInput;
  console.log(url);

  const data = axios
    .get(url)
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
      return { data: false };
    });
  const result = data.data;

  return result;
};

const UserProfileChangeCard = (props) => {
  console.log(props);
  const [formIsValid, setFormIsValid] = useState(true);

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
  const [nickname, setNickname] = useState(props.nickname);
  const [nicknameIsUnderTwoChars, setNicknameIsUnderTwoChars] = useState(false);
  const [nicknameIsOverTenChars, setNicknameIsOverTenChars] = useState(false);
  const [nicknameIsDuplicated, setNicknameIsDuplicated] = useState(false);

  const [description, setDescription] = useState(props.description ? props.description : "");
  // description(자기소개) 글자 수
  const [count, setCount] = useState(props.description ? props.description.length : 0);

  // 소속
  const [myDepartment, setMyDepartment] = useState(props.department);

  // 관심 기술
  const mySkillObj = [...props.skill];
  const mySkillList = mySkillObj.map((skill) => skill.name);
  const [mySkill, setMySkill] = useState(mySkillList);

  const nicknameInputRef = useRef();
  const descriptionInputRef = useRef();

  const nicknameOnChangeHandler = (event) => {
    setNickname(event.target.value);
    setNicknameIsUnderTwoChars(isUnderTwoChars(event.target.value));
    setNicknameIsOverTenChars(isOverTenChars(event.target.value));
  };

  useEffect(() => {
    const identifier = setTimeout(() => {
      setNicknameIsDuplicated(isDuplicated(nicknameInputRef.current.value));

      setFormIsValid(!nicknameIsUnderTwoChars && !nicknameIsOverTenChars && !nicknameIsDuplicated);
      console.log("validation check");
    }, 300);

    return () => {
      console.log("CLEAN UP");
      clearTimeout(identifier);
    };
  }, [nickname, nicknameIsDuplicated, nicknameIsOverTenChars, nicknameIsUnderTwoChars]);

  const descriptionOnChangeHandler = (event) => {
    setDescription(event.target.value);
    setCount(event.target.value.length);
  };

  const departmentOnChangeHandler = (value) => {
    setMyDepartment([...value]);
  };

  const skillOnChangeHandler = (value) => {
    setMySkill([...value]);
  };

  const onCancelClicked = () => {
    console.log("cancel");
  };

  const confirmHandler = (event) => {
    event.preventDefault();
    console.log("submit");

    const enteredNickname = nicknameInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    console.log(enteredNickname);
    console.log(enteredDescription);
    console.log(myDepartment);
    console.log(mySkill);
    console.log(imageUrl);

    const enteredNicknameIsValid = !nicknameIsUnderTwoChars || !nicknameIsOverTenChars;

    if (!enteredNicknameIsValid) {
      return;
    }

    props.onConfirm({
      nickname: nickname,
      description: description,
      department: myDepartment,
      skill: mySkill,
      imageUrl: imageUrl,
    });
  };

  const skillTagList = [
    { name: "Python", id: 0 },
    { name: "Java", id: 1 },
    { name: "C++", id: 2 },
    { name: "C", id: 3 },
    { name: "JavaScript", id: 4 },
    { name: "React", id: 5 },
  ];

  const skillTagNameList = skillTagList.map((tag) => tag.name);

  const departmentTagList = [
    { name: "SSAFY", id: 0 },
    { name: "삼성", id: 1 },
    { name: "네이버", id: 2 },
    { name: "카카오", id: 3 },
    { name: "구글", id: 4 },
    { name: "애플", id: 5 },
  ];

  const departmentTagNameList = departmentTagList.map((tag) => tag.name);

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
            src={imageUrl || "../../assets/defualtUserProfilePic.svg"}
            sx={{ width: 100, height: 100 }}
            className={classes[`avatar-img`]}
          />
          {isHover && <img src={PhotoCameraIcon} className={classes.camera} />}
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
              error={nicknameIsUnderTwoChars || nicknameIsOverTenChars}
              helperText={
                nicknameIsUnderTwoChars || nicknameIsOverTenChars
                  ? "닉네임은 2자 이상 10자 이하입니다."
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
              multiline
              rows={5}
              defaultValue={description}
              variant="filled"
              inputProps={{ maxLength: 150 }}
              helperText={`${count}/150`}
              inputRef={descriptionInputRef}
              onChange={descriptionOnChangeHandler}
            />
          </FormControl>
        </div>
        <div className={classes.skill}>
          <FormControl sx={{ width: "100%" }}>
            <AutoCompleteTagInput
              tagList={departmentTagNameList}
              label={"소속"}
              onChange={departmentOnChangeHandler}
              value={myDepartment}
            />
          </FormControl>
        </div>
        <div className={classes.skill}>
          <FormControl sx={{ width: "100%" }}>
            <AutoCompleteTagInput
              tagList={skillTagNameList}
              label={"관심 기술"}
              onChange={skillOnChangeHandler}
              value={mySkill}
            />
          </FormControl>
        </div>
        <div className={classes.button}>
          <Button type="button" variant="contained" sx={{ mr: 2 }} onClick={onCancelClicked}>
            취소
          </Button>
          <Button type="submit" variant="contained" disabled={!formIsValid}>
            저장
          </Button>
        </div>
      </div>
    </form>
  );
};

export default UserProfileChangeCard;

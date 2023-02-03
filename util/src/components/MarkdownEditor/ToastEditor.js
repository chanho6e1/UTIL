import { useRef, useState, useEffect } from 'react';
import PostTag from './PostTag';
import Button from '../UI/Button/Button';
import FixedModal from '../UI/FixedModal/FixedModal';
import BlogPostForm from './BlogPostForm';
import NotiDeliverer from '../UI/StackNotification/NotiDeliverer';
import warning from "../../img/Warning.png"
import { uploadPost } from '../../api/Post/uploadPost';
import { uploadReview } from '../../api/Post/uploadReview';
import { useNavigate, useMatch, useLocation, Routes, Route, useSearchParams } from "react-router-dom";
import { recvPlanAPI } from '../../api/Plan/recvPlanAPI';

// Toast 에디터
import { Editor } from '@toast-ui/react-editor';
import './ToastEditor.css';
import styles from './ToastEditor.module.css'
import { uploadPhoto } from '../../api/Post/uploadPhoto';



import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js';

import '@toast-ui/editor/dist/i18n/ko-kr';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';

import prism from 'prismjs';
import 'prismjs/themes/prism.css';



export default function ToastEditor(props) {
  const editorRef = useRef()
  const [searchParams, setSearchParams] = useSearchParams();
  const today = new Date()
  const dateString = `${today.getFullYear()}년 ${today.getMonth()}월 ${today.getDate()}일 회고록`
  const [images, setImages] = useState([])
  const [tags, setTags] = useState([])
  const [title, setTitle] = useState(props.forReview ? dateString : '')
  const [content, setContent] = useState(null)
  const [modalState, setModalState] = useState(false)
  const [scope, setScope] = useState()
  const [bindedGoal, setBindedGoal] = useState(searchParams.get('goal_id') ? searchParams.get('goal_id') : null)
  const [queryString, setQueryString] = useState({goal:null, takeStep:null, askDone:null})

  const navigate = useNavigate()


  useEffect(() => {
    const goalId = searchParams.get('goal_id')
    const takeStep = searchParams.get('step')
    const askDone = searchParams.get('ask_done')
    if (goalId) {
      recvPlanAPI(goalId)
      .then((res) => {
        setQueryString((prev) => {return {...prev, goal:res, takeStep, askDone}})
      })
    }
  }, [])



  const postSubmitHandler = (selectedScope, selectedGoalId) => {

    uploadPost({
      title: title,
      content: content,
      postFileList: images,
      isPrivate: selectedScope,
      goalId: selectedGoalId,
    }, {skill: tags})
    .then((res) => {
      if (queryString.takeStep) {
        navigate(`/create/review?goal_id=${queryString.goal.goalId}${queryString.askDone ? '&ask_done=true' : ''}`);
        window.location.reload()
      } else {
        navigate('/index', { replace: true });
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }


  const reviewSubmitHandler = (selectedGoalId) => {
    uploadReview(selectedGoalId, {
      title: title,
      content: content,
    })
    .then((res) => {
      if (queryString.askDone) {
        
      } else {
        navigate('/index', { replace: true });
      }
      
    })
    .catch((err) => {
      console.log(err)
    })
  }






  const titleInputHandler = (event) => {
    setTitle(() => event.target.value)
  }

  const clickSubmitHandler = () => {
    const isValid = editorRef.current.getInstance().getMarkdown()
    if (title.trim() === '') {
      setAlertText('글 제목을 작성해야 합니다.')
      setAlertNotiState(true)
    } else if (isValid === '') {
      setAlertText('글 내용을 작성해야 합니다.')
      setAlertNotiState(true)
    } else {
      setContent(editorRef.current.getInstance().getHTML())
      setModalState(true)
    }
    
  }

  const skipHandler = () => {
    setQueryString((prev) => { return {...prev, takeStep: null}})
    
    navigate(`/create/review?goal_id=${queryString.goal.goalId}${queryString.askDone ? '&ask_done=true' : ''}`);
    window.location.reload()
  }

  const [alertText, setAlertText] = useState()
  const [alertNotiState, setAlertNotiState] = useState(false)

  const alert = (
    <div style={{display:'flex', justifyContent:'space-evenly', alignItems:'center'}}>
      <img style={{width:'40px', height:'40px', marginRight:'12px'}} src={warning} />
      <div>
        <p style={{lineHeight: '40%'}}>{alertText}</p>
        {/* <p style={{lineHeight: '40%'}}>날짜 범위를 미만 & 초과할 수 없습니다.</p> */}
      </div>
    </div>
  )


  const titleInput = (
    <input onChange={titleInputHandler} value={title} type="text" className={styles['title-input']} placeholder="제목을 입력하세요." />
  )
  
  
  
  const dateRender = (
    <div className={styles['date-title']}>
      {dateString}
    </div>
    
  )

  return (
    <div className={styles['editor-wrapper']}>
      {alertNotiState && <NotiDeliverer content={alert} stateHandler={setAlertNotiState} duration={5000} width={350} height={100} />}
      <FixedModal queryString={queryString} modalState={modalState} stateHandler={setModalState} content={<BlogPostForm postSubmitHandler={postSubmitHandler} reviewSubmitHandler={reviewSubmitHandler} forReview={props.forReview} />} noBtn={true} width={400} height={170} />
      <div className={styles['additional-info-wrapper']}>
        <div className={styles['header']}>
          {props.forReview ? dateRender : titleInput}
          {queryString.takeStep && <Button onClick={skipHandler} className={`${styles['button']} ${styles['skip-button']}`}>건너뛰기</Button>}
          {queryString.takeStep && <Button onClick={clickSubmitHandler} className={`${styles['button']}`}>다음</Button>}
          {!queryString.takeStep && <Button onClick={clickSubmitHandler} className={`${styles['button']}`}>글 작성</Button>}
          
        </div>
        
        {!props.forReview && <PostTag setTags={setTags} />}
      </div>
      <Editor
        ref={editorRef}
        language='ko-KR'
        initialValue={content || ' '} // content는 글 수정시 사용
        placeholder="내용을 입력해주세요."
        previewStyle="vertical" // 미리보기 스타일 지정
        height="100%" // 에디터 창 높이
        initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
        plugins={[colorSyntax, [codeSyntaxHighlight,{ highlighter: prism }]]}
        toolbarItems={[
          // 툴바 옵션 설정
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task', 'indent', 'outdent'],
          props.forReview ? ['table', 'link'] : ['table', 'image', 'link'],
          ['code', 'codeblock']
        ]}
        hooks={{
          addImageBlobHook: (blob, callback) => {
            uploadPhoto(blob)
            .then((res) => {
              callback(res, 'image');
              setImages((prev) => [...prev, res])
            })
          }
        }}
      ></Editor>
    
    </div>
  );
}
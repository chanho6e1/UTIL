import { useRef, useState } from 'react';
import PostTag from './PostTag';
import Button from '../UI/Button/Button';

// Toast 에디터
import { Editor } from '@toast-ui/react-editor';
import './ToastEditor.css';
import styles from './ToastEditor.module.css'

export default function ToastEditor(props) {


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
    <div className={styles['editor-wrapper']}>
      <div className={styles['additional-info-wrapper']}>
        <div className={styles['header']}>
          <input type="text" className={styles['title-input']} placeholder="제목을 입력하세요." />
          <Button className={styles['button']}>글 작성</Button>
        </div>
        
        <PostTag />
      </div>
      <Editor
        placeholder="내용을 입력해주세요."
        previewStyle="vertical" // 미리보기 스타일 지정
        height="100%" // 에디터 창 높이
        initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
        toolbarItems={[
          // 툴바 옵션 설정
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task', 'indent', 'outdent'],
          ['table', 'image', 'link'],
          ['code', 'codeblock']
        ]}
      ></Editor>

    </div>
  );
}
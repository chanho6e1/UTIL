import { useRef, useState } from 'react';
import PostTag from './PostTag';
import Button from '../UI/Button/Button';

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
  const [images, setImages] = useState([])
  const [tags, setTags] = useState([])

  return (
    <div onClick={() => console.log(tags)} className={styles['editor-wrapper']}>
      <div className={styles['additional-info-wrapper']}>
        <div className={styles['header']}>
          <input type="text" className={styles['title-input']} placeholder="제목을 입력하세요." />
          <Button className={styles['button']}>글 작성</Button>
        </div>
        
        <PostTag setTags={setTags} />
      </div>
      <Editor
        language='ko-KR'
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
          ['table', 'image', 'link'],
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
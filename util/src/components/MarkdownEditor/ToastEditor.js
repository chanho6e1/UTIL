import { useRef } from 'react';

// Toast 에디터
import { Editor } from '@toast-ui/react-editor';
import './ToastEditor.css';
import styles from './ToastEditor.module.css'

export default function ToastEditor() {

  return (
    <div className={'editor-wrapper'}>
      <div className={styles['additional-info-wrapper']}>
        <input type="text" className={styles['title-input']} placeholder="제목을 입력하세요." />

      </div>
      <Editor
        placeholder="내용을 입력해주세요."
        previewStyle="vertical" // 미리보기 스타일 지정
        height="300px" // 에디터 창 높이
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
"use client";

import { MDXEditor,
     headingsPlugin,
     UndoRedo, 
     BlockTypeSelect,
     BoldItalicUnderlineToggles, 
     toolbarPlugin,
     CodeToggle,
     DiffSourceToggleWrapper,
     ListsToggle,
     InsertTable,
     listsPlugin,
     quotePlugin,
     thematicBreakPlugin,
     markdownShortcutPlugin,
     tablePlugin,
     } from "@mdxeditor/editor";
import '@mdxeditor/editor/style.css'
import React, { useEffect,useRef } from 'react';


const Editor = ({ markdown, onUpdate }) => {
  const editorRef = useRef(null)
  useEffect(() => {
    // 延迟确保编辑器完成初始化
    const timer = setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.focus() // 手动聚焦
      }
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])
  return (
    <MDXEditor
      onChange={(e) => onUpdate(e)}
      ref={editorRef}
      autoFocus
      scrollable={true}
      markdown={markdown}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        tablePlugin(),
        toolbarPlugin({
            toolbarContents: () => (
              <>
                {' '}
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <CodeToggle/>
                <ListsToggle/>
                <InsertTable/>
                <BlockTypeSelect/>
                <DiffSourceToggleWrapper/>
              </>
            )
          })
      ]}
    />
  );
};

export default Editor;
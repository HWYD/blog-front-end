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
     codeBlockPlugin,
     defaultCodeBlockLanguage,
    //  defaultSnippetContent,
     sandpackPlugin,
     codeMirrorPlugin,
     ConditionalContents,
     InsertCodeBlock,
     InsertSandpack,
     ChangeCodeMirrorLanguage,
     ShowSandpackInfo
     } from "@mdxeditor/editor";
import '@mdxeditor/editor/style.css'
import React, { useState, useEffect,useRef,useCallback } from 'react';

const simpleSandpackConfig = {
  defaultPreset: 'react',
  presets: [
    {
      label: 'React',
      name: 'react',
      meta: 'live react',
      sandpackTemplate: 'react',
      sandpackTheme: 'light',
      snippetFileName: '/App.js',
      snippetLanguage: 'jsx',
      // initialSnippetContent: defaultSnippetContent
    }
  ]
}


const Editor = ({ content, onUpdate }) => {
  // console.log('content123',content)
  const editorRef = useRef(null)
  const [isReady, setIsReady] = useState(false)
  const initialContent = useRef(content) // 保持初始内容不变
  // 安全设置内容
  const safeSetContent = useCallback(() => {
    if (editorRef.current && isReady) {
      // console.log('设置了')
      editorRef.current.setMarkdown(initialContent.current)
    }
  }, [isReady])
   // 监听编辑器就绪状态
   useEffect(() => {
    const timer = setInterval(() => {
      if (editorRef.current) {
        setIsReady(true)
        editorRef.current.focus()
        clearInterval(timer)
      }
    }, 100)
    
    return () => clearInterval(timer)
  }, [])
 // 处理外部内容更新
 useEffect(() => {
  if (isReady && content !== initialContent.current) {
    editorRef.current?.setMarkdown(content)
    initialContent.current = content
  }
}, [content, isReady])
  
  // 初始赋值
  useEffect(() => {
    safeSetContent()
  }, [safeSetContent])

  return (
    <MDXEditor
      onChange={(e) => onUpdate(e)}
      ref={editorRef}
      autoFocus
      scrollable={true}
      markdown=""
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
        sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
        codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS',jsx: 'JavaScript (react)' } }),
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
                <ConditionalContents
                  options={[
                    { when: (editor) => editor?.editorType === 'codeblock', contents: () => <ChangeCodeMirrorLanguage /> },
                    { when: (editor) => editor?.editorType === 'sandpack', contents: () => <ShowSandpackInfo /> },
                    {
                      fallback: () => (
                        <>
                          <InsertCodeBlock />
                          {/* <InsertSandpack /> */}
                        </>
                      )
                    }
                  ]}
                />
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
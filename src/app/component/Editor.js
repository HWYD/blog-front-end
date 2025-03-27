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
     imagePlugin,
     InsertImage,
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
  const editorRef = useRef(null)
  const [isReady, setIsReady] = useState(false)
  const initialContent = useRef(content) // 保持初始内容不变
  // 安全设置内容
  const safeSetContent = useCallback(() => {
    if (editorRef.current && isReady) {
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

  async function imageUploadHandler(image) {
    const formData = new FormData()
    formData.append('image', image)
    // send the file to your server and return
    // the URL of the uploaded image in the response
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
      method: 'POST',
      body: formData
    })
    const json = (await response.json())
    return process.env.NEXT_PUBLIC_API_URL + json.url
  }

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
        // sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
        codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS',jsx: 'JavaScript (react)' } }),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        tablePlugin(),
        imagePlugin({
          imageUploadHandler,
          // imageAutocompleteSuggestions: ['https://picsum.photos/200/300', 'https://picsum.photos/200']
        }),
        toolbarPlugin({
            toolbarContents: () => (
              <>
                {' '}
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <CodeToggle/>
                <ListsToggle/>
                <InsertImage />
                <InsertTable/>
                <ConditionalContents
                  options={[
                    // { when: (editor) => editor?.editorType === 'codeblock', contents: () => <ChangeCodeMirrorLanguage /> },
                    // { when: (editor) => editor?.editorType === 'sandpack', contents: () => <ShowSandpackInfo /> },
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
                {/* <BlockTypeSelect/> */}
                <DiffSourceToggleWrapper/>
              </>
            )
          })
      ]}
    />
  );
};

export default Editor;
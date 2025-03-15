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
import React, { useEffect,useRef } from 'react';

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
        codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
        sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
        codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS' } }),
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
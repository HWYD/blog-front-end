"use client";

import { MDXEditor,
     MDXEditorMethods, 
     headingsPlugin,
     UndoRedo, 
     BlockTypeSelect,
     BoldItalicUnderlineToggles, 
     toolbarPlugin,
     CodeToggle,
     DiffSourceToggleWrapper,
     listsPlugin,
    quotePlugin,
    thematicBreakPlugin,
    markdownShortcutPlugin,
     } from "@mdxeditor/editor";
import { FC } from "react";
import '@mdxeditor/editor/style.css'



const Editor = ({ markdown, onUpdate,editorRef }) => {
  
  return (
    <MDXEditor
      onChange={(e) => onUpdate(e)}
      ref={editorRef}
      markdown={markdown}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        toolbarPlugin({
            toolbarContents: () => (
              <>
                {' '}
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <CodeToggle/>
                <DiffSourceToggleWrapper/>
              </>
            )
          })
      ]}
    />
  );
};

export default Editor;
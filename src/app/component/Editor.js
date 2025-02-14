"use client";

import { MDXEditor,
     MDXEditorMethods, 
     headingsPlugin,
     UndoRedo, 
     BoldItalicUnderlineToggles, 
     toolbarPlugin
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
        toolbarPlugin({
            toolbarContents: () => (
              <>
                {' '}
                <UndoRedo />
                <BoldItalicUnderlineToggles />
              </>
            )
          })
      ]}
    />
  );
};

export default Editor;
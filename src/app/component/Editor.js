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
     ListsToggle,
     InsertTable,
     listsPlugin,
     quotePlugin,
     thematicBreakPlugin,
     markdownShortcutPlugin,
     tablePlugin,
     } from "@mdxeditor/editor";
import '@mdxeditor/editor/style.css'


const Editor = ({ markdown, onUpdate,editorRef }) => {
  
  return (
    <MDXEditor
      onChange={(e) => onUpdate(e)}
      ref={editorRef}
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
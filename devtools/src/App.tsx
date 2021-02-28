import React, { useEffect, useMemo, useState } from "react";
import { createEditor, Node } from "slate";
import { Editable, withReact, Slate } from "slate-react";
import { SlateEditorErrorBoundry } from "./components/ErrorBoundry";
import { Devtools } from "./devtools";

export const App = () => {
  const [slateValue, setSlateValue] = useState<Node[]>(initalValue);
  const editor = useMemo(() => withReact(createEditor()), []);

  return (
    <div>
      <SlateEditorErrorBoundry>
        <div>
          <Slate editor={editor} value={slateValue}  onChange={setSlateValue}>
            <Editable spellCheck={false} />
          </Slate>
        </div>
      </SlateEditorErrorBoundry>
      <Devtools value={slateValue} editor={editor} /> 
    </div>
  );
};

  

const initalValue = [
  {
    type: "normal",
    children: [
      {
        type: "numbered-list",
        children: [
          {
            text: "NUmbered list",
          },
        ],
      },
      {
        type: "bullet-list",
        children: [
          {
            text: "bullet list",
          },
        ],
      },
    ],
  },
  {
    type: "numbered-list",
    children: [
      {
        text: "2 numberlist",
      },
    ],
  },
];

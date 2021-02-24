import React, { useMemo, useState } from "react";
import { createEditor, Node } from "slate";
import { Editable, withReact, Slate } from "slate-react";
import {Devtools} from "./devtools"


export const App = () => {
  const [slateValue, setSlateValue] = useState<Node[]>(initalValue);
  const editor = useMemo(() => withReact(createEditor()), []);

  return (
    <div>
      <div>
        <Slate editor={editor} value={slateValue} onChange={setSlateValue}>
          <Editable />
        </Slate>
      </div>
      <Devtools value={slateValue} editor={editor} />
    </div>
  );
};

const initalValue = [
  {
    type: "normal",
    children: [
      {
        type : "numbered-list",
        children : [
          {
            text : "NUmbered list"
          }
        ]
      },
      {
        type : "bullet-list",
        children : [
          {
            text : "bullete list"
          }
        ]
      }
    ],
  },
  {
    type : "numbered-list",
    children : [
      {
        text : "2 numberlist"
      }
    ]
  }
];

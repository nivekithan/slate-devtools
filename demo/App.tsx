import React, { useMemo, useState } from "react";
import { createEditor, Node, Operation, Transforms } from "slate";
import { withReact } from "slate-react";
import { Devtools } from "../slate-devtools/src/lib";
import { withHistory } from "../slate-devtools/src/plugins";
import { RichTextExample } from "./Editor";

export const App = () => {
  const [slateValue, setSlateValue] = useState<Node[]>(initialValue);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <div>
      <div>
        <RichTextExample
          editor={editor}
          setValue={setSlateValue}
          value={slateValue}
        />
      </div>
      <Devtools
        value={slateValue}
        editor={editor}
        module={{ Node, Operation, Transforms }}
      />
    </div>
  );
};

const initialValue: Node[] = [
  {
    type: "paragraph",
    children: [
      { text: "This is editable " },
      { text: "rich", bold: true },
      { text: " text, " },
      { text: "much", italic: true },
      { text: " better than a " },
      { text: "<textarea>", code: true },
      { text: "!" },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text:
          "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: "bold", bold: true },
      {
        text:
          ", or add a semantically rendered block quote in the middle of the page, like this:",
      },
    ],
  },
  {
    type: "block-quote",
    children: [{ text: "A wise quote." }],
  },
  {
    type: "paragraph",
    children: [{ text: "Try it out for yourself!" }],
  },
];

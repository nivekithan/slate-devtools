import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createEditor, Node, Operation, Transforms } from "slate";
import { Editable, withReact, Slate } from "slate-react";
import useDeepCompareEffect from "use-deep-compare-effect";
import { SlateEditorErrorBoundry } from "./components/ErrorBoundry";
import { Devtools } from "./devtools";

export const App = () => {
  const [slateValue, setSlateValue] = useState<Node[]>(initialValue);
  const editor = useMemo(() => withReact(createEditor()), []);

  return (
    <div>
      <SlateEditorErrorBoundry>
        <div>
          <Slate editor={editor} value={slateValue} onChange={setSlateValue}>
            <Editable spellCheck={false} />
          </Slate>
        </div>
      </SlateEditorErrorBoundry>
      <Devtools value={slateValue} editor={editor} module={{Node, Operation, Transforms}} />
    </div>
  );
};
const initialValue = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable ' },
      { text: 'rich', bold: true },
      { text: ' text, ' },
      { text: 'much', italic: true },
      { text: ' better than a ' },
      { text: '<textarea>', code: true },
      { text: '!' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: 'bold', bold: true },
      {
        text:
          ', or add a semantically rendered block quote in the middle of the page, like this:',
      },
    ],
  },
  {
    type: 'block-quote',
    children: [{ text: 'A wise quote.' }],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Try it out for yourself!' }],
  },
]
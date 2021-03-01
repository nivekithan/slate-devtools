import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useLayoutEffect,
} from "react";
import { createPortal } from "react-dom";
import { Node, createEditor, Operation, Range } from "slate";
import { ReactEditor, withReact } from "slate-react";

import { withDepth, withId, withIndex } from "../plugins";
import { DevSlate } from "./devSlate";
import { PropertiesEditor } from "./propertiesEditor";
import { Menu } from "./menu";
import { useUpdateAppSet } from "../atom/updateApp";
import { useUpdateDevToolsSet } from "../atom/updateDevtools";

type DevtoolsProps = {
  value: Node[]; // NodeList value to show in devtools
  editor: ReactEditor; // Corresponding editor
};

export const Devtools = ({ value, editor, }: DevtoolsProps) => {


  return createPortal(
    <div className=" bg-hex-282a36 text-white rounded flex flex-col p-5 ">
      <div>
        <Menu value={value} editor={editor} />
      </div>
      <div className="h-400px min-h-100px  p-4 flex gap-x-100px ">
        <div>
          <DevSlate value={value} editor={editor} key="devtools_editor"  />
        </div>
        <div>
          <PropertiesEditor />
        </div>
      </div>
    </div>,
    document.body
  );
};

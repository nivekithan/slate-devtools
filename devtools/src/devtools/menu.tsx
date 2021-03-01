import { computeStyles } from "@popperjs/core";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Editor, Node, Operation } from "slate";
import { ReactEditor } from "slate-react";
import { useDevEditorRead } from "../atom/devEditor";
import { useUpdateApp, useUpdateAppRead } from "../atom/updateApp";
import { useUpdateDevtools } from "../atom/updateDevtools";
import { UpdateButtons } from "./updateButtons";

type Props = {
  editor: ReactEditor;
  value: Node[];
  devValue: Node[];
};


export const Menu = ({ editor, value, devValue }: Props) => {
  return (
    <div>
      <UpdateButtons editor={editor} value={value} devValue={devValue} />
    </div>
  );
};

import React, { useEffect, useLayoutEffect, useRef } from "react";
import { Editor, Node, Operation } from "slate";
import { ReactEditor } from "slate-react";
import { useDevEditorRead } from "../atom/devEditor";
import { useUpdateAppRead } from "../atom/updateApp";
import {
  useUpdateDevtools,
  useUpdateDevToolsRead,
} from "../atom/updateDevtools";

type Props = {
  editor: ReactEditor;
  value: Node[];
};

export const Menu = ({ editor, value }: Props) => {
  const [updateDevtools, setUpdateDevtools] = useUpdateDevtools();
  const [updateApp] = useUpdateAppRead();
  const [devEditor] = useDevEditorRead();

  const appOperations = useRef<Operation[]>([]);

  useLayoutEffect(() => {
    const operations = appOperations.current;

    for (const operation of editor.operations) {
      if (operation.type === "set_selection") {
        continue;
      }

      operations.push(operation);
    }

    appOperations.current = operations;
  }, [value]);

  useEffect(() => {
    const { current } = appOperations;

    if (current.length !== 0) {
      setUpdateDevtools("on");
    } else {
      setUpdateDevtools("off");
    }
  });

  const onDevtoolsClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const operations = appOperations.current;
    Editor.withoutNormalizing(devEditor, () => {
      for (const operation of operations) {
        devEditor.apply(operation);
      }
    });
    appOperations.current = [];
    setUpdateDevtools("off");
  };

  return (
    <div className="flex gap-x-5">
      <button
        className={`grid place-items-center p-2 rounded text-sm font-semibold ${
          updateDevtools === "on"
            ? "bg-rose-500 hover:bg-rose-600"
            : "bg-gray-600"
        }`}
        onClick={onDevtoolsClick}
      >
        Update devtools
      </button>
      <button
        className={`grid place-items-center p-2 rounded text-sm font-semibold ${
          updateApp === "on" ? "bg-red-500 hover:bg-red-600" : "bg-gray-600"
        }`}
      >
        Update app
      </button>
    </div>
  );
};

import React, { useEffect, useLayoutEffect, useRef } from "react";
import { Editor, Node, Operation } from "slate";
import { ReactEditor } from "slate-react";
import { useDevEditorRead } from "../atom/devEditor";
import { useUpdateApp } from "../atom/updateApp";
import { useUpdateDevtools } from "../atom/updateDevtools";

type Props = {
  editor: ReactEditor;
  value: Node[];
  devValue: Node[];
};

let firstTime = true;

export const UpdateButtons = ({ editor, value, devValue }: Props) => {
  const [updateDevtools, setUpdateDevtools] = useUpdateDevtools();
  const [updateApp, setUpdateApp] = useUpdateApp();
  const [devEditor] = useDevEditorRead();

  const isAppUpdating = useRef<boolean>(false);
  const isDevtoolsUpdating = useRef<boolean>(false);

  const appOperations = useRef<Operation[]>([]);
  const devtoolsOperations = useRef<Operation[]>([]);

  const updateAppRef = useRef<HTMLButtonElement | null>(null);

  useLayoutEffect(() => {
    if (isAppUpdating.current) {
      isAppUpdating.current = false;
      return;
    }

    const operations = appOperations.current;

    for (const operation of editor.operations) {
      if (operation.type === "set_selection") {
        continue;
      }

      operations.push(operation);
    }

    appOperations.current = operations;
  }, [value]);

  useLayoutEffect(() => {
    if (isDevtoolsUpdating.current) {
      isDevtoolsUpdating.current = false;
      return;
    }

    const operations = devtoolsOperations.current;

    for (const operation of devEditor.operations) {
      if (operation.type === "set_selection") {
        continue;
      }

      operations.push(operation);
    }

    devtoolsOperations.current = operations;
  }, [devValue]);

  useEffect(() => {
    const { current } = appOperations;

    if (current.length !== 0) {
      setUpdateDevtools("on");
    } else {
      setUpdateDevtools("off");
    }
  });

  useEffect(() => {
    const { current } = devtoolsOperations;

    if (current.length !== 0) {
      setUpdateApp("on");
      if (firstTime) {
        updateAppRef.current?.click();
        firstTime = false;
      }
    } else {
      setUpdateApp("off");
    }
  });

  const onUpdateDevtoolsClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    isDevtoolsUpdating.current = true;

    const operations = appOperations.current;

    Editor.withoutNormalizing(devEditor, () => {
      for (const operation of operations) {
        devEditor.apply(operation);
      }
    });
    appOperations.current = [];
  };

  const onUpdateAppClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    isAppUpdating.current = true;
    const operations = devtoolsOperations.current;

    Editor.withoutNormalizing(editor, () => {
      for (const operation of operations) {
        editor.apply(operation);
      }
    });

    devtoolsOperations.current = [];
  };

  return (
    <div className="flex gap-x-5">
      <button
        className={`grid place-items-center p-2 rounded text-sm font-semibold ${
          updateDevtools === "on"
            ? "bg-rose-500 hover:bg-rose-600"
            : "bg-gray-600"
        }`}
        onClick={onUpdateDevtoolsClick}
      >
        Update devtools
      </button>
      <button
        className={`grid place-items-center p-2 rounded text-sm font-semibold ${
          updateApp === "on" ? "bg-red-500 hover:bg-red-600" : "bg-gray-600"
        }`}
        onClick={onUpdateAppClick}
        ref={updateAppRef}
      >
        Update app
      </button>
    </div>
  );
};

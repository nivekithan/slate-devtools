import React, { useEffect, useLayoutEffect, useRef } from "react";
import { Editor, Node, Operation, Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { useDevEditorRead } from "../atom/devEditor";
import { useUpdateApp } from "../atom/updateApp";
import { useUpdateDevtools } from "../atom/updateDevtools";
import { useCallOnce } from "../hooks/useCallOnce";
import { addOperations } from "../util/addOperations";
import { applyOperations } from "../util/applyOperations";
import { inverseOperations } from "../util/inverseOperations";

type Props = {
  editor: ReactEditor;
  value: Node[];
  devValue: Node[];
};

export const UpdateButtons = ({ editor, value, devValue }: Props) => {
  const [updateDevtools, setUpdateDevtools] = useUpdateDevtools();
  const [updateApp, setUpdateApp] = useUpdateApp();
  const [devEditor] = useDevEditorRead();

  const isAppUpdating = useRef<boolean>(false);
  const isDevtoolsUpdating = useRef<boolean>(false);

  const appOperations = useRef<Operation[]>([]);
  const devtoolsOperations = useRef<Operation[]>([]);

  const updateAppRef = useRef<HTMLButtonElement | null>(null);

  const clickUpdateAppButtonOnce = useCallOnce(() => {
    updateAppRef.current?.click();
  });

  useLayoutEffect(() => {
    if (isAppUpdating.current) {
      isAppUpdating.current = false;
      return;
    }

    appOperations.current = addOperations(appOperations, editor.operations);
  }, [value]);

  useLayoutEffect(() => {
    if (isDevtoolsUpdating.current) {
      isDevtoolsUpdating.current = false;
      return;
    }

    devtoolsOperations.current = addOperations(
      devtoolsOperations,
      devEditor.operations
    );
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
      clickUpdateAppButtonOnce();
    } else {
      setUpdateApp("off");
    }
  });

  const onUpdateDevtoolsClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    isDevtoolsUpdating.current = true;
    const operations: Operation[] = [];

    if (updateApp === "on") {
      for (const operation of inverseOperations(devtoolsOperations.current)) {
        operations.push(operation);
      }
      devtoolsOperations.current = [];
    }

    appOperations.current = applyOperations(
      operations.concat(appOperations.current),
      devEditor
    );
  };

  const onUpdateAppClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    isAppUpdating.current = true;
    const operations: Operation[] = [];

    if (updateDevtools === "on") {
      for (const operation of inverseOperations(appOperations.current)) {
        operations.push(operation);
      }
      appOperations.current = [];
    }

    devtoolsOperations.current = applyOperations(
      operations.concat(devtoolsOperations.current),
      editor
    );
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

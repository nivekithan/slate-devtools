import React, { useEffect, useLayoutEffect, useRef } from "react";
import { Node, Operation } from "slate";
import { ReactEditor } from "slate-react";
import { useDevEditorRead } from "../atom/devEditor";
import { useUpdateApp } from "../atom/updateApp";
import { useUpdateDevtools } from "../atom/updateDevtools";
import { useCallOnce } from "../hooks/useCallOnce";
import { addOperations } from "../util/addOperations";
import { applyOperations } from "../util/applyOperations";
import { inverseOperations } from "../util/inverseOperations";
import { Button } from "../components/button/button";
import { styled } from "../styles/stitches.config";
import { Batch } from "../util/historyEditor";
import { addBatchOperations } from "../util/addBatchOperations";
import { applyBatchOperations } from "../util/applyBatchOperations";
import { nanoid } from "nanoid";
import { inverseBatchOperations } from "../util/inverseBatchOperations";

type Props = {
  editor: ReactEditor;
  value: Node[];
  devValue: Node[];
};

export const UpdateButtons = ({ editor, value, devValue }: Props) => {
  const [updateDevtools, setUpdateDevtools] = useUpdateDevtools();
  const [updateApp, setUpdateApp] = useUpdateApp();
  const [devEditor] = useDevEditorRead();
  /**
   * isAppUpdating stores weather the app is updating after
   * clicking `Update App`
   */
  const isAppUpdating = useRef<boolean>(false);

  /**
   * isDevtoolsUpdating stores weather the devtools is updating after clicking
   * `update Devtools
   */
  const isDevtoolsUpdating = useRef<boolean>(false);

  /**
   * Stores every operation applied to app (editor)
   */
  const appOperations = useRef<Batch[]>([]);

  /**
   * stores every operation applied to devtools (devEditor)
   */
  const devtoolsOperations = useRef<Operation[]>([]);

  /**
   * Ref for the button `Update App`
   */
  const updateAppRef = useRef<HTMLButtonElement | null>(null);

  // Function runs only one time
  const clickUpdateAppButtonOnce = useCallOnce(() => {
    updateAppRef.current?.click();
  });

  /**
   * At first we will check if the operation applied to app (editor) is due to cliking `Update App` if thats the case
   * then we wont add those operation to appOperation and we set isAppUpdating to false
   *
   * IF thats not case then we will those operations to appOperations.
   *
   * Works only on useLayoutEffect not on useEffect
   */
  useLayoutEffect(() => {
    if (isAppUpdating.current) {
      isAppUpdating.current = false;
      return;
    }

    appOperations.current = addBatchOperations(
      appOperations,
      editor.operations,
      {
        location: "App",
        normalizing: false,
      }
    );
  }, [value, editor.operations]);

  /**
   * At first we will check if the operation applied to devtools (devEditor) is due to clicking `update devtools` if thats the case
   * then we wont add those operation to devtoolsOperation and we set isDevtoolsUpdating to false
   *
   * If thats not the case then we will add those operations to devtoolsOperations
   *
   * Works only on useLayoutEffect not on useEffect
   */
  useLayoutEffect(() => {
    if (isDevtoolsUpdating.current) {
      isDevtoolsUpdating.current = false;
      return;
    }

    devtoolsOperations.current = addOperations(
      devtoolsOperations,
      devEditor.operations
    );
  }, [devValue, devEditor.operations]);

  /**
   * We will check if appOperations is empty if thats the case then we will set
   * `Update Devtools ` to "off" and if thats not case then we will set `Update Devtools`
   * to "on"
   */
  useEffect(() => {
    const { current } = appOperations;
    console.log(current);
    if (current.length !== 0 && updateDevtools !== "on") {
      setUpdateDevtools("on");
    } else if (current.length === 0 && updateDevtools !== "off") {
      setUpdateDevtools("off");
    }
  });

  /**
   * We will check if devtoolsOperations is empty if thats the case then we will set `Update App`
   * to "off" and if thats not case then we will set `Update App` to "on"
   */
  useEffect(() => {
    const { current } = devtoolsOperations;

    if (current.length !== 0 && updateApp !== "on") {
      setUpdateApp("on");
      clickUpdateAppButtonOnce();
    } else if (current.length === 0 && updateApp !== "off") {
      setUpdateApp("off");
    }
  });

  /**
   * At first we will set isDevtoolsUpdating to true
   *
   * Then we will check if updateApp is "on" this means that user has applied some
   * operation to devtools but before syncing that opeartion with app the user also applied some operation
   * to app.
   *
   * As a result we have reverse those changes to devtools before updating the devtools
   *
   */

  const onUpdateDevtoolsClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    isDevtoolsUpdating.current = true;
    const operations: Batch[] = [];

    if (updateApp === "on") {
      const inverseOperation: Batch = {
        data: [],
        id: nanoid(),
        location: "Devtools",
        normalizing: false,
      };
      for (const operation of inverseOperations(devtoolsOperations.current)) {
        inverseOperation.data.push(operation);
      }
      devtoolsOperations.current = [];

      if (inverseOperation.data.length !== 0) {
        operations.push(inverseOperation);
      }
    }

    appOperations.current = applyBatchOperations(
      operations.concat(appOperations.current),
      devEditor
    );
  };

  /**
   * At first we will set isAppUpdating to true
   *
   * Then we will check if updateDevtools is "on" this means that user has applied some
   * operation to app but before syncing that opeartion with devtools the user also applied some operation
   * to devtools.
   *
   * As a result we have reverse those changes to app before updating the app
   *
   */

  const onUpdateAppClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    isAppUpdating.current = true;
    const operations: Operation[] = [];

    if (updateDevtools === "on") {
      for (const operation of inverseBatchOperations(appOperations.current)) {
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
    <StyledUpdateButtons>
      <Button
        color={updateDevtools === "on" ? "rose" : "gray"}
        onClick={onUpdateDevtoolsClick}
      >
        Update Devtools
      </Button>
      <Button
        color={updateApp === "on" ? "rose" : "gray"}
        onClick={onUpdateAppClick}
        ref={updateAppRef}
      >
        Update App
      </Button>
    </StyledUpdateButtons>
  );
};

const StyledUpdateButtons = styled("div", {
  $reset: "",
  display: "flex",
  columnGap: "1.25rem",
  fontSize: "0.75rem",
});

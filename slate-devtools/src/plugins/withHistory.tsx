import { Editor, Operation, Path } from "slate";
import { Batch } from "../util/batch";
import { DTOperation } from "../util/dtOperation";
import { HistoryEditor, runOptions } from "../util/historyEditor";

/**
 * My plan to interact with this api is to directly change the value like
 *
 * editor.shouldNormalize = false
 * editor.apply(someOperation)
 *
 * I am not sure weather it is okay to that but since its working, I am not planning to change it
 * but you do know for the fact that interacting like that will lead to some problems open an issue or an
 * pr with the correct way
 *
 */

export const withHistory = <T extends Editor>(editor: T) => {
  const e = editor as T & HistoryEditor;
  const { apply, normalizeNode } = e;
  e.history = []; // Stores the history
  e.shouldSave = true; // Says weather we should save the operations to history
  e.isNormalizing = false; // Says weather an operation is due to normalizing
  e.shouldNormalize = true; // Says weather we should normalize after that operation
  e.from = undefined; // Stores the current state in History
  e.dontMerge = false;

  e.normalizeNode = (entry) => {
    if (e.shouldNormalize) {
      e.isNormalizing = true;
      normalizeNode(entry);
      e.isNormalizing = false;
    }
  };

  e.apply = (op: Operation, options: runOptions = {}) => {
    const { shouldNormalize = true, location = "Devtools" } = options;
    /**
     * We dont record set_selection operation so if the operation is set_selection we will
     * just apply it
     */

    e.shouldNormalize = shouldNormalize;
    if (op.type === "set_selection") {
      return apply(op);
    }
    /**
     * When user gone to previous state in RenderHistory and then the user applied some operation
     * then we have to remove the operation from the previous state (not including) to last state (including)
     *
     */

    const { from, shouldSave } = e;
    if (!shouldSave) {
      return apply(op);
    }
    const _lastBatch = e.history[e.history.length - 1] as Batch | undefined;
    const _lastOp = _lastBatch && _lastBatch.ops[_lastBatch.ops.length - 1];
    /**
     * We are checking if there is no from or no _lastOp or from is _lastOp in that case
     * the user is correct state and we dont have to remove anything
     *
     * if thats not case then we will remove
     */

    if (
      !from ||
      !_lastOp ||
      (from[0] === _lastOp.operation[0] && from[1] === _lastOp.operation[1])
    ) {
      //
    } else {
      e.history = HistoryEditor.giveTill(e, from);
    }

    const { operations, history, isNormalizing } = e;

    /**
     * Most of the code below is copied from slate-history there are 
     * some additions to code
     * 
    
     */

    const lastBatch = history[history.length - 1] as Batch | undefined;
    const lastOp = lastBatch && lastBatch.ops[lastBatch.ops.length - 1];
    let merge = false;

    if (!e.dontMerge) {
      if (!lastBatch) {
        merge = false;
      } else if (lastBatch.normalizing !== isNormalizing) {
        /**
         * If the lastBatch normalizing is not equal to current isNormalizing then
         * we wont merge those operations
         */

        merge = false;
      } else if (operations.length !== 0) {
        merge = true;
      } else {
        merge = shouldMerge(op, lastOp?.operation);
      }
    }

    if (lastBatch && merge) {
      lastBatch.ops.push(new DTOperation(op));
    } else {
      /**
       * We create unqiue id so that we can pass a key when rendering a
       * list of batches
       */

      const batch = new Batch([new DTOperation(op)], {
        normalizing: isNormalizing,
        location,
      });

      history.push(batch);
    }

    if (history.length > 100) {
      history.shift();
    }
    /**
     * After every single operation we set the from to the last
     * operation
     */

    e.from = [
      e.history.length - 1,
      e.history[e.history.length - 1].ops.length - 1,
    ];

    return apply(op);
  };
  return e;
};
/**
 * Copied from slate-history
 */

export const shouldMerge = (
  op: Operation,
  prev: Operation | undefined
): boolean => {
  if (
    prev &&
    op.type === "insert_text" &&
    prev.type === "insert_text" &&
    op.offset === prev.offset + prev.text.length &&
    Path.equals(op.path, prev.path)
  ) {
    return true;
  }

  if (
    prev &&
    op.type === "remove_text" &&
    prev.type === "remove_text" &&
    op.offset + op.text.length === prev.offset &&
    Path.equals(op.path, prev.path)
  ) {
    return true;
  }

  return false;
};

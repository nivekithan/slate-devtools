import { Editor, Operation } from "slate";

export type Batch = {
  normalizing: boolean;
  data: Operation[];
  id: string;
};

export type HistoryEditor = {
  history: Batch[] ;
  isNormalizing: boolean;
  shouldSave: boolean;
  shouldNormalize: boolean;
  apply: (op: Operation, shouldNormalize: boolean) => void;
  from : [number, number] | undefined
};

type Location = [number, number];

type HistoryOptions = {
  from: Location;
  to: Location;
  mode?: "top-bottom" | "bottom-top" | "auto";
  match?: (loc: Location, op: Operation) => boolean;
  considerFrom?: boolean;
  considerTo?: boolean;
};

export const HistoryEditor = {
  withoutSave(editor: HistoryEditor, callback: () => unknown) {
    editor.shouldSave = false;
    callback();
    editor.shouldSave = true;
  },

  *operations(editor: HistoryEditor, options: HistoryOptions) {
    const { history } = editor;
    const {
      from: [fromBatch, fromOp],
      to: [toBatch, toOp],
      considerFrom = true,
      considerTo = false,
    } = options;

    let { mode = "auto", match = () => true } = options;

    if (mode === "auto") {
      if (fromBatch > toBatch) {
        mode = "bottom-top";
      } else if (fromBatch < toBatch) {
        mode = "top-bottom";
      }
    }

    const hightToLow = fromBatch < toBatch;
    const topToBottom = mode === "top-bottom";

    try {
      for (
        let i = fromBatch;
        hightToLow ? i <= toBatch : i >= toBatch;
        hightToLow ? i++ : i--
      ) {
        const operations = history[i].data;

        let j;
        for (
          topToBottom ? (j = 0) : (j = operations.length - 1);
          topToBottom ? j < operations.length : j >= 0;
          topToBottom ? j++ : j--
        ) {
          if (i === fromBatch) {
            if (!operations[fromOp]) {
              throw new Error(
                "Either from or to is not valid" +
                  JSON.stringify({
                    from: [fromBatch, fromOp],
                    to: [toBatch, toOp],
                  })
              );
            }

            if (topToBottom) {
              if (considerFrom ? j < fromOp : j <= fromOp) {
                continue;
              }
            } else {
              if (considerFrom ? j > fromOp : j >= fromOp) {
                continue;
              }
            }
          }

          if (i === toBatch) {
            if (!operations[toOp]) {
              throw new Error(
                "Either from or to is not valid" +
                  JSON.stringify({
                    from: [fromBatch, fromOp],
                    to: [toBatch, toOp],
                  })
              );
            }

            if (topToBottom) {
              if (considerTo ? j > toOp : j >= toOp) {
                break;
              }
            } else {
              if (considerTo ? j < toOp : j <= toOp) {
                break;
              }
            }
          }

          const operation = operations[j];

          if (operation) {
            if (match([i, j], operation)) {
              yield operation;
            }
          } else {
            throw new Error(
              "Either from or to is not valid" +
                JSON.stringify({
                  from: [fromBatch, fromOp],
                  to: [toBatch, toOp],
                })
            );
          }
        }
      }
    } catch (err) {
      throw new Error(
        "Either from or to is not valid" +
          JSON.stringify({
            from: [fromBatch, fromOp],
            to: [toBatch, toOp],
          })
      );
    }
  },

  *inverseOperations(editor: HistoryEditor, options: HistoryOptions) {
    for (const operation of this.operations(editor, options)) {
      yield Operation.inverse(operation);
    }
  },

  apply(
    editor: HistoryEditor & Editor,
    from: [number, number],
    to: [number, number]
  ) {
    const { history } = editor;
    const [fromBatch, fromOp] = from;
    const [toBatch, toOp] = to;

    if (
      !history[fromBatch] ||
      !history[fromBatch].data[fromOp] ||
      !history[toBatch] ||
      !history[toBatch].data[toOp]
    ) {
      throw new Error(
        "Either from or to is not valid" +
          JSON.stringify({
            from: [fromBatch, fromOp],
            to: [toBatch, toOp],
          })
      );
    }

    const inverse =
      fromBatch > toBatch || (fromBatch === toBatch && fromOp > toOp);

    if (inverse) {
      this.withoutSave(editor, () => {
        Editor.withoutNormalizing(editor, () => {
          for (const operation of this.inverseOperations(editor, {
            from,
            to,
            mode: "bottom-top",
            considerFrom: true,
            considerTo: false,
          })) {
            editor.apply(operation, false);
          }
        });
      });
    } else {
      this.withoutSave(editor, () => {
        Editor.withoutNormalizing(editor, () => {
          for (const operations of this.operations(editor, {
            from,
            to,
            mode: "top-bottom",
            considerFrom: false,
            considerTo: true,
          })) {
            editor.apply(operations, false);
          }
        });
      });
    }
  },

  giveTill(editor: HistoryEditor, till: [number, number]): Batch[] {
    const { history } = editor;

    if (!history[till[0]] || !history[till[0]].data[till[1]]) {
      throw new Error("The till is not valid: " + JSON.stringify(till));
    }

    const sliceBatch = history.slice(0, till[0] + 1);
    const lastBatch = sliceBatch[sliceBatch.length - 1];
    const correctLastBatch = {
      ...lastBatch,
      data: lastBatch.data.slice(0, till[1] + 1),
    };

    sliceBatch.pop();
    sliceBatch.push(correctLastBatch);

    return sliceBatch;
  },

  isHistoryEditor(editor: any): editor is HistoryEditor {
    const { history } = editor;

    if (history) {
      return true;
    } else {
      return false;
    }
  },
};

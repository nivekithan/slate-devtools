import { Editor } from "slate";

type Module = {
  [index: string]: unknown;
};

export const exceute = (
  callbackString: string,
  module: Module,
  editor: Editor,
  devEditor: Editor
): boolean => {
  const importModule = Object.keys(module).join(" ,");
  const fn = new Function(`return (module, editor, devEditor) => {
        const { ${importModule} } = module;

        ${callbackString}
    }`)();
  try {
    fn(module, editor, devEditor);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

import { Editor } from "slate";

type Module = {
  [index: string]: unknown;
};

/**
 * Function will exceute the code in string type. If the code run without any error
 * then it will true or else it will return false
 *
 * The code can access the object passed through module by its key name and it can alse access
 * the editor (of App) and devEditor (of devtools) by their names
 */

export const exceute = (
  callbackString: string,
  module: Module,
  editor: Editor,
  devEditor: Editor
): boolean => {
  /**
   * We will be taking advantage of javscripts destructure syntax to make
   * objects in exceute accessible to code
   */

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

import { DevtoolsEditor } from "../plugins/withDevtools";

export const isDevtoolsEditor = (editor: any): editor is DevtoolsEditor => {
  return (
    !!(editor as DevtoolsEditor).devtools_history &&
    !!(editor as DevtoolsEditor).devtools_reset &&
    !!(editor as DevtoolsEditor).devtools_run
  );
};

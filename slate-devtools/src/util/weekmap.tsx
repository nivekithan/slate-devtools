import { Editor } from "slate";

export const editor_to_isNormalizing = new WeakMap<Editor, boolean>();
export const editor_to_shouldNormalize = new WeakMap<Editor, boolean>();
export const dont_update_app_operations = new WeakMap<Editor, boolean>();
export const dont_save_to_history = new WeakMap<Editor, boolean>();

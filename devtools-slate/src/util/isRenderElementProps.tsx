import { RenderElementProps, RenderLeafProps } from "slate-react";

export const isRenderElementProps = (
  value: RenderElementProps | RenderLeafProps
): value is RenderElementProps => {
  if ((value as RenderElementProps).element) {
    return true;
  } else {
    return false;
  }
};

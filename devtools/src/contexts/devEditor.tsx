import React, { createContext, ReactNode, useContext } from "react";
import { ReactEditor } from "slate-react";

const devEditor = createContext<ReactEditor | null>(null);

type Props = {
  value: ReactEditor;
  children: ReactNode;
};

export const DevEditorProvider = ({ value, children }: Props) => {
  return <devEditor.Provider value={value}>{children}</devEditor.Provider>;
};


export const useDevEditor = () => {
    const context = useContext(devEditor);

    if (!context) {
        throw new Error("Render the element inside DevEditorProvider")
    }

    return context
}
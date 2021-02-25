import React, { ReactNode, useContext } from "react";
import { Node, Path } from "slate";

export type SelectedProperties = {
  node: Node,
  path: Path;
};

type SetSelectedProperties = (
  state: ((s: SelectedProperties) => SelectedProperties) | SelectedProperties
) => void;

const SelectedProperties = React.createContext<SelectedProperties | undefined>(
  undefined
);
const SetSelectedProperties = React.createContext<
  SetSelectedProperties | undefined
>(undefined);

type SelectedPropertiesProvider = {
  children: ReactNode;
  value: SelectedProperties;
  dispatch: SetSelectedProperties;
};

export const SelectedPropertiesProvider = ({
  children,
  dispatch,
  value,
}: SelectedPropertiesProvider) => {
  return (
    <SelectedProperties.Provider value={value}>
      <SetSelectedProperties.Provider value={dispatch}>
        {children}
      </SetSelectedProperties.Provider>
    </SelectedProperties.Provider>
  );
};

export const useSelectedProperties = () => {
  const context = useContext(SelectedProperties);

  if (!context) {
    throw new Error(
      "The element should be rendered inside SelectedPropertiesProvider"
    );
  } else {
    return context;
  }
};

export const useSetSelectedProperties = () => {
  const context = useContext(SetSelectedProperties);

  if (!context) {
    throw new Error(
      "The element should be rendered inside SelectedPropertiesProvider"
    );
  } else {
    return context;
  }
};

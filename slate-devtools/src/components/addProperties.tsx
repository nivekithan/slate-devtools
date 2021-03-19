import React, { useState } from "react";
import { AddPropertiesModal } from "./addPropertiesModal";
import { useToggleOnClick } from "../hooks/useToggleOnClick";
import { PlainButton } from "./button";

export const AddProperties = () => {
  const [
    plusButtonElement,
    setplusButtonElement,
  ] = useState<HTMLButtonElement | null>(null);

  const [
    showModal,
    onClickToggleModal,
    setShowModal,
  ] = useToggleOnClick<HTMLButtonElement>(false);

  return (
    <div>
      <PlainButton
        onClick={onClickToggleModal}
        ref={setplusButtonElement}
        data-cy-component="AddProperties"
      >
        +
      </PlainButton>
      {showModal ? (
        <AddPropertiesModal
          setShowModal={setShowModal}
          referenceElement={plusButtonElement}
        />
      ) : null}
    </div>
  );
};

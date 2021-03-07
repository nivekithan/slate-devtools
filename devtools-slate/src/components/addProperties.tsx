import React, { Fragment, useState } from "react";
import { AddPropertiesModal } from "./addPropertiesModal";
import { useToggleOnClick } from "../hooks/useToggleOnClick";

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
    <Fragment>
      <div className="flex justify-end bg-hex-282a36 ">
        <button onClick={onClickToggleModal} ref={setplusButtonElement}>
          +
        </button>
      </div>
      {showModal ? (
        <AddPropertiesModal
          setShowModal={setShowModal}
          referenceElement={plusButtonElement}
        />
      ) : null}
    </Fragment>
  );
};

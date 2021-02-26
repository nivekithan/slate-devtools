import React, { Fragment, useState } from "react";
import { useOuterClick } from "../hooks/useOuterClick";
import { AddPropertiesModal } from "./addPropertiesModal";

export const AddProperties = () => {
  const [
    referenceElement,
    setReferenceElement,
  ] = useState<HTMLButtonElement | null>(null);

  const [showModal, setShowModal] = useState<boolean>(false);

  const onPlusClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setShowModal(true);
  };

  const onOutsideClick = (e: MouseEvent) => {
    setShowModal(false);
  };

  const ParentModal = ({ children }: { children: React.ReactNode }) => {
    const ref = useOuterClick<HTMLDivElement>(onOutsideClick);

    return <div ref={ref}>{children}</div>;
  };

  return (
    <Fragment>
      <div className="flex justify-end">
        <button onClick={onPlusClick} ref={setReferenceElement}>
          +
        </button>
      </div>
      {showModal ? (
        <AddPropertiesModal
          referenceElement={referenceElement}
          ParentModal={ParentModal}
        />
      ) : null}
    </Fragment>
  );
};

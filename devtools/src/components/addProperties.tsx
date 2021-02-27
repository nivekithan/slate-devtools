import React, { Fragment, useState } from "react";
import { useOuterClick } from "../hooks/useOuterClick";
import { AddPropertiesModal } from "./addPropertiesModal";
import { usePopper } from "react-popper";

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

  const ParentModal = ({ children }: { children: React.ReactNode }) => {
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
      null
    );

    const { styles, attributes } = usePopper(referenceElement, popperElement);

    return (
      <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
        {children}
      </div>
    );
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
          ParentModal={ParentModal}
          setShowModal={setShowModal}
        />
      ) : null}
    </Fragment>
  );
};

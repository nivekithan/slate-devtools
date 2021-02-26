import React, { useState } from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";

type Props = {
  referenceElement: HTMLElement | null;
  ParentModal: ({ children }: { children: React.ReactNode }) => JSX.Element;
};

export const AddPropertiesModal = ({
  referenceElement,
  ParentModal,
}: Props) => {
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );

  const { styles, attributes } = usePopper(referenceElement, popperElement);

  return createPortal(
    <ParentModal>
      <div
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        className="text-white"
      >
        I am here
      </div>
    </ParentModal>,
    document.body
  );
};

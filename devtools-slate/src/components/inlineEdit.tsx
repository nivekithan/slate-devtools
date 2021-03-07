import { useEffect, useRef } from "react";
import React from "react";

/**
 * TODO:
 *
 * [ ] Instead of having two compoents span and input there should be only one component input when it is not focussed the background color will
 *     transperent and when it is foccussed the bg the color changes
 * [ ] Outline on input is rendering weird dont know why, have to figure it out
 */

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  spanProps?: React.HTMLAttributes<HTMLSpanElement>;
  isEditing: boolean;
};

export const InlineEdit = ({
  value,
  onChange,
  spanProps,
  isEditing,
  ...inputProps
}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const foucsInput = () => {
    const { current } = inputRef;

    if (!current) return;

    current.focus();
  };

  useEffect(() => {
    foucsInput();
  }, [isEditing]);

  return isEditing ? (
    <div className="flex gap-x-3">
      <input
        className="outline-none bg-hex-0F0F0F bg-opacity-30 px-2  rounded"
        {...inputProps}
        value={value}
        onChange={onChange}
        ref={inputRef}
      />
    </div>
  ) : (
    <span {...spanProps} className="px-2">
      {value}
    </span>
  );
};

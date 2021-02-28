import React from "react";

type Props = {
  devtools: "yes" | "no";
  app: "yes" | "no";
  onDevtoolsClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onAppClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const Menu = ({ devtools, app, onDevtoolsClick, onAppClick }: Props) => {
  return (
    <div className="flex gap-x-5">
      <button
        className={`grid place-items-center p-2 rounded text-sm font-semibold ${
          devtools === "yes" ? "bg-rose-500 hover:bg-rose-600" : "bg-gray-600"
        }`}
        onClick={onDevtoolsClick}
      >
        Update devtools
      </button>
      <button
        className={`grid place-items-center p-2 rounded text-sm font-semibold ${
          app === "yes" ? "bg-red-500 hover:bg-red-600" : "bg-gray-600"
        }`}
        onClick={onAppClick}
      >
        Update app
      </button>
    </div>
  );
};

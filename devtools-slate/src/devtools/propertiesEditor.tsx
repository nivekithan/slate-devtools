import React from "react";
import { SingleProperty } from "../components/singleProperty";
import { AddProperties } from "../components/addProperties";
import { useSelectedPropertiesRead } from "../atom/selectedProperties";

export const PropertiesEditor = () => {
  const [{ node }] = useSelectedPropertiesRead();

  return (
    <div className="flex flex-col gap-y-4 text-sm p-2 max-h-320px ">
      <AddProperties />
      <div>
        {Object.keys(node).map((keys) => {
          const result = keys.match(/devtools_/);

          if (result) {
            return null;
          } else {
            const value = JSON.stringify(node[keys]);

            return (
              <SingleProperty
                keys={keys}
                value={value}
                key={`${node.devtools_id}_${keys}`}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

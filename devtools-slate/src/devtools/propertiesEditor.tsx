import React from "react";
import { SingleProperty } from "../components/singleProperty";
import { AddProperties } from "../components/addProperties";
import { useSelectedPropertiesRead } from "../atom/selectedProperties";
import { Resizable } from "../components/resizable";

export const PropertiesEditor = () => {
  const [{ node }] = useSelectedPropertiesRead();

  return (
    <Resizable width="400px">
      <div className="flex flex-col gap-y-4 text-sm p-2 max-h-320px ml-5 ">
        <AddProperties />
        <div>
          {Object.keys(node).map((keys) => {
            /**
             * If the result matched the /devtools_/ then that property
             * is created by our plugin not by them so we should
             * not render those properties
             */

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
    </Resizable>
  );
};

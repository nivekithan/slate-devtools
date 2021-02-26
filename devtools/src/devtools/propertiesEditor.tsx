import { useSelectedProperties } from "../contexts/selectedProperties";
import React from "react";
import { SingleProperty } from "../components/singleProperty";
import { AddProperties } from "../components/addProperties";

type Props = {};

export const PropertiesEditor = ({}: Props) => {
  const { node, path } = useSelectedProperties();

  return (
    <div className="flex flex-col gap-y-4">
      <AddProperties />
      <div>
        {Object.keys(node).map((keys, i) => {
          const result = keys.match(/devtools_/);

          if (result) {
            return null;
          } else {
            return (
              <SingleProperty
                keys={keys}
                value={JSON.stringify(node[keys])}
                key={`${node.devtools_id}_${keys}`}
              />
            );
          }
        })}
      </div>
    </div>
  );
};
import React from "react";
import { Meta, Story } from "@storybook/react";
import { RenderBatch, RenderBranchProps } from "./renderBatch";

export default {
  title: "Component/Batch",
  component: RenderBatch,
} as Meta;

const Template: Story<RenderBranchProps> = (props) => (
  <div style={{ color: "white" }}>
    <RenderBatch {...props} />
  </div>
);

export const Operation = Template.bind({});
Operation.args = {
  num: 1,
  batch: {
    data: [
      {
        node: {
          children: [],
        },
        path: [0, 3, 2],
        offset: 0,
        type: "insert_node",
      },
    ],
    id: "34534232",
    normalizing: false,
  },
};

export const Normalizing = Template.bind({});
Normalizing.args = {
  ...Operation.args,
  batch: {
    ...(Operation.args.batch as any),
    normalizing: true,
  },
};

import React from "react";
import { Meta, Story } from "@storybook/react";
import {
  RenderDetailedOperation,
  RenderDetailedOperationProps,
} from "./renderDetailedOperation";

export default {
  title: "Component",
  component: RenderDetailedOperation,
} as Meta;

const Template: Story<RenderDetailedOperationProps> = (props) => (
  <div style={{ width: "300px", color: "white" }}>
    <RenderDetailedOperation {...props} />
  </div>
);

export const SetNode = Template.bind({});
SetNode.args = {
  op: {
    type: "set_node",
    newProperties: {
      new: 24,
      text: "435",
    },
    path: [4, 6, 4],
    properties: {
      new: 32,
      text: "32",
    },
  },
};

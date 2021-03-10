import React from "react";
import { Meta, Story } from "@storybook/react";
import { RenderPath, RenderPathProps } from "./renderPath";
import { GreenLabel } from "../greenLabel";
import { css } from "../../styles/stitches.config";

export default {
  title: "Component/Path",
  component: RenderPath,
} as Meta;

const Template: Story<RenderPathProps> = (props) => <RenderPath {...props} />;
const WithText: Story<RenderPathProps> = (props) => (
  <div
    className={css({
      $flex: "",
      columnGap: "0.5rem",
    })()}
  >
    <GreenLabel>Search by path: </GreenLabel>
    <RenderPath {...props} />
  </div>
);

export const JustPath = Template.bind({});
JustPath.args = {
  path: [3, 4, 6],
};

export const WithLabel = WithText.bind({});
WithLabel.args = {
  path: [4, 3, 5],
};

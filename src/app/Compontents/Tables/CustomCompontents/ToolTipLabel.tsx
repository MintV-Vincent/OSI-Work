import { Tooltip } from "@mantine/core";
import React from "react";
interface toolTipInterface {
  formula: string;
  price: number;
}

export default function ToolTipLabel({
  formula,
  price,
}: toolTipInterface): React.JSX.Element {
  return (
    <Tooltip
      multiline
      withArrow
      label={formula}
      transitionProps={{ duration: 200 }}
    >
      <label>{price.toFixed(2)}</label>
    </Tooltip>
  );
}

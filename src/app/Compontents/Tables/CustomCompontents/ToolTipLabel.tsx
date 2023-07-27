import { Tooltip } from "@mantine/core";
import React from "react";
interface toolTipInterface {
  formula: string;
  amount: number;
  unitPrice: number;
  id: number;
  useRowsAtom: any;
  rowsAtom: any;
}

export default function ToolTipLabel({
  formula,
  amount,
  unitPrice,
}: toolTipInterface): React.JSX.Element {
  return (
    <Tooltip
      multiline
      withArrow
      label={formula}
      transitionProps={{ duration: 200 }}
    >
      <label>{Number(amount * unitPrice).toFixed(2)}</label>
    </Tooltip>
  );
}

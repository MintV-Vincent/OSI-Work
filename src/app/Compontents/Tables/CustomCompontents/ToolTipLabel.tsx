import { Tooltip } from "@mantine/core";
import { createFormula } from "Functions/Create/CreateFormula";
import { materialRowMap } from "Library/Types";
import React, { useEffect } from "react";
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
  id,
  rowsAtom,
  useRowsAtom,
}: toolTipInterface): React.JSX.Element {
  let price = eval(createFormula(formula, unitPrice * amount));

  if (price == undefined) {
    price = 0;
  }

  useEffect(() => {
    useRowsAtom(
      rowsAtom.map((row: materialRowMap) => {
        if (row.id != id) {
          return row;
        }
        return {
          ...row,
          price: price,
        };
      })
    );
  }, [price]);

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

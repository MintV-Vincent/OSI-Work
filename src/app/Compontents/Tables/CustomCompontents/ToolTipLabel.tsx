import { Tooltip } from "@mantine/core";
import { createFormula } from "Functions/CreateFormula";
import { materialRowMap } from "Interface/Types";
import React, { useEffect } from "react";

interface toolTipInterface {
  formula: string;
  unitPrice: number;
  amount: number;
  id: any;
  rowsAtom: any;
  useRowsAtom: any;
}

export default function ToolTipLabel({
  formula,
  unitPrice,
  amount,
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
      <label>{(price ? price : 0).toFixed(2)}</label>
    </Tooltip>
  );
}

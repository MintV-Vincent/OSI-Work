import { NumberInput } from "@mantine/core";
import { createFormula } from "Functions/Create/CreateFormula";
import {
  exchangeRateAtom,
  freightAtom,
  marginAtom,
  panelAtom,
  yeildAtom,
} from "Library/Atoms/AtomStorage";
import { materialRowMap } from "Library/Types";
import { useAtom } from "jotai";
import React from "react";

interface AmountInputInterface {
  id: number;
  currentAmount: number | "";
  unitPrice: number;
  rowsAtom: materialRowMap[];
  useRowsAtom: any;
}

export default function AmountInput({
  id,
  currentAmount,
  unitPrice,
  rowsAtom,
  useRowsAtom,
}: AmountInputInterface) {
  const [exchangeRate] = useAtom(exchangeRateAtom);
  const [freight] = useAtom(freightAtom);
  const [panel] = useAtom(panelAtom);
  const [yeild] = useAtom(yeildAtom);
  const [margin] = useAtom(marginAtom);

  function onAmount(
    id: number,
    value: number | "",
    unitPrice: number,
    rowsAtom: materialRowMap[],
    useRowsAtom: any
  ): materialRowMap {
    // Function activates when text input of amount is changed. This will change the price and the amount of materials for rowsAtom

    // id: Number, the index of the row being changed
    // value: The amount being changed to for the material
    // price: The sub total of the materials cost in CAD dollars
    // rowsAtom: the data being changed
    // useRowsAtom: the set state functoin to change the data

    // Returns: material row map for the table with updated amount and price
    return useRowsAtom(
      rowsAtom.map((row: materialRowMap) => {
        if (row.id != id) {
          return row;
        }
        if (value === "") {
          return { ...row, amount: "", price: 0 };
        }
        let price = eval(
          createFormula(
            row.formula,
            unitPrice * value,
            exchangeRate,
            freight,
            panel,
            yeild,
            margin
          )
        );
        return {
          ...row,
          amount: Number(value),
          price: Number(price),
        };
      })
    );
  }

  return (
    <NumberInput
      hideControls
      value={currentAmount}
      precision={2}
      onChange={(event: number) => {
        onAmount(id, event, unitPrice, rowsAtom, useRowsAtom);
      }}
    />
  );
}

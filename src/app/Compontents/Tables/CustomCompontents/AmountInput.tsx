import { NumberInput } from "@mantine/core";
import { createFormula } from "Functions/Create/CreateFormula";
import {
  exchangeRateAtom,
  freightAtom,
  marginAtom,
  panelAtom,
  yeildAtom,
} from "Library/Atoms/AtomStorage";
import { percision } from "Library/ConstantValues";
import { materialRowMap } from "Library/Types";
import { useAtom } from "jotai";
import React from "react";

interface AmountInputInterface {
  id: number;
  currentAmount: number | "";
  unitPrice: number;
  data: materialRowMap[];
  setData: any;
}

export default function AmountInput({
  id,
  currentAmount,
  unitPrice,
  data,
  setData,
}: AmountInputInterface) {
  const [exchangeRate] = useAtom(exchangeRateAtom);
  const [freight] = useAtom(freightAtom);
  const [panel] = useAtom(panelAtom);
  const [yeild] = useAtom(yeildAtom);
  const [margin] = useAtom(marginAtom);

  /**
   *
   * @param id Number, the index of the row being changed
   * @param value The amount being changed to for the material
   * @param unitPrice The sub total of the materials cost in CAD dollars
   * @param data the data being changed
   * @param setData the set state functoin to change the data of the current row
   * @returns material row map for the table with updated amount and price
   */
  function onAmount(
    id: number,
    value: number | "",
    unitPrice: number,
    data: materialRowMap[],
    setData: any
  ): materialRowMap {
    return setData(
      data.map((row: materialRowMap) => {
        if (row.id != id) {
          return row;
        }
        if (value === "") {
          return { ...row, amount: "", price: 0 };
        }
        let price = eval(
          createFormula(
            row.formula,
            value,
            row.unitPrice,
            exchangeRate,
            freight,
            panel,
            yeild,
            margin
          )
        );
        return {
          ...row,
          amount: value,
          price: price,
        };
      })
    );
  }

  return (
    <NumberInput
      size="xs"
      hideControls
      value={currentAmount}
      precision={percision}
      onChange={(event: number) => {
        onAmount(id, event, unitPrice, data, setData);
      }}
    />
  );
}

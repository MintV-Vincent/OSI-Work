import { NumberInput } from "@mantine/core";
import { createFormula } from "Functions/Create/CreateFormula";
import {
  exchangeRateAtom,
  exchangeRateMaterialAtom,
  freightAtom,
  marginAtom,
  panelAtom,
  yeildAtom,
} from "Library/Atoms/AtomStorage";
import { percision } from "Library/ConstantValues";
import { materialRowMap, rowMapPrice } from "Library/Types";
import { useAtom } from "jotai";
import React from "react";

interface AmountInputInterface {
  id: number;
  currentAmount: number | "";
  data: materialRowMap[];
  setData: any;
}

export default function AmountInput({
  id,
  currentAmount,
  data,
  setData,
}: AmountInputInterface) {
  const [exchangeRate] = useAtom(exchangeRateMaterialAtom);
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
        const item: rowMapPrice = row.item;
        let price = eval(
          createFormula(
            row.item.formula,
            value,
            item.price,
            exchangeRate,
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
        onAmount(id, event, data, setData);
      }}
    />
  );
}

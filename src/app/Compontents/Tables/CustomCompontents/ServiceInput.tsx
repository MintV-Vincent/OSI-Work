import { NumberInput } from "@mantine/core";
import { createFormula } from "Functions/Create/CreateFormula";
import {
  exchangeRateMaterialAtom,
  marginAtom,
  panelAtom,
  yeildAtom,
} from "Library/Atoms/AtomStorage";
import { percision } from "Library/ConstantValues";
import { servicesMap } from "Library/Types";
import { useAtom } from "jotai";
import React from "react";

interface ServiceInputInterface {
  id: number;
  currentAmount: number | "";
  unitPrice: number;
  data: servicesMap[];
  setData: any;
}

export default function ServiceInput({
  id,
  currentAmount,
  data,
  setData,
}: ServiceInputInterface) {
  /**
   *
   * @param id Number, the index of the row being changed
   * @param value The amount being changed to for the material
   * @param unitPrice The sub total of the materials cost in CAD dollars
   * @param data the data being changed
   * @param setData the set state functoin to change the data of the current row
   * @returns material row map for the table with updated amount and price
   */
  const [exchangeRate] = useAtom(exchangeRateMaterialAtom);
  const [panel] = useAtom(panelAtom);
  const [yeild] = useAtom(yeildAtom);
  const [margin] = useAtom(marginAtom);

  function onAmount(
    id: number,
    value: number | "",
    data: servicesMap[],
    setData: any
  ): servicesMap {
    return setData(
      data.map((row: servicesMap) => {
        if (row.id != id) {
          return row;
        }
        if (value === "") {
          return { ...row, amount: 0, price: 0 };
        }
        let price = eval(
          createFormula(
            row.formula,
            value,
            row.unitPrice,
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
      value={Number(currentAmount)}
      precision={percision}
      onChange={(event: number) => {
        onAmount(id, event, data, setData);
      }}
    />
  );
}

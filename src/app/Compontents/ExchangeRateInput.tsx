import { NumberInput } from "@mantine/core";
import { exchangeRateMaterialAtom } from "Library/Atoms/AtomStorage";
import { materialTableAtom, processTableAtom } from "Library/Atoms/TableAtoms";
import { IconCurrencyDollar } from "@tabler/icons-react";
import { useAtom } from "jotai";
import React from "react";
import { materialRowMap } from "Library/Types";
import { createFormula } from "Functions/Create/CreateFormula";
import { percision } from "Library/ConstantValues";

export default function ExchangeRateInput() {
  const [exchangeRate, setExchangeRate] = useAtom(exchangeRateMaterialAtom);
  const [materialData, useMaterialData] = useAtom(materialTableAtom);
  const [processData, useProcessData] = useAtom(processTableAtom);

  return (
    <NumberInput
      className="w-4/5"
      hideControls
      precision={percision}
      value={exchangeRate}
      onChange={(event: number) => {
        if (Number(event) <= 0) {
          event = 1;
        }
        setExchangeRate(event);
        useMaterialData(
          materialData.map((row: materialRowMap) => {
            const item = row.item;
            let newPrice = eval(
              createFormula(item.formula, row.amount, item.price, event)
            );
            return {
              ...row,
              price: newPrice,
            };
          })
        );
        useProcessData(
          processData.map((row: materialRowMap) => {
            const item = row.item;
            let newPrice = eval(
              createFormula(item.formula, item.price * row.amount, event)
            );
            return {
              ...row,
              price: newPrice,
            };
          })
        );
      }}
      rightSection={
        <IconCurrencyDollar
          size={"1.25rem"}
          style={{ display: "block", opacity: 0.5 }}
        />
      }
      rightSectionWidth={36}
    />
  );
}

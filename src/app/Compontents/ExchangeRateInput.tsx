import { NumberInput } from "@mantine/core";
import {
  exchangeRateAtom,
  exchangeRateMaterialAtom,
} from "Library/Atoms/AtomStorage";
import { materialTableAtom, processTableAtom } from "Library/Atoms/TableAtoms";
import { IconCurrencyDollar } from "@tabler/icons-react";
import { useAtom } from "jotai";
import React from "react";
import { materialRowMap } from "Library/Types";
import { createFormula } from "Functions/Create/CreateFormula";

export default function ExchangeRateInput() {
  const [exchangeRate, setExchangeRate] = useAtom(exchangeRateMaterialAtom);
  const [materialData, useMaterialData] = useAtom(materialTableAtom);
  const [processData, useProcessData] = useAtom(processTableAtom);

  return (
    <NumberInput
      className="w-60"
      hideControls
      precision={2}
      value={exchangeRate}
      onChange={(event: number) => {
        if (Number(event) <= 0) {
          event = 1;
        }
        setExchangeRate(event);
        useMaterialData(
          materialData.map((row: materialRowMap) => {
            let newPrice = eval(
              createFormula(row.formula, row.amount, row.unitPrice, event)
            );
            return {
              ...row,
              price: newPrice,
            };
          })
        );
        useProcessData(
          processData.map((row: materialRowMap) => {
            let newPrice = eval(
              createFormula(row.formula, row.unitPrice * row.amount, event)
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

import { NumberInput } from "@mantine/core";
import {
  exchangeRateMaterialAtom,
  filmProcessAtom,
  panelAtom,
} from "Library/Atoms/AtomStorage";
import { materialTableAtom } from "Library/Atoms/TableAtoms";
import { IconCurrencyDollar } from "@tabler/icons-react";
import { useAtom } from "jotai";
import React from "react";
import { materialRowMap, servicesMap } from "Library/Types";
import { createFormula } from "Functions/Create/CreateFormula";
import { percision } from "Library/ConstantValues";
import { assemblyDataAtom } from "Library/Atoms/ServiceStorage";

export default function ExchangeRateInput() {
  const [exchangeRate, setExchangeRate] = useAtom(exchangeRateMaterialAtom);
  const [materialData, useMaterialData] = useAtom(materialTableAtom);
  const [processing, setProcesses] = useAtom(filmProcessAtom);
  const [assembly, setAssembly] = useAtom(assemblyDataAtom);
  const [panelSize] = useAtom(panelAtom);

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
        setProcesses(
          processing.map((row: servicesMap) => {
            let newPrice = eval(
              createFormula(
                row.formula,
                row.amount,
                row.unitPrice,
                event,
                panelSize
              )
            );
            return {
              ...row,
              price: newPrice,
            };
          })
        );
        setAssembly(
          assembly.map((row: servicesMap) => {
            let newPrice = eval(
              createFormula(
                row.formula,
                row.amount,
                row.unitPrice,
                event,
                panelSize
              )
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

import { NumberInput } from "@mantine/core";
import { exchangeRateAssemblyAtom, panelAtom } from "Library/Atoms/AtomStorage";
import { IconCurrencyDollar } from "@tabler/icons-react";
import { useAtom } from "jotai";
import React from "react";
import { servicesMap } from "Library/Types";
import { createFormula } from "Functions/Create/CreateFormula";
import { percision } from "Library/ConstantValues";
import { assemblyDataAtom } from "Library/Atoms/ServiceStorage";

export default function AssemblyExchangeRateInput() {
  const [exchangeRate, setExchangeRate] = useAtom(exchangeRateAssemblyAtom);
  const [assembly, setAssembly] = useAtom(assemblyDataAtom);
  const [panelSize] = useAtom(panelAtom);

  return (
    <NumberInput
      size="xs"
      className="w-4/5"
      hideControls
      precision={percision}
      value={exchangeRate}
      onChange={(event: number) => {
        if (Number(event) <= 0) {
          event = 1;
        }
        setExchangeRate(event);
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
            if (newPrice == Number.POSITIVE_INFINITY) {
              newPrice = 0;
            }
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

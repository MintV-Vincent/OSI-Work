import { Select } from "@mantine/core";
import { createFormula } from "Functions/Create/CreateFormula";
import {
  exchangeRateAtom,
  exchangeRateMaterialAtom,
  filmProcessAtom,
  panelAtom,
} from "Library/Atoms/AtomStorage";
import { panelRow } from "Library/ConstantValues";
import { servicesMap } from "Library/Types";
import { useAtom } from "jotai";
import React from "react";

export default function PanelSelect() {
  const [panel, setPanel] = useAtom(panelAtom);
  const [processing, setProcesses] = useAtom(filmProcessAtom);
  const [exchangeRate] = useAtom(exchangeRateMaterialAtom);

  return (
    <Select
      className="pl-[20%] col-span-1 pl-1/5"
      defaultValue={"1.5"}
      value={panel}
      onChange={(e: string) => {
        setPanel(e);
        setProcesses(
          processing.map((row: servicesMap) => {
            let newPrice = eval(
              createFormula(
                row.formula,
                row.amount,
                row.unitPrice,
                exchangeRate,
                e
              )
            );
            return {
              ...row,
              price: newPrice,
            };
          })
        );
      }}
      data={panelRow}
      title={"Panel Size"}
    />
  );
}

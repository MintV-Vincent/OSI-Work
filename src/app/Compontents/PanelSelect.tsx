import { Select } from "@mantine/core";
import { createFormula } from "Functions/Create/CreateFormula";
import { exchangeRateMaterialAtom, panelAtom } from "Library/Atoms/AtomStorage";
import { processAtom } from "Library/Atoms/ServiceStorage";
import { materialTableAtom } from "Library/Atoms/TableAtoms";
import { panelRow } from "Library/ConstantValues";
import { materialRowMap, rowMapPrice, servicesMap } from "Library/Types";
import { useAtom } from "jotai";
import React from "react";

interface panelSelect {
  size?: string;
}

export default function PanelSelect({ size }: panelSelect) {
  const [panel, setPanel] = useAtom(panelAtom);
  const [processing, setProcesses] = useAtom(processAtom);
  const [materialRows, setMaterialRow] = useAtom(materialTableAtom);
  const [exchangeRate] = useAtom(exchangeRateMaterialAtom);

  return (
    <Select
      size={size}
      className="col-span-1"
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
        setMaterialRow(
          materialRows.map((row: materialRowMap) => {
            const item: rowMapPrice = row.item;
            let newPrice = eval(
              createFormula(
                item.formula,
                row.amount,
                item.price,
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

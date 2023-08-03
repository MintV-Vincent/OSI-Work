import { NumberInput, Select, Table } from "@mantine/core";
import { materialRowMap } from "Library/Types";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { onAmount, onMaterial } from "Functions/Create/MaterialCreate";
import TotalRows from "./Rows/TotalRows";
import HeaderRow from "./Rows/HeaderRow";
import { processHeader } from "Library/Headers";
import ToolTipLabel from "./CustomCompontents/ToolTipLabel";
import { exchangeRateAtom, filmProcessAtom } from "Library/Atoms/AtomStorage";
import { processTableAtom } from "Library/Atoms/TableAtoms";
import { filmTotalAtom } from "Library/Atoms/TotalAtom";
import { createFormula } from "Functions/Create/CreateFormula";
import MaterialSelect from "./CustomCompontents/MaterialSelect";
import AmountInput from "./CustomCompontents/AmountInput";

const columns: string[] = [
  "w-80 h-14",
  "w-40 h-14",
  "w-40 text-right h-14",
  "w-40 text-right h-14",
];

export function ProcessTable() {
  const [total] = useAtom(filmTotalAtom);
  const [processing] = useAtom(filmProcessAtom);
  const [rowsAtom, useRowsAtom] = useAtom(processTableAtom);

  return (
    <Table miw={700} striped withBorder verticalSpacing="md">
      <HeaderRow columns={columns} titles={processHeader} />
      <tbody>
        {rowsAtom.map((row: materialRowMap, index: number) => (
          <tr key={index}>
            <td>
              <MaterialSelect
                currentMaterial={row.material}
                currentSupplier={row.supplier}
                id={index}
                materialList={processing}
                customs={[]}
                rowsAtom={rowsAtom}
                useRowsAtom={useRowsAtom}
              />
            </td>
            <td>
              <AmountInput
                id={index}
                currentAmount={row.amount}
                unitPrice={row.unitPrice}
                rowsAtom={rowsAtom}
                useRowsAtom={useRowsAtom}
              />
            </td>
            <td className="text-right">{Number(row.unitPrice).toFixed(2)}</td>
            <td className="text-right">
              <ToolTipLabel formula={row.formula} price={row.price} />
            </td>
          </tr>
        ))}
        <TotalRows text={"Total"} total={total} columns={4} />
      </tbody>
    </Table>
  );
}

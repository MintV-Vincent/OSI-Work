import { NumberInput, Select, Table } from "@mantine/core";
import { materialRowMap } from "Library/Types";
import { useAtom } from "jotai";
import React from "react";
import { onAmount, onMaterial } from "Functions/Create/MaterialCreate";
import TotalRows from "./Rows/TotalRows";
import HeaderRow from "./Rows/HeaderRow";
import { processHeader } from "Library/Headers";
import ToolTipLabel from "./CustomCompontents/ToolTipLabel";
import { filmProcessAtom } from "Library/Atoms/AtomStorage";
import { processTableAtom } from "Library/Atoms/TableAtoms";
import { filmTotalAtom } from "Library/Atoms/TotalAtom";

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
  console.log("2");

  return (
    <Table miw={700} striped withBorder verticalSpacing="md">
      <HeaderRow columns={columns} titles={processHeader} />
      <tbody>
        {rowsAtom.map((row: materialRowMap, index: number) => (
          <tr key={index}>
            <td>
              {
                <Select
                  placeholder="Select Material"
                  value={row.material}
                  searchable
                  onChange={(e: string) => {
                    onMaterial(index, e, processing, rowsAtom, useRowsAtom);
                  }}
                  data={processing}
                />
              }
            </td>
            <td>
              {
                <NumberInput
                  hideControls
                  precision={2}
                  value={row.amount}
                  onChange={(event: number | "") =>
                    onAmount(index, event, row.unitPrice, rowsAtom, useRowsAtom)
                  }
                />
              }
            </td>
            <td className="text-right">{Number(row.unitPrice).toFixed(2)}</td>
            <td className="text-right">
              <ToolTipLabel
                formula={row.formula}
                amount={row.amount}
                unitPrice={row.unitPrice}
                id={row.id}
                useRowsAtom={useRowsAtom}
                rowsAtom={rowsAtom}
              />
            </td>
          </tr>
        ))}
        <TotalRows text={"Total"} total={total} columns={4} />
      </tbody>
    </Table>
  );
}

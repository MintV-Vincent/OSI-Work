import { NumberInput, Select, Table } from "@mantine/core";
import { materialRowMap } from "Library/Types";
import { useAtom } from "jotai";
import React, { useMemo } from "react";
import { onAmount, onMaterial } from "Functions/Create/MaterialCreate";
import TotalRows from "./Rows/TotalRows";
import HeaderRow from "./Rows/HeaderRow";
import { processHeader } from "Library/Headers";
import ToolTipLabel from "./CustomCompontents/ToolTipLabel";
import useUpdateTotal from "Hooks/UseUpdateTotal";
import { filmProcessAtom, filmTotalAtom } from "Library/Atoms/AtomStorage";
import { processTableAtom } from "Library/Atoms/TableAtoms";

const columns: string[] = [
  "w-80",
  "w-40",
  "w-40 text-right",
  "w-40 text-right",
];

export function ProcessTable() {
  const [, setTotal] = useAtom(filmTotalAtom);
  const [processing] = useAtom(filmProcessAtom);
  const [rowsAtom, useRowsAtom] = useAtom(processTableAtom);

  //Calculate the total
  const total: number = useMemo(() => {
    return rowsAtom.reduce(
      (previousScore: number, currentScore: materialRowMap) =>
        previousScore + currentScore.price,
      0
    );
  }, [rowsAtom]);
  useUpdateTotal({ setTotal, total });

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

import { NumberInput, Select, Table } from "@mantine/core";
import { materialRowMap } from "Interface/Types";
import { useAtom } from "jotai";
import React, { useMemo } from "react";
import { onAmount, onMaterial } from "Functions/Create/MaterialCreate";
import TotalRows from "./Rows/TotalRows";
import HeaderRow from "./Rows/HeaderRow";
import { processHeader } from "Interface/Headers";
import { filmProcessAtom } from "DataBases/Database";
import ToolTipLabel from "./CustomCompontents/ToolTipLabel";
import useUpdateTotal from "Hooks/UseUpdateTotal";
import { createFormula } from "Functions/Create/CreateFormula";

const columns: string[] = [
  "w-80",
  "w-40",
  "w-40 text-right",
  "w-40 text-right",
];

interface PriceTableInterface {
  data: materialRowMap[];
  title: string;
  custom?: string;
  rowsAtom: any;
  useRowsAtom: any;
  setTotal: any;
}

export function ProcessTable({
  data,
  rowsAtom,
  useRowsAtom,
  setTotal,
}: PriceTableInterface) {
  const [processing] = useAtom(filmProcessAtom);

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
        {data.map((row: materialRowMap, index: number) => (
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

import { Center, Table } from "@mantine/core";
import HeaderRow from "./Rows/HeaderRow";
import { rowMap2 } from "Interface/Types";
import React, { useEffect, useState } from "react";
import { addStringArrayTotal } from "Functions/MathFunctions";
import { createCheckRow } from "Functions/Create/MapCreate";
import { Checkbox } from "@mantine/core";

interface checkTable {
  titles: string[];
  values: string[];
  setAtom: any;
}

export function CheckTable({ titles, values, setAtom }: checkTable) {
  const [value, setValue] = useState<string[]>([]);
  const total = addStringArrayTotal(value);

  useEffect(() => {
    setAtom(total);
  }, [total]);

  let checkTableRow = [];
  for (let i: number = 0; i < titles.length; i++) {
    checkTableRow.push(
      createCheckRow(
        titles[i],
        <Checkbox.Group value={value} onChange={setValue} size="md">
          <Checkbox value={values[i]} key={i} />
        </Checkbox.Group>,
        values[i]
      )
    );
  }

  return (
    <Table miw={700} striped withBorder verticalSpacing="md">
      <HeaderRow
        columns={[
          "text-left h-14 w-1/2",
          "text-center h-14 w-1/8",
          "text-left h-14 w-1/8",
          "text-right h-14 w-1/8",
          "text-left h-14 w-1/8",
        ]}
        titles={["Service", "Status", "", "Price ($)", ""]}
      />
      <tbody>
        {checkTableRow.map((row: rowMap2, index: number) => (
          <tr className={" text-primary"} key={row.label + " row " + index}>
            <td>{row.label}</td>
            <td>
              <Center>{row.value}</Center>
            </td>
            <td></td>
            <td className="text-right">{Number(row.value2).toFixed(2)}</td>
            <td>{}</td>
          </tr>
        ))}
        <tr>
          <td></td>
          <td></td>
          <td className="text-right font-semibold">Total</td>
          <td className="text-right font-semibold">{total.toFixed(2)}</td>
          <td></td>
        </tr>
      </tbody>
    </Table>
  );
}

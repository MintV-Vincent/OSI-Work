"use client";
import { Center, Checkbox, Table } from "@mantine/core";
import { createCheckRow } from "Functions/Create/MapCreate";
import { checkTableAtom } from "Library/Atoms/TableAtoms";
import { qualityTotalAtom } from "Library/Atoms/TotalAtom";
import { checkValuesTable } from "Library/CheckValues";
import { checkTableTitle } from "Library/Headers";
import { checkTableMap } from "Library/Types";
import HeaderRow from "app/Compontents/Tables/Rows/HeaderRow";
import { useAtom } from "jotai";
import React from "react";

export default function page() {
  const [total] = useAtom(qualityTotalAtom);
  const [value, setValue] = useAtom(checkTableAtom);

  let checkTableRow = [];
  for (let i: number = 0; i < checkTableTitle.length; i++) {
    checkTableRow.push(
      createCheckRow(
        checkTableTitle[i],
        <Checkbox.Group value={value} onChange={(e) => setValue(e)} size="md">
          <Checkbox value={checkValuesTable[i]} key={i} />
        </Checkbox.Group>,
        checkValuesTable[i]
      )
    );
  }

  return (
    <Table striped withBorder verticalSpacing="md">
      <HeaderRow
        columns={[
          "",
          "text-left h-14",
          "text-center h-14",
          "text-left h-14",
          "text-right h-14",
          "text-left h-14",
        ]}
        titles={["", "Service", "Status", "", "Price (CAD$)", ""]}
      />
      <tbody>
        {checkTableRow.map((row: checkTableMap, index: number) => (
          <tr className={" text-primary"} key={row.label + " row " + index}>
            <td />
            <td>{row.label}</td>
            <td>
              <Center>{row.value}</Center>
            </td>
            <td />
            <td className="text-right">{Number(row.value2).toFixed(2)}</td>
            <td />
          </tr>
        ))}
        <tr>
          <td />
          <td />
          <td />
          <td className="text-right font-semibold">Total</td>
          <td className="text-right font-semibold">{total.toFixed(2)}</td>
          <td />
        </tr>
      </tbody>
    </Table>
  );
}

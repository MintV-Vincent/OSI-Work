import { Center, NumberInput, Table } from "@mantine/core";
import HeaderRow from "./Rows/HeaderRow";
import { rowMap2 } from "Library/Types";
import React, { useEffect, useState } from "react";
import { addArrayTotal } from "Functions/MathFunctions";
import { createCheckRow } from "Functions/Create/MapCreate";
import { Checkbox } from "@mantine/core";
import { useAtom } from "jotai";
import { NRETotalAtom } from "Library/AtomStorage";

interface checkTable {
  titles: string[];
}

function getValues(textInputArray: any[], active: string[]): number[] {
  let activeArray: number[] = [];
  if (active.length > 0) {
    for (let i: number = 0; i < active.length; i++) {
      const element = active[i];
      activeArray.push(textInputArray[Number(element)]);
    }
  }
  return activeArray;
}

export function CustomCheckTable({ titles }: checkTable) {
  const [value, setValue] = useState<string[]>([]);
  const [photoTools, setPhoto] = useState<number | "">(0);
  const [electric, setElec] = useState<number | "">(0);
  const [outline, setOutline] = useState<number | "">(0);
  const [secondary, setSecondary] = useState<number | "">(0);
  const [assySten, setAssySten] = useState<number | "">(0);
  const [assyPall, setAssyPall] = useState<number | "">(0);
  const [design, setDesign] = useState<number | "">(0);
  const [product, setProduct] = useState<number | "">(0);
  const [hasl, sethasl] = useState<number | "">(0);

  const [, setTotal] = useAtom(NRETotalAtom);

  const textInputArray: any[] = [
    photoTools,
    electric,
    outline,
    secondary,
    assySten,
    assyPall,
    design,
    product,
    hasl,
  ];
  const setInputArray: any[] = [
    setPhoto,
    setElec,
    setOutline,
    setSecondary,
    setAssySten,
    setAssyPall,
    setDesign,
    setProduct,
    sethasl,
  ];
  const total = addArrayTotal(getValues(textInputArray, value));

  useEffect(() => {
    setTotal(total);
  }, [total]);

  let checkTableRow = [];
  for (let i: number = 0; i < titles.length; i++) {
    checkTableRow.push(
      createCheckRow(
        titles[i],
        <Checkbox.Group value={value} onChange={setValue} size="md">
          <Checkbox value={i.toString()} />
        </Checkbox.Group>,
        <NumberInput
          rightSection
          hideControls
          precision={2}
          value={textInputArray[i]}
          onChange={(event: number | "") => {
            setInputArray[i](event);
          }}
        />
      )
    );
  }

  return (
    <Table miw={700} striped withBorder verticalSpacing="md">
      <HeaderRow
        columns={[
          "text-left h-14 w-1/4",
          "text-center h-14 w-1/4",
          "text-left h-14 w-1/6",
          "text-left h-14 w-1/6",
          "text-left h-14 w-1/6",
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
            <td className="text-right">{row.value2}</td>
            <td>{}</td>
          </tr>
        ))}
        <tr>
          <td></td>
          <td></td>
          <td className="text-center font-semibold">Total</td>
          <td className="text-left font-semibold">{total.toFixed(2)}</td>
          <td></td>
        </tr>
      </tbody>
    </Table>
  );
}

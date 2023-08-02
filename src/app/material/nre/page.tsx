"use client";
import { Center, NumberInput, Table } from "@mantine/core";
import HeaderRow from "app/Compontents/Tables/Rows/HeaderRow";
import { checkTableMap } from "Library/Types";
import React, { useEffect } from "react";
import { addArrayTotal } from "Functions/MathFunctions";
import { createCheckRow } from "Functions/Create/MapCreate";
import { Checkbox } from "@mantine/core";
import { useAtom } from "jotai";
import {
  assyPallAtom,
  assyStenAtom,
  customCheckTableAtom,
  designAtom,
  elecAtom,
  haslAtom,
  outlineAtom,
  photoAtom,
  productAtom,
  secondaryAtom,
} from "Library/Atoms/TableAtoms";
import { NRETitle } from "Library/Headers";
import { getValues } from "Functions/GetFunction/GetInputValue";
import { NRETotalAtom } from "Library/Atoms/TotalAtom";

export default function page() {
  const [value, setValue] = useAtom(customCheckTableAtom);
  const [photoTools, setPhoto] = useAtom(photoAtom);
  const [electric, setElec] = useAtom(elecAtom);
  const [outline, setOutline] = useAtom(outlineAtom);
  const [secondary, setSecondary] = useAtom(secondaryAtom);
  const [assySten, setAssySten] = useAtom(assyStenAtom);
  const [assyPall, setAssyPall] = useAtom(assyPallAtom);
  const [design, setDesign] = useAtom(designAtom);
  const [product, setProduct] = useAtom(productAtom);
  const [hasl, sethasl] = useAtom(haslAtom);

  const [, setTotal] = useAtom(NRETotalAtom);

  const textInputArray: number[] = [
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
  for (let i: number = 0; i < NRETitle.length; i++) {
    checkTableRow.push(
      createCheckRow(
        NRETitle[i],
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
        {checkTableRow.map((row: checkTableMap, index: number) => (
          <tr className={" text-primary"} key={row.label + " row " + index}>
            <td>{row.label}</td>
            <td>
              <Center>{row.value}</Center>
            </td>
            <td></td>
            <td className="text-right">{row.value2}</td>
            <td></td>
          </tr>
        ))}
        <tr>
          <td></td>
          <td></td>
          <td className="text-center font-semibold">Total</td>
          <td className="text-left font-semibold">
            {Number(total).toFixed(2)}
          </td>
          <td></td>
        </tr>
      </tbody>
    </Table>
  );
}

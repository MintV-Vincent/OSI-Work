"use client";
import { Center, NumberInput, Table } from "@mantine/core";
import HeaderRow from "app/Compontents/Tables/Rows/HeaderRow";
import { checkTableMap } from "Library/Types";
import React from "react";
import { createCheckRow } from "Functions/Create/MapCreate";
import { Checkbox } from "@mantine/core";
import { useAtom } from "jotai";
import { customCheckTableAtom } from "Library/Atoms/TableAtoms";
import { NRETitle } from "Library/Headers";
import { NRETotalAtom } from "Library/Atoms/TotalAtom";
import {
  NREAtom,
  assyPallAtom,
  assyStenAtom,
  designAtom,
  elecAtom,
  haslAtom,
  outlineAtom,
  photoAtom,
  productAtom,
  secondaryAtom,
} from "Library/Atoms/NREAtoms";

export default function page() {
  const [value, setValue] = useAtom(customCheckTableAtom);
  const [, setPhoto] = useAtom(photoAtom);
  const [, setElec] = useAtom(elecAtom);
  const [, setOutline] = useAtom(outlineAtom);
  const [, setSecondary] = useAtom(secondaryAtom);
  const [, setAssySten] = useAtom(assyStenAtom);
  const [, setAssyPall] = useAtom(assyPallAtom);
  const [, setDesign] = useAtom(designAtom);
  const [, setProduct] = useAtom(productAtom);
  const [, sethasl] = useAtom(haslAtom);
  const [nre] = useAtom(NREAtom);

  const [total] = useAtom(NRETotalAtom);

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
          value={nre[i]}
          onChange={(event: number | "") => {
            if (event != "") {
              setInputArray[i](event);
            }
          }}
        />
      )
    );
  }

  return (
    <Table striped withBorder verticalSpacing="md">
      <HeaderRow
        columns={[
          "",
          "text-left h-14 w-1/4",
          "text-center h-14 w-1/4",
          "text-left h-14 w-1/6",
          "text-left h-14 w-1/6",
          "text-left h-14 w-1/6",
        ]}
        titles={["", "Service", "Status", "", "Price (CAD$)", ""]}
      />
      <tbody>
        {checkTableRow.map((row: checkTableMap, index: number) => (
          <tr className={" text-primary"} key={row.label + " row " + index}>
            <td className="h-14" />
            <td>{row.label}</td>
            <td>
              <Center>{row.value}</Center>
            </td>
            <td />
            <td className="text-right h-14">{row.value2}</td>
            <td />
          </tr>
        ))}
        <tr>
          <td className="h-16 " />
          <td className="h-16 " />
          <td className="h-16 " />
          <td className="h-16 text-center font-semibold">Total</td>
          <td className="h-16 text-left font-semibold">
            {Number(total).toFixed(2)}
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

import { NumberInput, Select, Table } from "@mantine/core";
import { dictionaryMap, materialRowMap, rowMapPrice } from "Interface/Types";
import React, { useMemo } from "react";
import {
  onAmount,
  onMaterial,
  onSupplier,
} from "Functions/Create/MaterialCreate";
import SelectLogic, {
  filterMaterials,
} from "app/Compontents/Tables/CustomCompontents/SelectLogic";
import TotalRows from "./Rows/TotalRows";
import HeaderRow from "./Rows/HeaderRow";
import { materialHeader } from "Interface/Headers";
import ToolTipLabel from "./CustomCompontents/ToolTipLabel";
import useUpdateTotal from "Hooks/UseUpdateTotal";
import { createFormula } from "Functions/Create/CreateFormula";
import { useAtom } from "jotai";
import {
  exchangeRateAtom,
  freightAtom,
  marginAtom,
  panelAtom,
  yeildAtom,
} from "app/MainWebsite";

const tableSize: string = "w-40 ";

const columns: string[] = [
  tableSize,
  "w-80",
  tableSize,
  tableSize,
  tableSize + "text-right",
  tableSize + "text-right",
];
interface PriceTableInterface {
  customString: string;
  rowsAtom: materialRowMap[];
  useRowsAtom: any;
  database: any;
  setTotal: any;
}

export function PriceTable({
  customString,
  rowsAtom,
  useRowsAtom,
  database,
  setTotal,
}: PriceTableInterface) {
  const array = SelectLogic(database);
  const materials: rowMapPrice[] = array.material;
  const supplier: dictionaryMap[] = array.supplier;

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
      <HeaderRow columns={columns} titles={materialHeader(customString)} />
      <tbody>
        {rowsAtom.map((row: materialRowMap, index: number) => (
          <tr key={index}>
            <td className={tableSize}>
              <Select
                placeholder="Supplier"
                value={row.supplier}
                onChange={(e: string) => {
                  onSupplier(index, e, rowsAtom, useRowsAtom);
                }}
                data={supplier}
              />
            </td>
            <td className={tableSize}>
              {
                <Select
                  placeholder="Material"
                  value={row.material}
                  searchable
                  onChange={(e: string) => {
                    onMaterial(index, e, materials, rowsAtom, useRowsAtom);
                  }}
                  data={filterMaterials(
                    materials,
                    row.supplier ? row.supplier : ""
                  )}
                />
              }
            </td>
            <td className={tableSize}>{row.custom}</td>
            <td className={tableSize}>
              {
                <NumberInput
                  hideControls
                  value={row.amount}
                  precision={4}
                  onChange={(event: number) => {
                    onAmount(
                      index,
                      event,
                      row.unitPrice,
                      rowsAtom,
                      useRowsAtom
                    );
                  }}
                />
              }
            </td>
            <td className={tableSize + "text-right"}>
              {Number(row.unitPrice).toFixed(2)}
            </td>
            <td className={tableSize + "text-right"}>
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
        <TotalRows text={"Total"} total={total} columns={6} />
      </tbody>
    </Table>
  );
}

import { Table } from "@mantine/core";
import { dictionaryMap, materialRowMap, rowMapPrice } from "Library/Types";
import React from "react";
import SelectLogic from "app/Compontents/Tables/CustomCompontents/SelectLogic";
import TotalRows from "./Rows/TotalRows";
import HeaderRow from "./Rows/HeaderRow";
import { materialHeader } from "Library/Headers";
import ToolTipLabel from "./CustomCompontents/ToolTipLabel";
import { useAtom } from "jotai";
import { materialTableAtom } from "Library/Atoms/TableAtoms";
import { materialAtom } from "Library/Atoms/AtomStorage";
import { materialTotalAtom } from "Library/Atoms/TotalAtom";
import CustomSelectInput from "./CustomCompontents/SupplierSelect";
import MaterialSelect from "./CustomCompontents/MaterialSelect";
import AmountInput from "./CustomCompontents/AmountInput";

const tableSize: string = "w-40 h-14 ";

const columns: string[] = [
  tableSize,
  "w-80 h-14",
  tableSize,
  tableSize,
  tableSize + "text-right",
  tableSize + "text-right",
];
interface PriceTableInterface {
  customString: string;
}

export function PriceTable({ customString }: PriceTableInterface) {
  const [rowsAtom, useRowsAtom] = useAtom(materialTableAtom);
  const [total] = useAtom(materialTotalAtom);
  const [database] = useAtom(materialAtom);
  const array = SelectLogic(database);
  const materials: rowMapPrice[] = array.material;
  const supplier: dictionaryMap[] = array.supplier;

  return (
    <Table miw={700} striped withBorder verticalSpacing="md">
      <HeaderRow columns={columns} titles={materialHeader(customString)} />
      <tbody>
        {rowsAtom.map((row: materialRowMap, index: number) => (
          <tr key={index}>
            <td className={tableSize}>
              <CustomSelectInput
                rowSupplier={row.supplier}
                rowsAtom={rowsAtom}
                supplier={supplier}
                useRowsAtom={useRowsAtom}
                id={index}
              />
            </td>
            <td className={tableSize}>
              <MaterialSelect
                currentMaterial={row.material}
                currentSupplier={row.supplier}
                id={index}
                materialList={materials}
                customs={[]}
                rowsAtom={rowsAtom}
                useRowsAtom={useRowsAtom}
              />
            </td>
            <td className={tableSize}>{row.custom}</td>
            <td className={tableSize}>
              <AmountInput
                id={index}
                currentAmount={row.amount}
                unitPrice={row.unitPrice}
                rowsAtom={rowsAtom}
                useRowsAtom={useRowsAtom}
              />
            </td>
            <td className={tableSize + "text-right"}>
              {Number(row.unitPrice).toFixed(2)}
            </td>
            <td className={tableSize + "text-right"}>
              <ToolTipLabel formula={row.formula} price={row.price} />
            </td>
          </tr>
        ))}
        <TotalRows text={"Total"} total={total} columns={6} />
      </tbody>
    </Table>
  );
}

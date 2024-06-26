import { Button, Table } from "@mantine/core";
import { materialRowMap, rowMapPrice } from "Library/Types";
import React from "react";
import SelectLogic from "app/Compontents/Tables/CustomCompontents/SelectLogic";
import TotalRows from "app/Compontents/Tables/Rows/TotalRows";
import HeaderRow from "app/Compontents/Tables/Rows/HeaderRow";
import { materialHeader } from "Library/Headers";
import { useAtom } from "jotai";
import { materialTableAtom } from "Library/Atoms/TableAtoms";
import { materialTotalAtom } from "Library/Atoms/TotalAtom";
import SupplierSelect from "app/Compontents/Tables/CustomCompontents/SupplierSelect";
import MaterialSelect from "app/Compontents/Tables/CustomCompontents/MaterialSelect";
import AmountInput from "app/Compontents/Tables/CustomCompontents/AmountInput";
import { createMaterialRow } from "Functions/Create/MapCreate";
import { materialTotalUSDAtom } from "Library/Atoms/TotalAtomUSD";
import { AddMaterialButton } from "app/Compontents/Tables/CustomCompontents/AddMaterialButton";

const tableSize: string = " ";

const columns: string[] = [tableSize, "", "", " text-right ", " text-right "];

export function PriceTable() {
  const [materialRows, setMaterialRow] = useAtom(materialTableAtom);
  const [total] = useAtom(materialTotalAtom);
  const [USDTotal] = useAtom(materialTotalUSDAtom);
  const array = SelectLogic();
  const materials: rowMapPrice[] = array.material;
  const supplier: string[] = array.supplier;

  return (
    <Table striped withBorder verticalSpacing="w-10">
      <HeaderRow columns={columns} titles={materialHeader} />
      <tbody>
        {materialRows.map((row: materialRowMap, index: number) => (
          <tr key={index}>
            <td className="pl-3 w-3/12">
              <SupplierSelect
                rowSupplier={row.supplier}
                data={materialRows}
                supplier={supplier}
                setData={setMaterialRow}
                id={index}
              />
            </td>
            <td className="pl-3 w-3/12">
              <MaterialSelect
                currentMaterial={row.item.value}
                currentSupplier={row.supplier}
                id={index}
                materialList={materials}
                data={materialRows}
                setData={setMaterialRow}
              />
            </td>
            <td className="pl-3 w-3/12">
              <AmountInput
                id={index}
                currentAmount={row.amount}
                data={materialRows}
                setData={setMaterialRow}
              />
            </td>
            <td className="text-right w-1/12 px-3">
              {row.item.price.toFixed(2)}
            </td>
            <td className={"text-right w-2/12 px-3"}>
              <label title={row.item.formula}>{row.price.toFixed(2)}</label>
            </td>
          </tr>
        ))}
        <TotalRows
          text={"USD Total"}
          total={USDTotal}
          columns={materialHeader.length}
          button={[]}
        />
        <TotalRows
          text={"CAD Total"}
          total={total}
          columns={materialHeader.length}
          button={[
            <Button
              className="w-28"
              size="xs"
              onClick={(e) => {
                const newRow = createMaterialRow(materialRows.length);
                setMaterialRow([...materialRows, newRow]);
              }}
            >
              Add Row
            </Button>,
            <AddMaterialButton />,
          ]}
        />
      </tbody>
    </Table>
  );
}

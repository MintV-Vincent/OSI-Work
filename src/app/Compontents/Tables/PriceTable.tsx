import { Button, Table } from "@mantine/core";
import { dictionaryMap, materialRowMap, rowMapPrice } from "Library/Types";
import React, { Suspense, lazy, useState } from "react";
import SelectLogic from "app/Compontents/Tables/CustomCompontents/SelectLogic";
import TotalRows from "./Rows/TotalRows";
import HeaderRow from "./Rows/HeaderRow";
import { materialHeader } from "Library/Headers";
import { useAtom } from "jotai";
import { materialTableAtom } from "Library/Atoms/TableAtoms";
import { materialAtom } from "Library/Atoms/AtomStorage";
import { materialTotalAtom } from "Library/Atoms/TotalAtom";
import SupplierSelect from "./CustomCompontents/SupplierSelect";
import MaterialSelect from "./CustomCompontents/MaterialSelect";
import AmountInput from "./CustomCompontents/AmountInput";
import { AddModal } from "../AddModal";
import { createMaterialRow } from "Functions/Create/MapCreate";

const tableSize: string = "w-2/9 ";

const columns: string[] = [
  tableSize,
  "w-3/9",
  "w-1/9",
  "w-1/9 text-right",
  "w-1/9 text-right",
];
interface PriceTableInterface {
  customString: string;
}

const AddSupplierForm = lazy(
  () => import("app/Compontents/Forms/AddSupplierForm")
);

export function PriceTable({ customString }: PriceTableInterface) {
  const [status, setState] = useState(false);
  const handleClick = () => {
    setState((prevStatus) => !prevStatus);
  };

  const [materialRows, setMaterialRow] = useAtom(materialTableAtom);
  const [total] = useAtom(materialTotalAtom);
  const [database] = useAtom(materialAtom);
  const array = SelectLogic(database);
  const materials: rowMapPrice[] = array.material;
  const supplier: dictionaryMap[] = array.supplier;

  return (
    <>
      <Table striped withBorder verticalSpacing="xs">
        <HeaderRow columns={columns} titles={materialHeader(customString)} />
        <tbody>
          {materialRows.map((row: materialRowMap, index: number) => (
            <tr key={index}>
              <td>
                <SupplierSelect
                  rowSupplier={row.supplier}
                  data={materialRows}
                  supplier={supplier}
                  setData={setMaterialRow}
                  id={index}
                />
              </td>
              <td>
                <MaterialSelect
                  currentMaterial={row.material}
                  currentSupplier={row.supplier}
                  id={index}
                  materialList={materials}
                  data={materialRows}
                  setData={setMaterialRow}
                />
              </td>
              <td>{row.custom}</td>
              <td>
                <AmountInput
                  id={index}
                  currentAmount={row.amount}
                  unitPrice={row.unitPrice}
                  data={materialRows}
                  setData={setMaterialRow}
                />
              </td>
              <td className={"text-right"}>
                <label title={row.formula}>{row.price.toFixed(2)}</label>
              </td>
            </tr>
          ))}
          <TotalRows
            text={"Total"}
            total={total}
            columns={materialHeader(customString).length}
          />
        </tbody>
      </Table>
      <div className="flex justify-between p-10">
        <AddModal
          title={"Add Material"}
          form={
            <Suspense>
              <AddSupplierForm handleClick={handleClick} />
            </Suspense>
          }
          button={
            <Button onClick={() => handleClick()} className="z-50">
              Add Material
            </Button>
          }
          status={status}
          handleClick={handleClick}
        />
        <Button
          onClick={(e) => {
            const newRow = createMaterialRow(materialRows.length);
            setMaterialRow([...materialRows, newRow]);
          }}
        >
          Add Row
        </Button>
      </div>
    </>
  );
}

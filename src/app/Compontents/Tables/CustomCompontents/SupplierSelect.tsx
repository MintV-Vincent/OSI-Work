import { Select } from "@mantine/core";
import { dictionaryMap, materialRowMap } from "Library/Types";
import React from "react";
interface customSelect {
  rowSupplier: string;
  data: materialRowMap[];
  id: number;
  supplier: dictionaryMap[];
  setData: any;
}

export default function SupplierSelect({
  rowSupplier,
  data,
  supplier,
  setData,
  id,
}: customSelect) {
  /**
   *
   * @param id The index of the row being changed
   * @param supplier The current supplier name
   * @param data The data of the table being changed
   * @param setData The set state functoin to change the data
   * @returns supplier row map for the table, Update base on the supplier being selected
   */
  function onSupplier(
    id: number,
    supplier: string,
    data: materialRowMap[],
    setData: any
  ): materialRowMap {
    return setData(
      data.map((row: materialRowMap) => {
        if (row.id != id) {
          return row;
        }
        if (supplier === row.supplier) {
          return row;
        }
        return {
          ...row,
          custom: "",
          material: "",
          supplier: supplier,
          price: 0,
          unitPrice: 0,
        };
      })
    );
  }

  return (
    <Select
      placeholder="Supplier"
      searchable
      clearable
      searchValue={rowSupplier}
      onSearchChange={(e: any) => {
        onSupplier(id, e, data, setData);
      }}
      data={supplier}
    />
  );
}

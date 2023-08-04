import { Select } from "@mantine/core";
import { dictionaryMap, materialRowMap } from "Library/Types";
import React from "react";
interface customSelect {
  rowSupplier: string;
  rowsAtom: materialRowMap[];
  id: number;
  supplier: dictionaryMap[];
  useRowsAtom: any;
}

export default function SupplierSelect({
  rowSupplier,
  rowsAtom,
  supplier,
  useRowsAtom,
  id,
}: customSelect) {
  function onSupplier(
    id: number,
    supplier: string,
    rowsAtom: materialRowMap[],
    useRowsAtom: any
  ): materialRowMap {
    return useRowsAtom(
      rowsAtom.map((row: materialRowMap) => {
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
        onSupplier(id, e, rowsAtom, useRowsAtom);
      }}
      data={supplier}
    />
  );
}

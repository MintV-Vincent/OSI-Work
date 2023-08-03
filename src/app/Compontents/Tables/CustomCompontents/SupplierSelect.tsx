import { Select } from "@mantine/core";
import { materialAtom } from "Library/Atoms/AtomStorage";
import { dictionaryMap, materialRowMap, rowMapPrice } from "Library/Types";
import { useAtom } from "jotai";
import React from "react";

interface customSelect {
  rowSupplier: any;
  rowsAtom: any;
  supplier: any;
  useRowsAtom: any;
  id: any;
}

export default function CustomSelectInput({
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
      searchValue={rowSupplier}
      onSearchChange={(e: any) => {
        onSupplier(id, e, rowsAtom, useRowsAtom);
      }}
      data={supplier}
    />
  );
}

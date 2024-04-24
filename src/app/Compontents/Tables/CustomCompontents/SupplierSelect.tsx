import { Select } from "@mantine/core";
import { createMaterialRow, createRowPrice } from "Functions/Create/MapCreate";
import { materialRowMap } from "Library/Types";
import React, { useEffect, useRef } from "react";
interface customSelect {
  rowSupplier: string;
  data: materialRowMap[];
  id: number;
  supplier: string[];
  setData: any;
}

/**
 *
 * @param id The index of the row being changed
 * @param supplier The current supplier name
 * @param data The data of the table being changed
 * @param setData The set state functoin to change the data
 * @returns supplier row map for the table, Update base on the supplier being selected
 */
export default function SupplierSelect({
  rowSupplier,
  data,
  supplier,
  setData,
  id,
}: customSelect) {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  function onSupplier(
    id: number,
    supplier: string,
    data: materialRowMap[],
    setData: any
  ): materialRowMap {
    return setData(
      data.map((row: materialRowMap) => {
        const item = row.item;
        if (row.id != id) {
          return row;
        }
        if (supplier === null) {
          return {
            ...row,
            item: createRowPrice(),
            supplier: "",
            price: 0,
          };
        }
        if (supplier === item.supplier) {
          return row;
        }
        return {
          ...row,
          item: createMaterialRow(id),
          supplier: supplier,
          price: 0,
        };
      })
    );
  }

  return (
    <Select
      size="xs"
      placeholder="Supplier"
      searchable
      clearable
      value={rowSupplier}
      onChange={(e: any) => {
        if (isMounted.current == true) {
          onSupplier(id, e, data, setData);
        }
      }}
      data={supplier}
    />
  );
}

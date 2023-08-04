import { Select } from "@mantine/core";
import { materialRowMap, rowMapPrice } from "Library/Types";
import React from "react";
import { filterMaterials } from "./SelectLogic";
import { useAtom } from "jotai";
import {
  exchangeRateAtom,
  freightAtom,
  marginAtom,
  panelAtom,
  yeildAtom,
} from "Library/Atoms/AtomStorage";
import { createFormula } from "Functions/Create/CreateFormula";

interface materialSelect {
  currentMaterial: string;
  currentSupplier: string;
  id: number;
  materialList: rowMapPrice[];
  rowsAtom: materialRowMap[];
  useRowsAtom: any;
}

export default function MaterialSelect({
  currentMaterial,
  materialList,
  rowsAtom,
  useRowsAtom,
  id,
  currentSupplier,
}: materialSelect) {
  const [exchangeRate] = useAtom(exchangeRateAtom);
  const [freight] = useAtom(freightAtom);
  const [panel] = useAtom(panelAtom);
  const [yeild] = useAtom(yeildAtom);
  const [margin] = useAtom(marginAtom);

  function onMaterial(
    id: number,
    material: string,
    materialList: rowMapPrice[],
    rowsAtom: materialRowMap[],
    useRowsAtom: any
  ): materialRowMap {
    // Function activates when select input of material is changed. This will change the material and the code for rowsAtom

    // id: Number, the index of the row being changed
    // value: The material name
    // custom: The custom (code, thickness, model #) for the matching material
    // rowsAtom: the data being changed
    // useRowsAtom: the set state functoin to change the data

    // Returns: material row map for the table
    // Update base on the material being selected
    const filteredMaterialList: rowMapPrice[] = materialList.filter(
      (c: rowMapPrice) => c.value === material
    );
    const {
      value,
      label,
      custom,
      formula,
      price: newUnitPrice,
      supplier,
    } = filteredMaterialList[0];

    return useRowsAtom(
      rowsAtom.map((row: materialRowMap) => {
        if (row.id != id) {
          return row;
        }
        let newPrice = eval(
          createFormula(
            formula,
            Number(newUnitPrice) * row.amount,
            exchangeRate,
            freight,
            panel,
            yeild,
            margin
          )
        );
        return {
          ...row,
          custom: custom,
          formula: formula,
          material: value,
          supplier: supplier,
          unitPrice: newUnitPrice,
          price: newPrice,
        };
      })
    );
  }

  return (
    <Select
      placeholder="Material"
      value={currentMaterial}
      searchable
      clearable
      onChange={(e: string) => {
        onMaterial(id, e, materialList, rowsAtom, useRowsAtom);
      }}
      data={filterMaterials(
        materialList,
        currentSupplier ? currentSupplier : ""
      )}
    />
  );
}

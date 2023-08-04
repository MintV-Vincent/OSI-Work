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
  data: materialRowMap[];
  setData: any;
}

export default function MaterialSelect({
  currentMaterial,
  materialList,
  data,
  setData,
  id,
  currentSupplier,
}: materialSelect) {
  const [exchangeRate] = useAtom(exchangeRateAtom);
  const [freight] = useAtom(freightAtom);
  const [panel] = useAtom(panelAtom);
  const [yeild] = useAtom(yeildAtom);
  const [margin] = useAtom(marginAtom);

  /**
   *
   * @param id The index of the row being changed
   * @param material The current material name
   * @param materialList The filtered material list that is dependent on the supplier selected
   * @param data The data of the table being changed
   * @param setData the set state functoin to change the data
   * @returns material row map for the table, Update base on the material being selected
   */
  function onMaterial(
    id: number,
    material: string,
    materialList: rowMapPrice[],
    data: materialRowMap[],
    setData: any
  ): materialRowMap {
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

    return setData(
      data.map((row: materialRowMap) => {
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
        onMaterial(id, e, materialList, data, setData);
      }}
      data={filterMaterials(
        materialList,
        currentSupplier ? currentSupplier : ""
      )}
    />
  );
}

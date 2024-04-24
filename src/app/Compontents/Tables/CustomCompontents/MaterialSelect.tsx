import { Select } from "@mantine/core";
import { materialRowMap, rowMapPrice } from "Library/Types";
import React from "react";
import { filterMaterials } from "./SelectLogic";
import { useAtom } from "jotai";
import {
  exchangeRateMaterialAtom,
  marginAtom,
  panelAtom,
  yeildAtom,
} from "Library/Atoms/AtomStorage";
import { createFormula } from "Functions/Create/CreateFormula";
import { createRowPrice } from "Functions/Create/MapCreate";

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
  currentSupplier,
  materialList,
  data,
  setData,
  id,
}: materialSelect) {
  const [exchangeRate] = useAtom(exchangeRateMaterialAtom);
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
    return setData(
      data.map((row: materialRowMap) => {
        if (row.id != id) {
          return row;
        }
        if (material === null) {
          return {
            ...row,
            item: createRowPrice(),
            price: 0,
          };
        }
        const filteredMaterialList: rowMapPrice[] = materialList.filter(
          (c: rowMapPrice) => c.value === material
        );
        const item = filteredMaterialList[0];

        let newPrice = eval(
          createFormula(
            item.formula,
            row.amount,
            Number(item.price),
            exchangeRate,
            panel,
            yeild,
            margin
          )
        );
        return {
          ...row,
          supplier: item.supplier,
          item: filteredMaterialList[0],
          price: newPrice,
        };
      })
    );
  }

  return (
    <Select
      size="xs"
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

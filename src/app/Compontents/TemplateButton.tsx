import { SegmentedControl } from "@mantine/core";
import { readDisplay } from "Directus SDK/directus";
import { createFormula } from "Functions/Create/CreateFormula";
import {
  exchangeRateMaterialAtom,
  marginAtom,
  materialAtom,
  panelAtom,
  yeildAtom,
} from "Library/Atoms/AtomStorage";
import { technologyAtom } from "Library/Atoms/FrontPageAtoms";
import {
  assemblyDataAtom,
  nreAtom,
  processAtom,
} from "Library/Atoms/ServiceStorage";
import { materialTableAtom } from "Library/Atoms/TableAtoms";
import { servicesMap } from "Library/Types";
import { useAtom } from "jotai";
import React from "react";

interface orderInterface {
  id: number;
  amount: number;
}

function customIncludes(
  array: orderInterface[],
  id: number
): [boolean, number] {
  for (let i: number = 0; i < array.length; i++) {
    if (array[i].id === id) {
      return [true, array[i].amount];
    }
  }
  return [false, 0];
}

export default function TemplateButton() {
  const [material, setMaterial] = useAtom(materialTableAtom);
  const [materialList, setMaterialList] = useAtom(materialAtom);
  const [processing, setProcesses] = useAtom(processAtom);
  const [assembly, setAssembly] = useAtom(assemblyDataAtom);
  const [nre, setNRE] = useAtom(nreAtom);
  const [technology, setTechnology] = useAtom(technologyAtom);

  const [exchangeRate] = useAtom(exchangeRateMaterialAtom);
  const [panel] = useAtom(panelAtom);
  const [yeild] = useAtom(yeildAtom);
  const [margin] = useAtom(marginAtom);

  /**
   *
   * @param setData Set the atom table
   * @param data The data from certain atom table
   * @param id The id of all elements from the template
   * @param value The amount constant for every id
   * @returns Returns the new atom with the amount set to value based on the id array
   */
  function setTemplate(setData: any, data: any, id: orderInterface[]) {
    console.log(id);
    return setData(
      data.map((row: any) => {
        const checkId = customIncludes(id, row.id);
        const checkIdValue: boolean = checkId[0];
        const amount: number = checkId[1];
        if (checkIdValue) {
          let newPrice = eval(
            createFormula(
              row.formula,
              amount,
              Number(row.unitPrice),
              exchangeRate,
              panel,
              yeild,
              margin
            )
          );
          return {
            ...row,
            amount: amount,
            price: newPrice,
          };
        }
        return row;
      })
    );
  }

  return (
    <SegmentedControl
      size="xs"
      color="blue"
      fullWidth
      value={technology}
      onChange={(e) => {
        setTechnology(e);
        readDisplay("Template_A").then(
          (result) => {
            let processIdArray: orderInterface[] = [];
            let nreIdArray: orderInterface[] = [];
            let assemblyIdArray: orderInterface[] = [];
            result.map((row: any) => {
              for (let i: number = 0; i < row.process_id.length; i++) {
                processIdArray.push({
                  id: row.process_id[i].Process_id,
                  amount: row.amount,
                });
              }
              for (let i: number = 0; i < row.nre_id.length; i++) {
                nreIdArray.push({
                  id: row.nre_id[i].Nre_id,
                  amount: row.amount,
                });
              }
              for (let i: number = 0; i < row.assembly_id.length; i++) {
                assemblyIdArray.push({
                  id: row.assembly_id[i].Assembly_id,
                  amount: row.amount,
                });
              }
            });
            setTemplate(setProcesses, processing, processIdArray);
            setTemplate(setNRE, nre, nreIdArray);
            setTemplate(setAssembly, assembly, assemblyIdArray);
            // setTemplate(setNRE, nre, row.nre_id, row.amount);
          },
          (error) => {}
        );
      }}
      data={[
        { label: "A", value: "A" },
        { label: "B", value: "B" },
        { label: "C", value: "C" },
        { label: "D", value: "D" },
      ]}
    />
  );
}
